const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements=new Map();
const el=s=>{
  if(!elements.has(s)){
    elements.set(s,{innerHTML:'',textContent:'',value:'',dataset:{},
      classList:{add(){},remove(){},toggle(){}},setAttribute(){},
      addEventListener(type,fn){this[type]=fn},replaceChildren(){},
      showModal(){this.modalOpened=true},close(){this.modalOpened=false}});
  }
  return elements.get(s);
};
const saved={};
const context={
  document:{querySelector:el,querySelectorAll:()=>[],addEventListener(){}},
  localStorage:{getItem:k=>saved[k]??null,setItem:(k,v)=>saved[k]=v},
  location:{hash:'#inicio',origin:'https://example.com'},
  window:{addEventListener(){},scrollTo(){}},
  history:{replaceState(a,b,url){context.location.hash=url}},
  URL,setTimeout,clearTimeout,fetch:()=>Promise.reject(),console
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
const run=s=>vm.runInContext(s,context);
const route=name=>{context.location.hash='#'+name;run("query='';platform='Todos';onlyFavorites=false;render()")};

assert.equal(run('games.length'),43);
assert.equal(run("page='inicio';filtered().length"),30);
assert.equal(run("filtered().some(g=>g.name.startsWith('Pokémon'))"),false);
assert.equal(run("page='pokemon';filtered().length"),11);
assert.equal(run("page='online';filtered().length"),27);
assert.equal(run("page='mods';filtered().length"),2);
assert.equal(run("page='downloads';filtered().length"),3);
assert.equal(run("page='emulador';filtered().length"),0);
console.log('PASS: home excludes Pokémon; games remain in dedicated category pages');

for(const name of ['inicio','online','pokemon','mods','downloads','emulador']){
  route(name);
  assert.ok(el('#main').innerHTML.length>100,'Rota não renderizada: '+name);
}
route('inicio');
assert.ok(!el('#main').innerHTML.includes('emulator-preview'));
assert.ok(!el('#main').innerHTML.includes('rom-status'));
assert.ok(!el('#main').innerHTML.includes('Status da ROM'));
assert.ok(!el('#main').innerHTML.includes('Carregar minha ROM'));
assert.ok(!el('#main').innerHTML.includes('Explorar Pokémon'));
assert.ok(el('#main').innerHTML.includes('Explorar jogos online'));
assert.ok(!el('#grid').innerHTML.includes('Pokémon Red'));
assert.ok(!el('#grid').innerHTML.includes('Pokémon Emerald'));
assert.ok(!el('#grid').innerHTML.includes('Pokémon Crystal'));
assert.ok(el('#grid').innerHTML.includes('BO1 Zombies'));
console.log('PASS: homepage has no Pokémon games, ROM panel or emulator preview');

route('pokemon');
assert.ok(el('#main').innerHTML.includes('Sua jornada Pokémon'));
assert.ok(!el('#main').innerHTML.includes('emulator-preview'));
assert.ok(el('#grid').innerHTML.includes('Pokémon Red'));
assert.ok(el('#grid').innerHTML.includes('Pokémon Emerald'));
for(const name of ['Pokémon Stadium','Pokémon Ultra Violet','Pokémon Jupiter','Pokémon Black','Pokémon Mystery Dungeon'])assert.ok(el('#grid').innerHTML.includes(name),name);
assert.ok(!el('#grid').innerHTML.includes('BO1 Zombies'));
const pokemonCard=run('card(games[0])');
assert.ok(pokemonCard.includes('data-compat-game="red"'));
assert.ok(pokemonCard.includes('data-fav="red"'));
assert.ok(pokemonCard.includes('href="#emulador"'));
assert.ok(pokemonCard.includes('data-rom-target="red"'));
assert.ok(!pokemonCard.includes('data-play="red"'));
assert.ok(pokemonCard.includes('Abrir na aba Emulador'));
console.log('PASS: Pokémon card is available only in Pokémon tab, links to emulator tab without launching it');

run("roms.red='https://example.com/red.gb'");
run("play('red')");
assert.equal(context.location.hash,'#emulador');
assert.ok(el('#main').innerHTML.includes('Biblioteca de ROMs'));
assert.ok(el('#main').innerHTML.includes('Game Boy Advance e Nintendo 64'));
assert.ok(el('#main').innerHTML.includes('pokemon-stadium'));
assert.ok(el('#main').innerHTML.includes('id="ips-base"'));
assert.ok(el('#main').innerHTML.includes('id="ips-patch"'));
assert.equal(el('#rom-id').value,'red');
assert.equal(el('#rom-file-id').value,'red');
assert.ok(!el('#player').modalOpened);
assert.ok(el('#main').innerHTML.includes('id="rom-file"'));
assert.ok(el('#main').innerHTML.includes('accept=".gba,.gb,.gbc,.z64,.n64,.v64"'));
assert.ok(el('#main').innerHTML.includes('Detectar automaticamente pela extensão'));
assert.ok(fs.readFileSync('dist/app.js','utf8').includes('helper.platformForRomName(f.name)'));
assert.ok(!el('#main').innerHTML.includes('class="game-card'));
assert.ok(el('#main').innerHTML.includes('data-play="red"'));
console.log('PASS: emulator selection moves to dedicated tab and never launches from Pokémon catalogue');

route('inicio');
run("favorites.add('red');favorites.add('bo1-zombies');onlyFavorites=true;render()");
assert.ok(!el('#grid').innerHTML.includes('Pokémon Red'));
assert.ok(el('#grid').innerHTML.includes('BO1 Zombies'));
route('pokemon');
run('onlyFavorites=true;render()');
assert.ok(el('#grid').innerHTML.includes('Pokémon Red'));
assert.ok(!el('#grid').innerHTML.includes('BO1 Zombies'));
run("persist('cg-favorites',[...favorites])");
assert.equal(JSON.parse(saved['cg-favorites']).includes('red'),true);
console.log('PASS: favourites remain saved and are scoped to the active section');

route('inicio');
el('#global-search').input({target:{value:'Emerald'}});
assert.equal(context.location.hash,'#pokemon');
assert.ok(el('#grid').innerHTML.includes('Pokémon Emerald'));
assert.ok(!el('#grid').innerHTML.includes('BO1 Zombies'));
el('#global-search').input({target:{value:'Quake'}});
assert.equal(context.location.hash,'#inicio');
assert.ok(el('#grid').innerHTML.includes('Quake 1'));
assert.ok(!el('#grid').innerHTML.includes('Pokémon Red'));
el('#global-search').input({target:{value:'Expansion'}});
assert.equal(context.location.hash,'#mods'); // Source projects stay in ROM Hacks & Mods
assert.ok(el('#grid').innerHTML.includes('Pokémon Emerald — expansion'));
el('#global-search').input({target:{value:'Pokemon'}});
assert.equal(context.location.hash,'#pokemon'); // Search works without Portuguese accents
assert.ok(el('#grid').innerHTML.includes('Pokémon Red'));
el('#global-search').input({target:{value:'Quake'}});
assert.equal(context.location.hash,'#inicio');
assert.ok(!el('#grid').innerHTML.includes('Pokémon Red'))
console.log('PASS: global search opens Pokémon section for Pokémon games');

for(const game of run('games')){
  const html=run('card(games.find(g=>g.id==='+JSON.stringify(game.id)+'))');
  assert.ok(html.includes('data-compat-game="'+game.id+'"'), 'Missing compatibility badge: '+game.name);
  assert.ok(html.includes('class="compat-platform"'));
  assert.ok(html.includes('class="compat-status compat-status--unknown"'));
  assert.ok(html.includes('<details class="compat-details">'));
}
const player=fs.readFileSync('dist/player.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(player);
console.log('PASS: 43 cards keep browser compatibility badges; player script syntax valid');
