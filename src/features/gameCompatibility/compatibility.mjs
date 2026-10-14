import { findGameProfile } from "./catalog.mjs";

const FEATURE_LABELS = {
  wasm: "WebAssembly",
  webgl2: "WebGL 2 / aceleração gráfica",
  webgpu: "WebGPU / adaptador gráfico"
};

export function getPlatformLabel(profile) {
  if (!profile || !profile.platforms?.length) return "Plataformas não verificadas";
  const desktop = profile.platforms.includes("desktop");
  const mobile = profile.platforms.includes("mobile");
  if (desktop && mobile && profile.mobileExperimental) return "Desktop · Mobile experimental";
  if (desktop && mobile) return "Desktop e mobile";
  return desktop ? "Somente desktop" : "Somente mobile";
}

/**
 * Evita confundir navegador de telefone com desktop ao solicitar 'versão para computador'.
 * Não infere capacidade do teclado pela API: navegadores não oferecem detecção confiável.
 */
export function detectDeviceKind(nav) {
  if (!nav) return "unknown";
  const ua = nav.userAgent ?? "";
  const mobileHint = nav.userAgentData?.mobile;
  const ipadDesktopUA = /Macintosh/i.test(ua) && Number(nav.maxTouchPoints ?? 0) > 1;
  if (ipadDesktopUA || /iPad|iPhone|iPod|Android|Mobile|Silk/i.test(ua) || mobileHint === true) return "mobile";
  if (ua || mobileHint === false) return "desktop";
  return "unknown";
}

export async function detectBrowserCapabilities(environment = {}) {
  const globalObject = environment.globalObject ?? globalThis;
  const nav = environment.navigator ?? globalObject.navigator;
  const doc = environment.document ?? globalObject.document;
  const kind = detectDeviceKind(nav);
  const result = {
    device: kind,
    wasm: typeof globalObject.WebAssembly === "object" || typeof globalObject.WebAssembly === "function",
    webgl2: null,
    webgpu: null,
  };
  if (doc && typeof doc.createElement === "function") {
    try {
      const canvas = doc.createElement("canvas");
      const context = canvas.getContext?.("webgl2");
      result.webgl2 = Boolean(context);
      context?.getExtension?.("WEBGL_lose_context")?.loseContext?.();
    } catch {
      result.webgl2 = false;
    }
  }
  if (nav) {
    if (!nav.gpu || typeof nav.gpu.requestAdapter !== "function") {
      result.webgpu = false;
    } else {
      try {
        const adapter = await nav.gpu.requestAdapter();
        result.webgpu = Boolean(adapter);
      } catch {
        result.webgpu = null;
      }
    }
  }
  return result;
}

/**
 * Status é uma triagem local, NÃO um teste real do jogo remoto ou um benchmark.
 * Status possíveis: ready | setup | blocked | unknown.
 */
export function evaluateCompatibility(game, capabilities) {
  const profile = findGameProfile(game);
  const empty = {
    profile: null, platformLabel: "Plataformas não verificadas",
    status: "unknown", statusLabel: "Não verificado",
    checks: [], details: ["Não há perfil de requisitos para esta versão do jogo."]
  };
  if (!profile) return empty;

  const platformLabel = getPlatformLabel(profile);
  const requirements = (profile.features ?? []).map(feature => FEATURE_LABELS[feature] ?? feature);
  const controls = profile.controls ?? [];
  const setup = profile.setup ?? [];
  const notes = profile.notes ?? [];
  const checks = (profile.features ?? []).map(feature => ({
    key: feature,
    label: FEATURE_LABELS[feature] ?? feature,
    result: capabilities?.[feature] === true ? "pass" : capabilities?.[feature] === false ? "fail" : "unknown"
  }));
  const output = (status, statusLabel, extraDetails = []) => ({
    profile, platformLabel, status, statusLabel, requirements, controls, setup, notes, checks,
    details: [
      ...extraDetails,
      ...setup,
      ...notes,
    ]
  });
  if (profile.verification === "unverified") {
    return output("unknown", "Não verificado", ["O jogo ainda precisa de identificação e validação da versão web."]);
  }
  if (profile.verification === "tentative") {
    return output("unknown", "Não verificado", ["A compatibilidade desse host está pendente de validação."]);
  }
  if (!capabilities || capabilities.device === "unknown") {
    return output("unknown", "Verificando dispositivo", ["Não foi possível identificar a categoria do dispositivo."]);
  }
  if (!profile.platforms.includes(capabilities.device)) {
    return output("blocked", "Plataforma incompatível", [
      capabilities.device === "mobile" ? "A versão cadastrada não confirma suporte a dispositivos mobile." : "A versão cadastrada é destinada a dispositivos mobile."
    ]);
  }
  const missing = checks.filter(check => check.result === "fail");
  if (missing.length) {
    return output("blocked", "Requisito indisponível", [
      `Recurso obrigatório ausente: ${missing.map(check => check.label).join(", ")}.`
    ]);
  }
  const indeterminate = checks.filter(check => check.result === "unknown");
  if (indeterminate.length) {
    return output("setup", "Verificação incompleta", [
      `Não foi possível confirmar: ${indeterminate.map(check => check.label).join(", ")}.`
    ]);
  }
  if (profile.verification === "basic") {
    return output("ready", "Requisitos detectáveis atendidos");
  }
  if (setup.length || profile.mobileExperimental && capabilities.device === "mobile") {
    return output("setup", "Requer configuração", [
      "Os recursos de navegador verificáveis estão disponíveis, mas ainda há condições externas a conferir."
    ]);
  }
  if (!checks.length) {
    return output("setup", "Verificação incompleta", [
      "Este jogo não informa APIs técnicas suficientes para um diagnóstico automático."
    ]);
  }
  return output("ready", "Requisitos detectáveis atendidos", [
    "A disponibilidade do servidor, arquivos do jogo e desempenho real só podem ser confirmados ao executar."
  ]);
}

export async function checkGameCompatibility(game, environment) {
  const capabilities = await detectBrowserCapabilities(environment);
  return evaluateCompatibility(game, capabilities);
}
