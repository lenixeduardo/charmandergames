/** Helpers locais: arquivos comerciais e patches não são hospedados pelo portal. */
const MAX_ROM_BYTES=64*1024*1024,MAX_PATCH_BYTES=16*1024*1024;
function view(source){
 if(source instanceof Uint8Array)return source;
 if(source instanceof ArrayBuffer)return new Uint8Array(source);
 if(ArrayBuffer.isView(source))return new Uint8Array(source.buffer,source.byteOffset,source.byteLength);
 throw new TypeError("Use ArrayBuffer ou Uint8Array.");
}
export function gameCore(platform){return platform==="N64"?"n64":platform==="GBA"?"gba":"gb";}
export function romExtension(name){return String(name).split(".").pop().trim().toLowerCase();}
export function platformForRomName(name){
 const extensions={gba:"GBA",gbc:"GBC",gb:"GB",z64:"N64",n64:"N64",v64:"N64"};
 const platform=extensions[romExtension(name)];
 if(!platform)throw new Error("Formato de ROM não suportado. Escolha uma ROM descompactada .gba, .gb, .gbc, .z64, .n64 ou .v64.");
 return platform;
}
export function validateRomForPlatform(name,platform,size){
 const extension=romExtension(name);
 const allowed=platform==="N64"?["z64","n64","v64"]:platform==="GBA"?["gba"]:platform==="GBC"?["gbc"]:platform==="GB"?["gb"]:[];
 if(!allowed.includes(extension))throw new Error("Arquivo incompatível com "+platform+". Formatos aceitos: "+allowed.map(x=>"."+x).join(", ")+". Descompacte seu ZIP antes de carregar.");
 if(!Number.isFinite(size)||size<=0||size>MAX_ROM_BYTES)throw new Error("ROM vazia ou maior que 64 MB.");
 return gameCore(platform);
}
export function validateN64Header(source){
 const bytes=view(source);
 if(bytes.length<4)throw new Error("ROM de Nintendo 64 incompleta.");
 const sig=Array.from(bytes.subarray(0,4)).map(n=>n.toString(16).padStart(2,"0")).join("");
 if(!["80371240","37804012","40123780"].includes(sig))throw new Error("Cabeçalho N64 inválido ou arquivo corrompido.");
 return true;
}
/** Validação básica do título e código da ROM-base, não da revisão exata. */
export function validateRubyBase(source){
 const bytes=view(source);
 if(bytes.length<0xb0)throw new Error("ROM-base Pokémon Ruby incompleta.");
 const title=String.fromCharCode(...bytes.subarray(0xa0,0xac)).replace(/\0/g,"").trim();
 const code=String.fromCharCode(...bytes.subarray(0xac,0xb0));
 if(!title.includes("POKEMON RUBY")||!code.startsWith("AXV"))throw new Error("O patch Jupiter exige uma ROM-base original de Pokémon Ruby (GBA), não outro jogo.");
 return true;
}

/** Aplica registros IPS padrão, RLE, marcador EOF e truncamento opcional. */
export function applyIpsPatch(baseSource,patchSource){
 const base=view(baseSource),patch=view(patchSource);
 if(!base.length||base.length>MAX_ROM_BYTES)throw new Error("ROM-base inválida ou maior que 64 MB.");
 if(patch.length<8||patch.length>MAX_PATCH_BYTES)throw new Error("Tamanho de patch IPS inválido.");
 if([80,65,84,67,72].some((byte,i)=>patch[i]!==byte))throw new Error("Arquivo de patch não é IPS.");
 let out=base.slice(),pos=5,finished=false;
 const u16=i=>(patch[i]<<8)|patch[i+1],u24=i=>(patch[i]<<16)|(patch[i+1]<<8)|patch[i+2];
 function grow(end){
  if(end>MAX_ROM_BYTES)throw new Error("Patch ultrapassa o limite de 64 MB.");
  if(end>out.length){const result=new Uint8Array(end);result.set(out);out=result;}
 }
 while(pos+3<=patch.length){
  if(patch[pos]===69&&patch[pos+1]===79&&patch[pos+2]===70){pos+=3;finished=true;break;}
  if(pos+5>patch.length)throw new Error("Registro IPS incompleto.");
  const offset=u24(pos);pos+=3;const size=u16(pos);pos+=2;
  if(size){if(pos+size>patch.length)throw new Error("Dados IPS truncados.");grow(offset+size);out.set(patch.subarray(pos,pos+size),offset);pos+=size;}
  else{if(pos+3>patch.length)throw new Error("Registro RLE incompleto.");const repeat=u16(pos),value=patch[pos+2];pos+=3;grow(offset+repeat);out.fill(value,offset,offset+repeat);}
 }
 if(!finished)throw new Error("Marcador EOF ausente no patch IPS.");
 if(pos+3===patch.length){
  const len=u24(pos);if(len>MAX_ROM_BYTES)throw new Error("Tamanho final do patch excede 64 MB.");
  if(len!==out.length){const resized=new Uint8Array(len);resized.set(out.subarray(0,len));out=resized;}
 }else if(pos!==patch.length)throw new Error("Dados extras inválidos após EOF do IPS.");
 return out;
}
