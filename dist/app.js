const $=s=>document.querySelector(s),icon=n=>`<i data-lucide="${n}"></i>`,esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pages=[['inicio','Início','house'],['online','Jogos Online','gamepad-2'],['pokemon','Pokémon','circle-dot'],['mods','ROM Hacks & Mods','puzzle'],['downloads','Jogos para Baixar','download'],['emulador','Emulador','joystick']];
const games=[...['Red','Yellow','Crystal','FireRed','LeafGreen','Emerald'].map((n,i)=>({id:['red','yellow','crystal','firered','leafgreen','emerald'][i],name:'Pokémon '+n,platform:['GB','GB','GBC','GBA','GBA','GBA'][i],type:'pokemon',genre:'RPG · Aventura',image:['pokemon-red-cover.jpeg','pokemon-yellow.webp','pokemon-crystal.webp','pokemon-firered.webp','pokemon-leafgreen.webp','pokemon-emerald.webp'][i]})),{id:'2048',name:'2048',platform:'Web',type:'online',genre:'Puzzle · Estratégia',image:'2048-cover.webp',url:'https://play2048.co/'},{id:'hextris',name:'Hextris',platform:'Web',type:'online',genre:'Arcade · Puzzle',image:'hextris-cover.webp',url:'https://hextris.io/'},{id:'bloodborne',name:'Bloodborne',platform:'PC',type:'downloads',genre:'Action RPG · Soulslike',image:'04-noite.svg',url:'https://fitgirl-repacks.site/bloodborne/',externalDownload:true}, {id:'demon-slayer-hinokami',name:'Demon Slayer: Kimetsu no Yaiba — The Hinokami Chronicles',platform:'PC',type:'downloads',genre:'Ação · Luta · Aventura',image:'demon-slayer-hinokami-chronicles.webp',url:'https://fitgirl-repacks.site/demon-slayer-kimetsu-no-yaiba-the-hinokami-chronicles-pc/',externalDownload:true},{id:'poke-explorer',name:'Poké Explorer',platform:'Mobile',type:'downloads',genre:'Pokémon · Aventura mobile',image:'poke-explorer-cover.jpg',url:'https://hk.qu06.cn/PokeExplorer/?hPPp02Z8',adminRecommended:true}, {id:'openttd',name:'OpenTTD',platform:'PC',type:'downloads',genre:'Simulação · Open source',image:'openttd-cover.webp',url:'https://www.openttd.org/downloads/openttd-releases/latest'},{id:'supertux',name:'SuperTux',platform:'PC',type:'downloads',genre:'Plataforma · Open source',image:'04-noite.svg',url:'https://www.supertux.org/download.html'},{id:'stkart',name:'SuperTuxKart',platform:'PC',type:'downloads',genre:'Corrida · Open source',image:'05-corrida.svg',url:'https://supertuxkart.net/Download'},{id:'pokecrystal',name:'Pokémon Crystal — disassembly',platform:'GBC',type:'mods',genre:'Código-fonte · Projeto comunitário',image:'crystal.webp',url:'https://github.com/pret/pokecrystal'},{id:'pokeemerald',name:'Pokémon Emerald — expansion',platform:'GBA',type:'mods',genre:'Ferramentas · Projeto comunitário',image:'emerald.webp',url:'https://github.com/rh-hideout/pokeemerald-expansion'}];
games.push(...[
  {
    "id": "bo1-zombies",
    "name": "BO1 Zombies",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Zombies",
    "image": "capas/bo1-zombies.webp",
    "url": "https://vel.gg/bo1z"
  },
  {
    "id": "moon-zombies",
    "name": "Moon Zombies",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Zombies",
    "image": "capas/moon-zombies.webp",
    "url": "https://moon-zombies.pages.dev"
  },
  {
    "id": "kino-der-toten",
    "name": "Kino der Toten",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Zombies",
    "image": "capas/kino-der-toten.webp",
    "url": "https://kino-der-toten.pages.dev"
  },
  {
    "id": "bo3-cheese-cube",
    "name": "BO3 Cheese Cube",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Zombies",
    "image": "capas/bo3-cheese-cube.webp",
    "url": "https://cheese-cube.pages.dev"
  },
  {
    "id": "black-ops-2",
    "name": "Black Ops 2",
    "platform": "Web",
    "type": "online",
    "genre": "FPS",
    "image": "capas/black-ops-2.webp",
    "url": "https://vibeslops.luckeysystems.com"
  },
  {
    "id": "modern-warfare-2",
    "name": "Modern Warfare 2",
    "platform": "Web",
    "type": "online",
    "genre": "FPS",
    "image": "capas/modern-warfare-2.webp",
    "url": "https://ovz-game-production.up.railway.app"
  },
  {
    "id": "skate-3",
    "name": "Skate 3",
    "platform": "Web",
    "type": "online",
    "genre": "Esporte",
    "image": "capas/skate-3.webp",
    "url": "https://skate.aaddpp.lol"
  },
  {
    "id": "skate-rust",
    "name": "Skate Rust",
    "platform": "Web",
    "type": "online",
    "genre": "Esporte",
    "image": "capas/skate-rust.webp",
    "url": "https://global-terror.net"
  },
  {
    "id": "cs-surf",
    "name": "CS Surf",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Habilidade",
    "image": "capas/cs-surf.webp",
    "url": "https://surfd.net"
  },
  {
    "id": "halo-ce",
    "name": "Halo CE",
    "platform": "Web",
    "type": "online",
    "genre": "FPS",
    "image": "capas/halo-ce.webp",
    "url": "https://mitchellhynes.com/halo"
  },
  {
    "id": "halo-ce-mobile",
    "name": "Halo CE Mobile",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Mobile",
    "image": "capas/halo-ce-mobile.webp",
    "url": "https://hcemobile.com"
  },
  {
    "id": "pes-6",
    "name": "PES 6",
    "platform": "Web",
    "type": "online",
    "genre": "Esporte",
    "image": "capas/pes-6.webp",
    "url": "https://pes6.optijuegos.net"
  },
  {
    "id": "gta-5",
    "name": "GTA 5",
    "platform": "Web",
    "type": "online",
    "genre": "Ação · Mundo aberto",
    "image": "capas/gta-5.webp",
    "url": "https://web.archive.org/web/20261006055917/https://playgta5.com/"
  },
  {
    "id": "gta-vice-city",
    "name": "GTA Vice City",
    "platform": "Web",
    "type": "online",
    "genre": "Ação · Mundo aberto",
    "image": "capas/gta-vice-city.webp",
    "url": "https://joncodeofficial.github.io/gta-vice-city-wasm"
  },
  {
    "id": "the-simpsons-hit-run",
    "name": "The Simpsons: Hit & Run",
    "platform": "Web",
    "type": "online",
    "genre": "Ação · Aventura",
    "image": "capas/the-simpsons-hit-run.webp",
    "url": "https://shar-wasm.cjoseph.workers.dev/?skipmovie"
  },
  {
    "id": "quake-1",
    "name": "Quake 1",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Retrô",
    "image": "capas/quake-1.webp",
    "url": "https://q1.pieter.com"
  },
  {
    "id": "quake-2",
    "name": "Quake 2",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Retrô",
    "image": "capas/quake-2.webp",
    "url": "https://q2.pieter.com"
  },
  {
    "id": "quake-3",
    "name": "Quake 3",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Arena",
    "image": "capas/quake-3.webp",
    "url": "https://q3.pieter.com"
  },
  {
    "id": "return-to-castle-wolfenstein",
    "name": "Return to Castle Wolfenstein",
    "platform": "Web",
    "type": "online",
    "genre": "FPS",
    "image": "capas/return-to-castle-wolfenstein.webp",
    "url": "https://rtcw.pieter.com"
  },
  {
    "id": "unreal-tournament",
    "name": "Unreal Tournament",
    "platform": "Web",
    "type": "online",
    "genre": "FPS · Arena",
    "image": "capas/unreal-tournament.webp",
    "url": "https://ut.pieter.com"
  },
  {
    "id": "half-life",
    "name": "Half-Life",
    "platform": "Web",
    "type": "online",
    "genre": "FPS",
    "image": "capas/half-life.webp",
    "url": "https://pixelsuft.github.io/hl/"
  },
  {
    "id": "half-life-cs-1-6",
    "name": "Half-Life / CS 1.6",
    "platform": "Web",
    "type": "online",
    "genre": "FPS",
    "image": "capas/half-life-cs-1-6.webp",
    "url": "https://x8bitrain.github.io/webXash/"
  },
  {
    "id": "diablo",
    "name": "Diablo",
    "platform": "Web",
    "type": "online",
    "genre": "RPG · Ação",
    "image": "capas/diablo.webp",
    "url": "https://johnimril.github.io/diablo_web/"
  },
  {
    "id": "hedgewars",
    "name": "Hedgewars",
    "platform": "Web",
    "type": "online",
    "genre": "Estratégia · Arcade",
    "image": "capas/hedgewars.webp",
    "url": "https://webwars.link"
  },
  {
    "id": "wasm-arcade-gta-minecraft-e-outros",
    "name": "GTA / Minecraft e outros",
    "platform": "Web",
    "type": "online",
    "genre": "Coleção · Arcade",
    "image": "capas/wasm-arcade-gta-minecraft-e-outros.webp",
    "url": "https://wasmarcade.com/Fan"
  }
]);
games.push(...[
 {id:'pokemon-ultra-violet',name:'Pokémon Ultra Violet',shortTitle:'Ultra Violet',platform:'GBA',type:'pokemon',genre:'ROM hack · FireRed',image:'pokemon-firered.webp'},
 {id:'pokemon-black-palace',name:'Pokémon Black — Special Palace Edition',shortTitle:'Black · Special Palace',platform:'GBA',type:'pokemon',genre:'ROM hack · Goomba GBA',image:'red.webp'},
 {id:'pokemon-jupiter',name:'Pokémon Jupiter (Ruby Hack)',shortTitle:'Jupiter',platform:'GBA',type:'pokemon',genre:'ROM hack · IPS',image:'pokemon-emerald.webp',requiresPatch:true},
 {id:'pokemon-stadium',name:'Pokémon Stadium',shortTitle:'Stadium',platform:'N64',type:'pokemon',genre:'Nintendo 64 · batalha',image:'console-scene.webp',romWarning:'O ZIP recebido está incompleto. Use uma ROM N64 íntegra, extraída de arquivo válido.'},
 {id:'pokemon-mystery-dungeon-red',name:'Pokémon Mystery Dungeon: Red Rescue Team',shortTitle:'Mystery Dungeon · Red',platform:'GBA',type:'pokemon',genre:'RPG · exploração',image:'04-noite.svg'}
]);
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
let favorites=new Set(read('cg-favorites',[])),roms=read('cg-roms',{}),defaults={},page='inicio',query='',platform='Todos',onlyFavorites=false,blobUrl=null,pendingRomId=null;
function persist(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch{toast('O navegador não permitiu salvar suas preferências.');return false}}
function icons(){window.lucide?.createIcons()}function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3000)}
function romFor(id){return roms[id]||defaults[id]||''}function count(){$('#favcount').textContent=favorites.size}
function hero(){const pokemon=page==='pokemon';return `<section class="hero hero--catalog"><div class="hero-copy"><span class="eyebrow">${icon(pokemon?'circle-dot':'flame')} ${pokemon?'Jornadas Pokémon':'O jogo continua por aqui'}</span><h1>${pokemon?'Sua jornada Pokémon<br><em>começa agora</em>':'Grandes clássicos.<br><em>Novas aventuras.</em>'}</h1><p>${pokemon?'Explore Kanto, Johto e Hoenn. Escolha um jogo abaixo e configure sua ROM na aba Emulador.':'A nostalgia tem um novo ponto de encontro. Descubra jogos para navegador, mods e clássicos gratuitos.'}</p><div class="actions"><a class="btn" href="${pokemon?'#catalogo':'#online'}" ${pokemon?'data-catalog':''}>${icon(pokemon?'layout-grid':'play')} ${pokemon?'Ver jogos Pokémon':'Explorar jogos online'} ${icon('chevron-right')}</a>${pokemon?'':`<a class="btn secondary" href="#catalogo" data-catalog>${icon('layout-grid')} Ver catálogo</a>`}</div></div></section>`}
/**
 * Dois indicadores por jogo: plataformas declaradas e recursos detectáveis no navegador.
 * A triagem não garante FPS, disponibilidade do servidor externo ou posse de ROM/ISO.
 */
function compatibilityMarkup(g){
  return '<section class="compat-card" data-compat-game="'+esc(g.id)+'" aria-label="Compatibilidade de '+esc(g.name)+'">'+
    '<div class="compat-badges">'+
      '<span class="compat-platform" title="Plataformas de execução">Plataforma: verificando…</span>'+
      '<span class="compat-status compat-status--unknown">Verificando…</span>'+
    '</div>'+
    '<details class="compat-details"><summary>Requisitos e compatibilidade</summary>'+
      '<div class="compat-content"><p>Verificando os recursos deste navegador…</p></div>'+
    '</details>'+
  '</section>';
}
let compatibilityModulePromise=null;
function decorateCompatibility(){
  const nodes=Array.from(document.querySelectorAll('[data-compat-game]'));
  if(!nodes.length)return;
  if(!compatibilityModulePromise)compatibilityModulePromise=import('./compatibility/compatibility.mjs');
  compatibilityModulePromise.then(mod=>Promise.all(nodes.map(async node=>{
    const game=games.find(g=>g.id===node.dataset.compatGame);
    if(!game)return;
    const diagnosis=await mod.checkGameCompatibility({id:game.id,name:game.name});
    // Ignorar cards removidos por busca, navegação, favoritos ou filtros.
    if(!node.isConnected)return;
    const platform=node.querySelector('.compat-platform');
    const badge=node.querySelector('.compat-status');
    const content=node.querySelector('.compat-content');
    if(!platform||!badge||!content)return;
    platform.textContent=diagnosis.platformLabel;
    badge.className='compat-status compat-status--'+diagnosis.status;
    badge.textContent={
      ready:'Requisitos OK',
      setup:'Requer configuração',
      blocked:'Incompatível',
      unknown:'Não verificado'
    }[diagnosis.status]||'Não verificado';
    badge.title=diagnosis.statusLabel;
    const checks=(diagnosis.checks||[]).map(c=>'<li class="compat-check compat-check--'+esc(c.result)+'">'+
      esc(c.label)+': '+(c.result==='pass'?'disponível':c.result==='fail'?'indisponível':'não verificado')+'</li>').join('');
    const controls=(diagnosis.controls||[]).length?'<p><strong>Controles:</strong> '+esc(diagnosis.controls.join('; '))+'</p>':'';
    const explanations=(diagnosis.details||[]).map(msg=>'<li>'+esc(msg)+'</li>').join('');
    content.innerHTML='<p class="compat-disclaimer">Análise deste navegador, não um teste do desempenho ou do servidor do jogo.</p>'+
      '<p><strong>Resultado:</strong> '+esc(diagnosis.statusLabel)+'</p>'+
      (checks?'<strong>Recursos:</strong><ul class="compat-checks">'+checks+'</ul>':'')+
      controls+
      (explanations?'<strong>Observações:</strong><ul>'+explanations+'</ul>':'')+
      (diagnosis.profile?.source?'<p class="compat-source"><a href="'+esc(diagnosis.profile.source)+'" target="_blank" rel="noopener noreferrer">Fonte dos requisitos</a></p>':'');
  }))).catch(()=>{
    nodes.forEach(node=>{
      if(!node.isConnected)return;
      const badge=node.querySelector('.compat-status');
      const content=node.querySelector('.compat-content');
      const platform=node.querySelector('.compat-platform');
      if(badge){badge.className='compat-status compat-status--unknown';badge.textContent='Não verificado';}
      if(platform)platform.textContent='Plataforma não verificada';
      if(content)content.textContent='Não foi possível verificar a compatibilidade neste navegador.';
    });
  });
}
function card(g){return `<article class="game-card ${g.type==='pokemon'?'pokemon-card':''}"><div class="cover"><img src="assets/${g.image}" alt="Ilustração de ${esc(g.name)}" loading="lazy"><span class="badge">${g.platform}</span>${g.adminRecommended?'<span class="admin-recommended">Recomendado pelo Admin</span>':''}${g.type==='pokemon'?`<span class="genre-badge">${g.platform==='N64'?'N64':'RPG'}</span>`:''}<button class="icon heart ${favorites.has(g.id)?'selected':''}" data-fav="${g.id}" aria-label="${favorites.has(g.id)?'Remover':'Adicionar'} ${esc(g.name)} ${favorites.has(g.id)?'dos':'aos'} favoritos" aria-pressed="${favorites.has(g.id)}">${icon('heart')}</button>${g.type==='pokemon'?`<h3 class="cover-title">Pokémon<br>${esc(g.shortTitle||g.name.replace('Pokémon ',''))}</h3>`:''}</div><div class="card-body">${g.type!=='pokemon'?`<h3>${g.name}</h3>`:''}<div class="card-meta"><span>${g.genre}</span>${g.type==='pokemon'?'<span>ROM própria</span>':''}</div>${g.requiresPatch?'<p class="rom-card-note">Patch IPS: requer sua ROM-base Pokémon Ruby.</p>':''}${g.romWarning?'<p class="rom-card-note rom-card-note--alert">'+esc(g.romWarning)+'</p>':''}${g.externalDownload?'<p class="rom-card-note">Distribuição externa não oficial. Verifique a procedência.</p>':''}${compatibilityMarkup(g)}${g.type==='pokemon'?`<a class="btn" href="#emulador" data-rom-target="${g.id}">${icon('arrow-right')} Abrir na aba Emulador</a>`:`<a class="btn" href="${g.url}" target="_blank" rel="noopener noreferrer">${icon(g.externalDownload?'external-link':g.type==='downloads'?'download':'external-link')} ${g.adminRecommended?'Abrir Poké Explorer':g.externalDownload?'Abrir página externa':g.type==='downloads'?'Site oficial':g.type==='mods'?'Ver projeto':'Jogar online'}</a>`}</div></article>`}
function sidebar(){return `<aside class="sidebar"><section class="side-box"><h3>${icon('compass')} Explore seu universo</h3><a class="quick-link" href="#online">${icon('globe')} Jogos no navegador ${icon('chevron-right')}</a><a class="quick-link" href="#mods">${icon('puzzle')} ROM Hacks & Mods ${icon('chevron-right')}</a><a class="quick-link" href="#downloads">${icon('download')} Jogos para baixar ${icon('chevron-right')}</a></section></aside>`}
function features(){const items=page==='emulador'?[['save','Save no navegador','Salve seu progresso e exporte uma cópia.'],['maximize','Tela cheia','Jogue sem distrações.'],['hand','Controles touch','Jogue também em telas sensíveis ao toque.'],['gamepad-2','Teclado ou gamepad','Use os controles disponíveis no seu dispositivo.']]:[['globe','Jogos online','Encontre clássicos para jogar diretamente no navegador.'],['heart','Seus favoritos','Salve seus jogos preferidos neste dispositivo.'],['monitor-smartphone','Desktop ou mobile','Consulte as plataformas compatíveis em cada jogo.'],['badge-check','Requisitos claros','Veja o que seu dispositivo precisa para executar um jogo.']];return `<section class="features">${items.map(([i,t,p])=>`<div class="feature"><span>${icon(i)}</span><div><strong>${t}</strong><p>${p}</p></div></div>`).join('')}</section>`}
function visibleOnPage(g){if(page==='inicio')return g.type!=='pokemon'&&!g.name.startsWith('Pokémon');if(page==='pokemon')return g.type==='pokemon';return g.type===page}
function foldSearch(value){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR')}
function filtered(){return games.filter(g=>visibleOnPage(g)&&(!onlyFavorites||favorites.has(g.id))&&(platform==='Todos'||g.platform===platform)&&foldSearch(g.name).includes(foldSearch(query)))}
function updateGrid(){const list=filtered();$('#grid').innerHTML=list.length?list.map(card).join(''):`<div class="empty">${icon(onlyFavorites?'heart':'search')}<h3>${onlyFavorites?'Seus favoritos começam aqui':'Nenhum jogo encontrado'}</h3><p class="muted">${onlyFavorites?'Toque no coração de um jogo para guardá-lo.':'Tente outro nome ou remova os filtros.'}</p><button class="btn secondary" id="reset" style="margin-top:18px">${onlyFavorites?'Explorar jogos':'Limpar filtros'}</button></div>`;$('#result-count').textContent=`${list.length} ${list.length===1?'jogo disponível':'jogos disponíveis'}`;icons();decorateCompatibility()}
function render(){page=location.hash.slice(1).split('?')[0]||'inicio';if(!pages.some(p=>p[0]===page))page='inicio';$('#main').classList.toggle('pokemon-page',page==='pokemon'&&!onlyFavorites);document.title=`${pages.find(p=>p[0]===page)[1]} — CharmanderGames`;$('nav').innerHTML=pages.map(([id,title,ic])=>`<a href="#${id}" class="${id===page&&!onlyFavorites?'active':''}" ${id===page?'aria-current="page"':''}>${icon(ic)} ${title}</a>`).join('');$('nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');if(page==='emulador'&&!onlyFavorites){renderEmulator();icons();return}const titles={inicio:['Escolha sua próxima aventura','Clássicos, descobertas e aquele jogo que marcou sua história.'],pokemon:['Clássicos Pokémon','As principais jornadas da franquia, em um só lugar.'],online:['Jogos Online','Abra, jogue e divirta-se. Direto no site de cada projeto.'],mods:['ROM Hacks & Mods','Projetos comunitários e ferramentas para criar novas aventuras.'],downloads:['Jogos para Baixar','Jogos para PC e mobile, com links para páginas externas de distribuição.']};const [title,desc]=onlyFavorites?['Meus favoritos','Sua seleção, salva neste navegador.']:titles[page];$('#main').innerHTML=`${!onlyFavorites&&['inicio','pokemon'].includes(page)?hero():''}<section id="catalogo"><div class="section-head"><div><h2>${title}</h2><p>${desc}</p></div>${page==='inicio'&&!onlyFavorites?'<a href="#online" class="btn secondary">Ver jogos '+icon('arrow-right')+'</a>':''}</div><div class="catalog-layout"><div><div class="toolbar"><label class="search">${icon('search')}<input id="search" type="search" value="${esc(query)}" placeholder="Buscar jogos..." aria-label="Buscar jogos"></label><div class="filters" aria-label="Filtrar plataforma">${['Todos','GB','GBC','GBA','N64','Web','PC','Mobile'].filter(p=>page!=='pokemon'||!['Web','PC'].includes(p)).map(p=>`<button class="chip ${p===platform?'active':''}" aria-pressed="${p===platform}" data-platform="${p}">${page==='pokemon'?({Todos:'Todos',GB:'Game Boy',GBC:'Game Boy Color',GBA:'Game Boy Advance'}[p]||p):p}</button>`).join('')}</div></div><div id="grid" class="grid"></div><p id="result-count" class="result-count" aria-live="polite"></p></div>${sidebar()}</div></section>${features()}`;updateGrid();$('#search').addEventListener('input',e=>{query=e.target.value;updateGrid()});icons()}
function renderEmulator(){$('#main').innerHTML=`<section class="emulator-page"><span class="eyebrow">${icon('gamepad-2')} Sua aventura, seu save</span><h1>É só carregar.<br><em>E começar a jogar.</em></h1><p class="muted">Emulador de Game Boy, Game Boy Color, Game Boy Advance e Nintendo 64.</p><div class="upload-box">${icon('upload')}<h2>Traga seu jogo</h2><p>Selecione uma ROM descompactada .gb, .gbc, .gba, .z64, .n64 ou .v64.<br>Seu arquivo fica no dispositivo, sem envio para o servidor.</p><label class="rom-file-label" for="rom-file-id">Jogo do catálogo (opcional)</label><select id="rom-file-id" aria-label="Jogo para ROM local"><option value="">Detectar automaticamente pela extensão</option>${games.filter(g=>g.type==='pokemon').map(g=>`<option value="${g.id}">${esc(g.name)} (${g.platform})</option>`).join('')}</select><label class="rom-file-label" for="rom-file">Carregar arquivo de jogo (.gba, .gb, .gbc ou N64)</label><input id="rom-file" type="file" accept=".gba,.gb,.gbc,.z64,.n64,.v64" aria-describedby="rom-upload-status"><p id="rom-upload-status" class="hint" role="status" aria-live="polite">Descompacte os ZIPs antes de selecionar a ROM. Arquivos .ips devem ser aplicados à ROM-base.</p></div><section id="ips-tools" class="ips-tools" hidden><h2>Pokémon Jupiter — aplicar patch IPS</h2><p>O arquivo recebido de Jupiter é um patch, não um jogo completo. Selecione uma cópia autorizada de Pokémon Ruby (.gba) e o patch Jupiter (.ips). Ambos permanecem no navegador.</p><div class="ips-fields"><label>ROM-base Pokémon Ruby (.gba)<input id="ips-base" type="file" accept=".gba"></label><label>Patch Jupiter (.ips)<input id="ips-patch" type="file" accept=".ips"></label><button id="apply-ips" type="button" class="btn">Aplicar patch e jogar</button></div><p id="ips-status" class="hint" role="status" aria-live="polite"></p></section><section class="config"><h2>Biblioteca de ROMs</h2><p class="hint">Associe uma URL a um jogo para carregá-lo automaticamente ao tocar em “Jogar agora”. Use arquivos que você tem autorização para executar. O servidor do arquivo precisa permitir acesso pelo navegador (CORS).</p><form id="rom-form"><select id="rom-id" aria-label="Jogo">${games.filter(g=>g.type==='pokemon').map(g=>`<option value="${g.id}">${g.name} (${g.platform})</option>`).join('')}</select><input id="rom-url" type="url" placeholder="https://…/meu-jogo.gba" aria-label="URL da ROM" required><button class="btn">Salvar URL</button></form><div>${games.filter(g=>romFor(g.id)).map(g=>`<div class="config-list"><span>${g.name}</span><div><button class="chip" data-play="${g.id}">Jogar</button> ${roms[g.id]?`<button class="chip" data-remove="${g.id}">Remover</button>`:''}</div></div>`).join('')||'<p class="hint">Nenhuma ROM configurada. Você também pode carregar um arquivo local acima.</p>'}</div></section>${features()}</section>`;if(pendingRomId){$('#rom-id').value=pendingRomId;$('#rom-file-id').value=pendingRomId;pendingRomId=null}
const refreshPatchTools=()=>{$('#ips-tools').hidden=$('#rom-file-id').value!=='pokemon-jupiter'};
$('#rom-file-id').onchange=refreshPatchTools;
refreshPatchTools();
$('#rom-file').onchange=async e=>{
 const f=e.target.files?.[0];if(!f)return;
 const selected=games.find(item=>item.id===$('#rom-file-id').value&&item.type==='pokemon');
 try{
  const helper=await import('./rom-utils.mjs');
  // O núcleo depende da ROM enviada, não da seleção opcional do catálogo.
  const detectedPlatform=helper.platformForRomName(f.name);
  const core=helper.validateRomForPlatform(f.name,detectedPlatform,f.size);
  if(core==='n64')helper.validateN64Header(await f.slice(0,4).arrayBuffer());
  if(blobUrl)URL.revokeObjectURL(blobUrl);
  blobUrl=URL.createObjectURL(f);
  const matchingGame=selected?.platform===detectedPlatform?selected:null;
  const label=matchingGame?matchingGame.name:f.name.replace(/\.[^.]+$/,'');
  $('#rom-upload-status').textContent=f.name+' · '+detectedPlatform+' detectado. Abrindo no emulador.'+(selected&&!matchingGame?' A seleção do catálogo não corresponde à extensão; foi usado '+detectedPlatform+'.':'');
  launch(label,core,blobUrl);
 }catch(error){const message=error?.message||'Falha na leitura da ROM.';$('#rom-upload-status').textContent=message;toast(message);}
};
$('#apply-ips').onclick=async()=>{
 const original=$('#ips-base').files?.[0],patch=$('#ips-patch').files?.[0];
 if(!original||!patch){$('#ips-status').textContent='Selecione a ROM-base .gba e o arquivo .ips.';return;}
 try{
  const helper=await import('./rom-utils.mjs');
  helper.validateRomForPlatform(original.name,'GBA',original.size);
  if(helper.romExtension(patch.name)!=='ips'||patch.size>16*1024*1024)throw Error('Selecione um patch .ips válido de até 16 MB.');
  $('#ips-status').textContent='Aplicando patch localmente…';
  const baseBuffer=await original.arrayBuffer();
  helper.validateRubyBase(baseBuffer);
  const result=helper.applyIpsPatch(baseBuffer,await patch.arrayBuffer());
  if(blobUrl)URL.revokeObjectURL(blobUrl);
  blobUrl=URL.createObjectURL(new Blob([result],{type:'application/octet-stream'}));
  $('#ips-status').textContent='Patch aplicado. Abrindo Pokémon Jupiter…';
  launch('Pokémon Jupiter (Ruby Hack)','gba',blobUrl);
 }catch(error){const message=error?.message||'Falha ao aplicar o patch IPS.';$('#ips-status').textContent=message;toast(message);}
};
$('#rom-form').onsubmit=e=>{e.preventDefault();const raw=$('#rom-url').value;try{const u=new URL(raw);if(u.protocol!=='https:')throw Error();roms[$('#rom-id').value]=u.href;persist('cg-roms',roms);renderEmulator();icons();toast('URL salva. Pronta para abrir pelo catálogo.')}catch{toast('Informe uma URL HTTPS válida.')}}}
function play(id){const g=games.find(g=>g.id===id&&g.type==='pokemon');if(!g)return;if(page!=='emulador'){pendingRomId=id;onlyFavorites=false;location.hash='#emulador';render();return}const url=romFor(id);if(!url){onlyFavorites=false;location.hash='#emulador';render();$('#rom-id').value=id;toast('Carregue sua ROM ou configure a URL de '+g.name+'.');return}launch(g.name,g.platform==='N64'?'n64':g.platform==='GBA'?'gba':'gb',url)}
function launch(name,core,url){if(page!=='emulador')return;$('#player-title').textContent=name;$('#player-status').textContent='Carregando emulador…';const frame=document.createElement('iframe');frame.title='Emulador de '+name;frame.allow='autoplay; fullscreen; gamepad';frame.src='player.html';$('#screen').replaceChildren(frame);frame.onload=()=>frame.contentWindow.postMessage({type:'start',name,core,url},location.origin);$('#player').showModal()}
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==$('#screen iframe')?.contentWindow)return;if(e.data?.type==='status')$('#player-status').textContent=e.data.message});function closePlayer(){$('#player').close();$('#screen').replaceChildren();if(blobUrl){URL.revokeObjectURL(blobUrl);blobUrl=null}}$('#close-player').onclick=closePlayer;$('#player').addEventListener('cancel',e=>{e.preventDefault();closePlayer()});$('#menu').onclick=()=>{const open=$('nav').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open))};$('.favorites-nav').onclick=()=>{if(page==='emulador')history.replaceState(null,'','#inicio');onlyFavorites=true;query='';platform='Todos';render()};
document.addEventListener('click',e=>{const fav=e.target.closest('[data-fav]');if(fav){const id=fav.dataset.fav;favorites.has(id)?favorites.delete(id):favorites.add(id);persist('cg-favorites',[...favorites]);count();updateGrid();return}const p=e.target.closest('[data-platform]');if(p){platform=p.dataset.platform;document.querySelectorAll('[data-platform]').forEach(b=>{b.classList.toggle('active',b===p);b.setAttribute('aria-pressed',String(b===p))});updateGrid()}const playBtn=e.target.closest('[data-play]');if(playBtn)play(playBtn.dataset.play);const remove=e.target.closest('[data-remove]');if(remove){delete roms[remove.dataset.remove];persist('cg-roms',roms);renderEmulator();icons()}if(e.target.closest('#reset')){query='';platform='Todos';if(onlyFavorites){onlyFavorites=false;location.hash='inicio'}render()}if(e.target.closest('[data-catalog]')){e.preventDefault();$('#catalogo').scrollIntoView({behavior:'smooth'})}const a=e.target.closest('a[href^="#"]');if(a&&!a.hasAttribute('data-catalog')){if(a.dataset.romTarget)pendingRomId=a.dataset.romTarget;onlyFavorites=false;query='';platform='Todos';if(location.hash===a.getAttribute('href'))render()}});
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});count();render();fetch('roms.json').then(r=>r.ok?r.json():{}).then(d=>{defaults=Object.fromEntries(Object.entries(d).filter(([id,u])=>games.some(g=>g.id===id)&&typeof u==='string'&&(/^https:\/\//.test(u)||/^\/roms\//.test(u))));render()}).catch(()=>{});

function globalSearchPage(term){const q=foldSearch(term.trim());if(q.length<3)return 'inicio';const matching=games.filter(g=>foldSearch(g.name).includes(q));if(matching.some(g=>g.type==='pokemon'))return 'pokemon';if(matching.length&&matching.every(g=>g.type==='mods'))return 'mods';return 'inicio'}
$('#global-search').addEventListener('input',e=>{query=e.target.value;platform='Todos';onlyFavorites=false;const targetPage=globalSearchPage(query);if(page!==targetPage)history.replaceState(null,'','#'+targetPage);render()});
