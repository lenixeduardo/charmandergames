/**
 * Perfis de COMPATIBILIDADE DAS VERSÕES WEB, não dos jogos originais de PC/console.
 * Nunca inferir CPU/GPU/RAM mínimos sem documentação do host de execução.
 * documented = versão e plataforma documentadas;
 * tentative = informação parcial, exige validação do host;
 * unverified = não anunciar compatibilidade.
 */
export const GAME_PROFILES = [
  {
    id: "bo1-zombies", title: "BO1 Zombies",
    aliases: ["Black Ops 1 Zombies", "Call of Duty BO1 Zombies"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm", "webgl2"],
    controls: ["Teclado e mouse"],
    setup: ["Abrir o jogo em uma aba própria (não em iframe).", "O host precisa habilitar memória compartilhada; a configuração não pode ser confirmada no portal."],
    notes: ["O carregamento inicial dos mapas pode ser demorado."],
    source: "https://zombiesbrowser.com/"
  },
  {
    id: "moon-zombies", title: "Moon Zombies",
    aliases: ["Moon (Zombies)", "Moon"],
    platforms: ["desktop"], verification: "tentative",
    controls: ["Teclado e mouse"],
    notes: ["A versão hospedada anteriormente precisa de nova validação."],
  },
  {
    id: "kino-der-toten", title: "Kino der Toten",
    aliases: ["Kino"],
    platforms: ["desktop"], verification: "tentative",
    controls: ["Teclado e mouse"],
    notes: ["A URL específica do catálogo precisa de nova validação."],
  },
  {
    id: "bo3-cheese-cube", title: "BO3 Cheese Cube",
    aliases: ["Cheese Cube", "Black Ops 3 Cheese Cube"],
    platforms: [], verification: "unverified",
    notes: ["O projeto vinculado anteriormente não está confirmado como disponível."],
  },
  {
    id: "black-ops-2", title: "Black Ops 2",
    aliases: ["BO2"],
    platforms: [], verification: "unverified",
    notes: ["A versão browser e seus requisitos não foram confirmados."],
  },
  {
    id: "modern-warfare-2", title: "Modern Warfare 2",
    aliases: ["MW2"],
    platforms: [], verification: "unverified",
    notes: ["Não foi possível validar os requisitos do host externo."],
  },
  {
    id: "skate-3", title: "Skate 3",
    aliases: ["Skate 3 Browser", "Skate. 3", "skate.3"],
    platforms: ["desktop", "mobile"], mobileExperimental: true, verification: "documented",
    features: ["webgpu"], controls: ["Teclado e mouse; controles touch sujeitos à versão"],
    setup: ["Exige dados do jogo provenientes de uma cópia legítima convertida."],
    notes: ["No celular, controles e desempenho são experimentais.", "WebGPU disponível não garante memória, desempenho ou arquivos necessários."],
    source: "https://skate.aaddpp.lol/"
  },
  {
    id: "skate-rust", title: "Skate Rust",
    platforms: ["desktop"], verification: "tentative",
    notes: ["O destino anterior apresentou conteúdo não correspondente ao jogo; confira a URL."],
  },
  {
    id: "cs-surf", title: "CS Surf",
    aliases: ["Counter-Strike Surf"],
    platforms: ["desktop"], verification: "documented",
    controls: ["Teclado e mouse"],
    notes: ["Mouse capturado pelo jogo após clique."],
    source: "https://surfd.net/"
  },
  {
    id: "halo-ce", title: "Halo CE",
    aliases: ["Halo Combat Evolved", "Halo CE Desktop", "Halo: Combat Evolved (Web)"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm", "webgl2"], controls: ["Teclado e mouse"],
    setup: ["É necessário fornecer arquivos originais compatíveis do Halo CE (XISO)."],
    notes: ["A origem do jogo deve validar isolação e memória quando exigidas."],
    source: "https://mitchellhynes.com/halo"
  },
  {
    id: "halo-ce-mobile", title: "Halo CE Mobile",
    aliases: ["Halo Mobile"],
    platforms: ["mobile"], verification: "documented",
    features: ["wasm"], controls: ["Touch / controle"],
    setup: ["Necessária imagem ISO/XISO legítima e compatível do jogo."],
    notes: ["A versão mobile tem launcher diferente da versão desktop.", "Verifique espaço e memória no dispositivo."],
    source: "https://hcemobile.com/"
  },
  {
    id: "pes-6", title: "PES 6",
    aliases: ["Pro Evolution Soccer 6", "PES6"],
    platforms: ["desktop"], verification: "documented",
    controls: ["Teclado ou controle, conforme o host"],
    source: "https://pes6.optijuegos.net/"
  },
  {
    id: "gta-5", title: "GTA 5",
    aliases: ["GTA V", "Grand Theft Auto V"],
    platforms: [], verification: "unverified",
    notes: ["Não há build web funcional confirmada para a URL compartilhada anteriormente."],
  },
  {
    id: "gta-vice-city", title: "GTA Vice City",
    aliases: ["GTA: Vice City", "Grand Theft Auto Vice City"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado e mouse"],
    setup: ["Exige arquivos legítimos do jogo no formato aceito pelo port."],
    source: "https://joncodeofficial.github.io/"
  },
  {
    id: "simpsons-hit-run", title: "The Simpsons: Hit & Run",
    aliases: ["Simpsons Hit and Run", "The Simpsons Hit and Run"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado"],
    setup: ["O host pode exigir configuração adicional/primeiro carregamento."],
    source: "https://shar-wasm.cjoseph.workers.dev/"
  },
  {
    id: "quake-1", title: "Quake 1",
    aliases: ["Quake", "Quake I"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado e mouse"],
    source: "https://q1.pieter.com/"
  },
  {
    id: "quake-2", title: "Quake 2",
    aliases: ["Quake II"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado e mouse"],
    source: "https://q2.pieter.com/"
  },
  {
    id: "quake-3", title: "Quake 3",
    aliases: ["Quake III", "Quake III Arena", "Quake 3 Arena"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado e mouse"],
    source: "https://q3.pieter.com/"
  },
  {
    id: "return-to-castle-wolfenstein", title: "Return to Castle Wolfenstein",
    aliases: ["RTCW"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado e mouse"],
    source: "https://rtcw.pieter.com/"
  },
  {
    id: "unreal-tournament", title: "Unreal Tournament",
    platforms: [], verification: "unverified",
    notes: ["O endereço compartilhado não confirmou um port correspondente a Unreal Tournament."],
  },
  {
    id: "half-life", title: "Half-Life",
    aliases: ["Half Life", "Half-Life Web"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado e mouse"],
    setup: ["A versão completa exige arquivos próprios de jogo, conforme o port."],
    source: "https://pixelsuft.github.io/"
  },
  {
    id: "half-life-cs16", title: "Half-Life / CS 1.6",
    aliases: ["Half-Life/CS 1.6", "CS 1.6", "Counter Strike 1.6", "webXash"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Teclado e mouse"],
    setup: ["A versão completa precisa dos dados de jogo fornecidos pelo próprio usuário."],
    source: "https://x8bitrain.github.io/"
  },
  {
    id: "diablo", title: "Diablo",
    aliases: ["Diablo Web", "Diablo 1"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Mouse e teclado"],
    notes: ["O shareware pode estar disponível; para conteúdo completo, verifique os arquivos exigidos pelo host."],
    source: "https://johnimril.github.io/"
  },
  {
    id: "hedgewars", title: "Hedgewars",
    platforms: [], verification: "unverified",
    notes: ["Não há build browser verificável correspondente à URL anterior."],
  },
  {
    id: "wasm-arcade", title: "GTA / Minecraft (WASM Arcade)",
    aliases: ["GTA / Minecraft", "WASM Arcade", "GTA Minecraft"],
    platforms: ["desktop"], verification: "tentative",
    notes: ["É um agregador: os requisitos variam por título selecionado."],
  },
  {
    id: "2048", title: "2048",
    platforms: ["desktop", "mobile"], verification: "basic",
    controls: ["Teclado ou gestos touch"],
    notes: ["Jogo HTML5 leve; ainda depende de a página do jogo estar disponível."],
  },
  {
    id: "hextris", title: "Hextris",
    platforms: ["desktop", "mobile"], verification: "basic",
    controls: ["Teclado ou gestos touch"],
    notes: ["Jogo HTML5 leve; ainda depende de a página do jogo estar disponível."],
  },
  {
    id: "openttd", title: "OpenTTD",
    aliases: ["Open TTD", "OpenTTD Web"],
    platforms: ["desktop"], verification: "documented",
    features: ["wasm"], controls: ["Mouse e teclado"],
    notes: ["A versão browser pode exigir downloads adicionais de dados."],
    source: "https://openttd-web.pages.dev/"
  },
  {
    id: "pokemon-red", title: "Pokémon Red",
    aliases: ["Pokemon Red", "Pokémon Red Version", "Pokemon Red Version"],
    platforms: ["desktop", "mobile"], verification: "documented",
    features: ["wasm"], controls: ["Teclado ou controles virtuais"],
    setup: ["Requer ROM obtida legitimamente pelo usuário e emulador configurado."],
    notes: ["A compatibilidade final também depende do EmulatorJS carregado no portal."],
  },
  {
    id: "pokemon-yellow", title: "Pokémon Yellow",
    aliases: ["Pokemon Yellow", "Pokemon Yellow Version"],
    platforms: ["desktop", "mobile"], verification: "documented",
    features: ["wasm"], controls: ["Teclado ou controles virtuais"],
    setup: ["Requer ROM obtida legitimamente pelo usuário e emulador configurado."],
  },
  {
    id: "pokemon-crystal", title: "Pokémon Crystal",
    aliases: ["Pokemon Crystal", "Pokemon Crystal Version"],
    platforms: ["desktop", "mobile"], verification: "documented",
    features: ["wasm"], controls: ["Teclado ou controles virtuais"],
    setup: ["Requer ROM obtida legitimamente pelo usuário e emulador configurado."],
  },
  {
    id: "pokemon-firered", title: "Pokémon FireRed",
    aliases: ["Pokemon FireRed", "Pokemon Fire Red", "Pokémon Fire Red"],
    platforms: ["desktop", "mobile"], verification: "documented",
    features: ["wasm"], controls: ["Teclado ou controles virtuais"],
    setup: ["Requer ROM obtida legitimamente pelo usuário e emulador configurado."],
  },
  {
    id: "pokemon-leafgreen", title: "Pokémon LeafGreen",
    aliases: ["Pokemon LeafGreen", "Pokemon Leaf Green", "Pokémon Leaf Green"],
    platforms: ["desktop", "mobile"], verification: "documented",
    features: ["wasm"], controls: ["Teclado ou controles virtuais"],
    setup: ["Requer ROM obtida legitimamente pelo usuário e emulador configurado."],
  },
  {
    id: "pokemon-emerald", title: "Pokémon Emerald",
    aliases: ["Pokemon Emerald"],
    platforms: ["desktop", "mobile"], verification: "documented",
    features: ["wasm"], controls: ["Teclado ou controles virtuais"],
    setup: ["Requer ROM obtida legitimamente pelo usuário e emulador configurado."],
  },
];

/** Normalização estrita: não confundir Quake 1 com Quake 2 nem Halo desktop com Halo mobile. */
export function normalizeGameId(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BY_ALIAS = new Map();
for (const profile of GAME_PROFILES) {
  for (const key of [profile.id, profile.title, ...(profile.aliases ?? [])]) {
    const normalized = normalizeGameId(key);
    if (BY_ALIAS.has(normalized) && BY_ALIAS.get(normalized) !== profile) {
      throw new Error(`Perfil de jogo ambíguo: ${key}`);
    }
    BY_ALIAS.set(normalized, profile);
  }
}

/** Usa ID, título ou nome, com match exato. Nunca usa substring ou apenas parte do título. */
export function findGameProfile(game) {
  if (typeof game === "string") return BY_ALIAS.get(normalizeGameId(game)) ?? null;
  if (!game || typeof game !== "object") return null;
  for (const key of [game.id, game.title, game.name]) {
    const hit = BY_ALIAS.get(normalizeGameId(key));
    if (hit) return hit;
  }
  return null;
}
