import test from "node:test";
import assert from "node:assert/strict";
import { GAME_PROFILES, findGameProfile, normalizeGameId } from "../src/features/gameCompatibility/catalog.mjs";
import { detectBrowserCapabilities, detectDeviceKind, evaluateCompatibility, getPlatformLabel } from "../src/features/gameCompatibility/compatibility.mjs";

const desktop = { device: "desktop", wasm: true, webgl2: true, webgpu: true };
const mobile = { ...desktop, device: "mobile" };

test("todos os 25 títulos da lista inicial e 9 jogos complementares possuem perfis", () => {
  assert.equal(GAME_PROFILES.length, 34);
  assert.equal(new Set(GAME_PROFILES.map(p => p.id)).size, GAME_PROFILES.length);
  assert.equal(GAME_PROFILES.filter(p => p.id.startsWith("pokemon-")).length, 6);
  assert.ok(GAME_PROFILES.every(p => ["documented", "tentative", "unverified", "basic"].includes(p.verification)));
});

test("aliases reconhecem acentos e nomes específicos sem confundir versões", () => {
  assert.equal(normalizeGameId("Pokémon FireRed"), "pokemon-firered");
  assert.equal(findGameProfile({ name: "Pokémon Yellow" }).id, "pokemon-yellow");
  assert.equal(findGameProfile("Quake III Arena").id, "quake-3");
  assert.equal(findGameProfile("Quake II").id, "quake-2");
  assert.equal(findGameProfile("Halo CE Mobile").id, "halo-ce-mobile");
  assert.equal(findGameProfile("Halo CE").id, "halo-ce");
  assert.equal(findGameProfile("Skate 3").id, "skate-3");
  assert.equal(findGameProfile("Jogo inventado"), null);
});

test("BO1 é desktop, exige WebGL2 e não é falsamente declarado compatível no mobile", () => {
  assert.equal(getPlatformLabel(findGameProfile("BO1 Zombies")), "Somente desktop");
  assert.equal(evaluateCompatibility("BO1 Zombies", desktop).status, "setup");
  assert.equal(evaluateCompatibility("BO1 Zombies", mobile).status, "blocked");
  assert.equal(evaluateCompatibility("BO1 Zombies", {...desktop, webgl2:false}).status, "blocked");
});

test("isolamento de origem do BO1 não é testado no portal diferente do host", () => {
  const result = evaluateCompatibility("BO1 Zombies", desktop);
  assert.equal(result.status, "setup");
  assert.ok(result.details.some(s => s.includes("memória compartilhada")));
  assert.ok(result.checks.every(c => c.result === "pass"));
});

test("Halo desktop não se torna pronto para jogar sem confirmar ISO legítima", () => {
  const result = evaluateCompatibility("Halo CE", desktop);
  assert.equal(result.status, "setup");
  assert.ok(result.details.some(s => s.includes("XISO")));
});

test("Halo mobile tem rota própria", () => {
  assert.equal(getPlatformLabel(findGameProfile("Halo CE Mobile")), "Somente mobile");
  assert.equal(evaluateCompatibility("Halo CE Mobile", desktop).status, "blocked");
  assert.equal(evaluateCompatibility("Halo CE Mobile", mobile).status, "setup");
});

test("Skate 3 exige WebGPU e possui mobile experimental", () => {
  const missing = evaluateCompatibility("Skate 3", {...desktop, webgpu:false});
  assert.equal(missing.status, "blocked");
  assert.equal(evaluateCompatibility("Skate 3", desktop).status, "setup");
  assert.equal(evaluateCompatibility("Skate 3", mobile).status, "setup");
  assert.match(getPlatformLabel(findGameProfile("Skate 3")), /experimental/);
});

test("2048 e Hextris têm plataforma desktop e mobile sem exigências de GPU 3D", () => {
  for (const name of ["2048", "Hextris"]) {
    assert.equal(evaluateCompatibility(name, desktop).status, "ready");
    assert.equal(evaluateCompatibility(name, mobile).status, "ready");
  }
});

test("jogos não verificados nunca mostram execução confirmada", () => {
  for (const name of ["BO3 Cheese Cube", "Black Ops 2", "Modern Warfare 2", "GTA 5", "Hedgewars", "Unreal Tournament"]) {
    const result = evaluateCompatibility(name, desktop);
    assert.equal(result.status, "unknown", name);
  }
  assert.equal(evaluateCompatibility("Jogo desconhecido", desktop).status, "unknown");
  assert.equal(evaluateCompatibility({ name: "Pokemon Red" }, desktop).status, "setup");
});

test("não supõe que APIs indisponíveis para teste sejam suportadas", () => {
  assert.equal(evaluateCompatibility("Quake 1", {...desktop, wasm:null}).status, "setup");
  assert.equal(evaluateCompatibility("Quake 1", {...desktop, wasm:false}).status, "blocked");
  assert.equal(evaluateCompatibility("Quake 1", {device:"unknown",wasm:true}).status, "unknown");
});

test("dispositivo iPadOS mascarado como Macintosh é mobile", () => {
  assert.equal(detectDeviceKind({userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X)", maxTouchPoints:5}), "mobile");
  assert.equal(detectDeviceKind({userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",maxTouchPoints:0}), "desktop");
  assert.equal(detectDeviceKind({userAgent:"Mozilla/5.0 (Linux; Android 16)"}), "mobile");
  assert.equal(detectDeviceKind(undefined), "unknown");
});

test("capability detection confirma WebGL2 e WebGPU com adaptador presente", async () => {
  const result = await detectBrowserCapabilities({
    globalObject: {WebAssembly: {}},
    navigator: {userAgent:"Desktop UA", gpu:{requestAdapter:async()=>({features:new Set()})}},
    document: {createElement:()=>({getContext:()=>({getExtension:()=>null})})}
  });
  assert.deepEqual(result, {device:"desktop",wasm:true,webgl2:true,webgpu:true});
});

test("WebGPU sem adaptador disponível não é declarado compatível", async () => {
  const result = await detectBrowserCapabilities({
    globalObject: {WebAssembly: {}},
    navigator: {userAgent:"Desktop UA",gpu:{requestAdapter:async()=>null}},
    document: {createElement:()=>({getContext:()=>null})}
  });
  assert.equal(result.webgpu,false);
  assert.equal(result.webgl2,false);
});

test("falha ao consultar adaptador WebGPU fica como desconhecida", async () => {
  const result = await detectBrowserCapabilities({
    globalObject: {WebAssembly: {}},
    navigator: {userAgent:"Desktop UA",gpu:{requestAdapter:async()=>{throw new Error("denied");}}},
    document: {createElement:()=>({getContext:()=>null})}
  });
  assert.equal(result.webgpu,null);
  assert.equal(evaluateCompatibility("Skate 3",result).status,"setup");
});
