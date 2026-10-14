import test from "node:test";
import assert from "node:assert/strict";
import { gameCore,romExtension,validateRomForPlatform,validateN64Header,validateRubyBase,applyIpsPatch } from "../dist/rom-utils.mjs";

const enc = s => Uint8Array.from([...s].map(c=>c.charCodeAt(0)));
test("GB/GBC/GBA/N64 são identificados pelo arquivo e pela plataforma",()=>{
 assert.equal(gameCore("GB"),"gb");
 assert.equal(gameCore("GBC"),"gb");
 assert.equal(gameCore("GBA"),"gba");
 assert.equal(gameCore("N64"),"n64");
 assert.equal(romExtension("FireRed.GBA"),"gba");
 for(const [file,platform] of [["Red.gb","GB"],["Crystal.gbc","GBC"],["Ultra Violet.gba","GBA"],["Stadium.z64","N64"],["Stadium.v64","N64"],["Stadium.n64","N64"]])
  assert.ok(validateRomForPlatform(file,platform,1024));
 assert.throws(()=>validateRomForPlatform("Stadium.zip","N64",100),/Descompacte/);
 assert.throws(()=>validateRomForPlatform("Jupiter.ips","GBA",100),/Descompacte/);
 assert.throws(()=>validateRomForPlatform("Stadium.z64","N64",0),/vazia/);
});
test("N64 valida assinatura ROM .z64, .n64 e .v64",()=>{
 for(const data of [[0x80,0x37,0x12,0x40],[0x37,0x80,0x40,0x12],[0x40,0x12,0x37,0x80]])assert.equal(validateN64Header(Uint8Array.from(data)),true);
 assert.throws(()=>validateN64Header(Uint8Array.from([0,1,2,3])),/Cabeçalho/);
});
test("patch IPS aplica substituição e RLE sem modificar a ROM-base",()=>{
 const base=Uint8Array.from([1,2,3,4,5,6,7,8]);
 const patch=Uint8Array.from([...enc("PATCH"),0,0,1,0,2,9,10,0,0,5,0,0,0,2,7,...enc("EOF")]);
 const result=applyIpsPatch(base,patch);
 assert.deepEqual([...result],[1,9,10,4,5,7,7,8]);
 assert.deepEqual([...base],[1,2,3,4,5,6,7,8]);
});
test("patch IPS suporta expansão e tamanho final opcional",()=>{
 const patch=Uint8Array.from([...enc("PATCH"),0,0,5,0,1,88,...enc("EOF"),0,0,8]);
 const result=applyIpsPatch(Uint8Array.from([1,2]),patch);
 assert.deepEqual([...result],[1,2,0,0,0,88,0,0]);
});
test("patch IPS rejeita dados incompletos e arquivos incompatíveis",()=>{
 assert.throws(()=>applyIpsPatch(Uint8Array.from([1]),enc("NOTIPS!!!!")) ,/não é IPS/);
 assert.throws(()=>applyIpsPatch(Uint8Array.from([1]),enc("PATCH")) ,/Tamanho/);
 assert.throws(()=>applyIpsPatch(Uint8Array.from([1]),Uint8Array.from([...enc("PATCH"),0,0,1,0,2,3])),/truncados/);
 assert.throws(()=>applyIpsPatch(Uint8Array.from([1]),Uint8Array.from([...enc("PATCH"),0,0,1,0,1,3])),/EOF/);
});

test("Jupiter rejeita ROMs-base que não sejam Pokémon Ruby",()=>{
 const ruby=new Uint8Array(0xc0);
 ruby.set(enc("POKEMON RUBY"),0xa0);
 ruby.set(enc("AXVE"),0xac);
 assert.equal(validateRubyBase(ruby),true);
 const emerald=new Uint8Array(0xc0);
 emerald.set(enc("POKEMON EMER"),0xa0);
 emerald.set(enc("BPEE"),0xac);
 assert.throws(()=>validateRubyBase(emerald),/Pokémon Ruby/);
 assert.throws(()=>validateRubyBase(new Uint8Array(10)),/incompleta/);
});
