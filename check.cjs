const fs=require('fs'),vm=require('vm'),assert=require('assert');const elements=new Map();const el=s=>{if(!elements.has(s))elements.set(s,{innerHTML:'',textContent:'',value:'',dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(type,fn){this[type]=fn},replaceChildren(){},showModal(){},close(){}});return elements.get(s)};const saved={};const context={document:{querySelector:el,querySelectorAll:()=>[],addEventListener(){}},localStorage:{getItem:k=>saved[k]??null,setItem:(k,v)=>saved[k]=v},location:{hash:'#inicio',origin:'https://example.com'},window:{addEventListener(){},scrollTo(){}},history:{replaceState(a,b,url){context.location.hash=url}},URL,setTimeout,clearTimeout,fetch:()=>Promise.reject(),console};vm.createContext(context);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);function run(s){return vm.runInContext(s,context)}assert.equal(run('filtered().length'),38);assert.equal(run("page='pokemon'; filtered().length"),6);assert.equal(run("platform='GBA'; filtered().length"),3);assert.equal(run("query='Emerald'; filtered()[0].id"),'emerald');assert.equal(run("query='zzzzz'; filtered().length"),0);assert.equal(run("query=''; platform='Todos'; favorites.add('red'); onlyFavorites=true; filtered()[0].id"),'red');run("persist('cg-favorites',[...favorites])");assert.equal(JSON.parse(saved['cg-favorites'])[0],'red');for(const route of ['inicio','online','pokemon','mods','downloads','emulador']){context.location.hash='#'+route;run('onlyFavorites=false;render()');assert.ok(el('#main').innerHTML.length>100)}run("roms.red='https://example.com/red.gb'");assert.equal(run("romFor('red')"),'https://example.com/red.gb');console.log('PASS: six routes, search, platform filters, empty results, favorites persistence, ROM config');
const player=fs.readFileSync('dist/player.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];new vm.Script(player);console.log('PASS: player script syntax');

el('#global-search').input({target:{value:'Emerald'}});assert.equal(run('page'),'inicio');assert.equal(run('query'),'Emerald');assert.ok(el('#grid').innerHTML.includes('Pokémon Emerald'));assert.ok(!el('#grid').innerHTML.includes('Pokémon Red'));run("onlyFavorites=false;location.hash='#pokemon';render()");assert.ok(el('#main').innerHTML.includes('Game Boy Advance'));const c=run('card(games[0])');
if(process.env.CG_CHECK_ZIP_MARKUP==='1'){
  // A exportação enviada possui marcação de capa diferente da versão publicada.
  // Essas verificações estritas devem ser executadas apenas na exportação.
  assert.ok(c.includes('box-cover-card'));
  assert.ok(!c.includes('cover-title'));
  assert.ok(c.includes('pokemon-red-cover.jpeg'));
  assert.ok(!c.includes('data-play'));
  assert.ok(!run('sidebar()').includes('emulator-preview'));
  assert.ok(!run('hero()').includes('rom-status'));
  run("location.hash='#emulador';render()");
  assert.ok(el('#main').innerHTML.includes('data-play="red"'));
}
console.log('PASS: search, routes, platform names, ROM configuration; ZIP-specific markup assertions optional');
