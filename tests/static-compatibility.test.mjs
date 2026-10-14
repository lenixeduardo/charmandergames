import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { GAME_PROFILES, findGameProfile } from "../dist/compatibility/catalog.mjs";
import { evaluateCompatibility, getPlatformLabel, detectBrowserCapabilities } from "../dist/compatibility/compatibility.mjs";

const catalog = JSON.parse(readFileSync(new URL("../data/sites-current-catalog.json", import.meta.url), "utf8"));
const desktop = {device:"desktop",wasm:true,webgl2:true,webgpu:true};
const mobile = {...desktop,device:"mobile"};

test("cada um dos 38 cards do Sites tem um perfil correspondente na distribuição", () => {
  assert.equal(catalog.catalog.length,38);
  assert.equal(GAME_PROFILES.length,43);
  for (const {name} of catalog.catalog) {
    const profile=findGameProfile({id:"id-local-alternativo",name});
    assert.ok(profile, "Não existe perfil para "+name);
  }
});

test("badge informa corretamente desktop, mobile e compatibilidade incerta", () => {
  assert.equal(getPlatformLabel(findGameProfile("2048")), "Desktop e mobile");
  assert.equal(evaluateCompatibility("2048",desktop).status,"ready");
  assert.equal(evaluateCompatibility("Hextris",mobile).status,"ready");
  assert.equal(getPlatformLabel(findGameProfile("Halo CE Mobile")), "Somente mobile");
  assert.equal(evaluateCompatibility("Halo CE Mobile",desktop).status,"blocked");
  assert.equal(evaluateCompatibility("Halo CE Mobile",mobile).status,"setup");
  assert.equal(evaluateCompatibility("BO1 Zombies",mobile).status,"blocked");
  assert.equal(evaluateCompatibility("BO1 Zombies",desktop).status,"setup");
  assert.equal(evaluateCompatibility("Quake 1",{...desktop,wasm:false}).status,"blocked");
  assert.equal(evaluateCompatibility("Skate 3",{...desktop,webgpu:false}).status,"blocked");
  assert.equal(evaluateCompatibility("Skate 3",{...desktop,webgpu:null}).status,"setup");
  assert.equal(evaluateCompatibility("GTA 5",desktop).status,"unknown");
  assert.equal(evaluateCompatibility("Pokémon Crystal — disassembly",desktop).status,"unknown");
});

test("trava de assets externos: ROM própria não é identificada como execução garantida",()=>{
  assert.equal(evaluateCompatibility("Pokémon Red",desktop).status,"setup");
  assert.equal(evaluateCompatibility("Pokémon Red",mobile).status,"setup");
  assert.ok(evaluateCompatibility("Pokémon Red",desktop).details.some(s=>s.includes("ROM")));
  assert.equal(evaluateCompatibility("Jogo novo não registrado",desktop).status,"unknown");
});

test("verifica APIs reais com canvas e adaptador de GPU sem presumir hardware",async()=>{
  const r=await detectBrowserCapabilities({
    globalObject:{WebAssembly:{}},
    navigator:{userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",gpu:{requestAdapter:async()=>null}},
    document:{createElement:()=>({getContext:()=>null})}
  });
  assert.equal(r.device,"desktop");
  assert.equal(r.wasm,true);
  assert.equal(r.webgl2,false);
  assert.equal(r.webgpu,false);
});
