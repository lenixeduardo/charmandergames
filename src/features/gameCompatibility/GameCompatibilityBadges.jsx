import React, { useEffect, useId, useState } from "react";
import {
  Monitor, Smartphone, CircleCheck, CircleHelp, AlertTriangle,
  CircleX, ChevronDown, Info
} from "lucide-react";
import { checkGameCompatibility, getPlatformLabel } from "./compatibility.mjs";
import { findGameProfile } from "./catalog.mjs";
import "./GameCompatibilityBadges.css";

const ICON_BY_STATUS = {
  ready: CircleCheck,
  setup: AlertTriangle,
  blocked: CircleX,
  unknown: CircleHelp,
};

function PlatformIcon({ profile }) {
  if (!profile?.platforms?.length) return <CircleHelp size={13} aria-hidden="true" />;
  if (profile.platforms.includes("desktop")) return <Monitor size={13} aria-hidden="true" />;
  return <Smartphone size={13} aria-hidden="true" />;
}

/**
 * Cole em cada card do CharmanderGames como <GameCompatibilityBadges game={game} />.
 * NÃO bloqueia o link de jogar: uma checagem genérica não substitui o diagnóstico do host.
 */
export function GameCompatibilityBadges({ game, className = "" }) {
  const profile = findGameProfile(game);
  const detailsId = useId();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;
    setResult(null);
    checkGameCompatibility(game)
      .then(next => { if (active) setResult(next); })
      .catch(() => {
        if (active) {
          setResult({
            status: "unknown",
            statusLabel: "Não verificado",
            details: ["Não foi possível consultar os recursos deste navegador."],
            checks: [],
          });
        }
      });
    return () => { active = false; };
  }, [game?.id, game?.title, game?.name, typeof game === "string" ? game : null]);

  const platformLabel = getPlatformLabel(profile);
  const status = result?.status ?? "unknown";
  const statusLabel = result?.statusLabel ?? "Verificando dispositivo…";
  const StatusIcon = ICON_BY_STATUS[status] ?? CircleHelp;
  const details = result?.details ?? [];
  const checks = result?.checks ?? [];

  return (
    <section className={`cg-compatibility ${className}`.trim()} aria-label="Compatibilidade deste jogo">
      <div className="cg-compatibility__badges">
        <span className="cg-compatibility__platform" title={platformLabel}>
          <PlatformIcon profile={profile} />
          {platformLabel}
        </span>
        <span className={`cg-compatibility__status cg-compatibility__status--${status}`} role="status">
          <StatusIcon size={13} aria-hidden="true" />
          {statusLabel}
        </span>
      </div>

      <button
        type="button"
        className="cg-compatibility__toggle"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen(value => !value)}
      >
        <Info size={14} aria-hidden="true" />
        Requisitos
        <ChevronDown size={14} aria-hidden="true" className={open ? "cg-compatibility__chevron cg-compatibility__chevron--open" : "cg-compatibility__chevron"} />
      </button>

      {open && (
        <div className="cg-compatibility__details" id={detailsId}>
          {result === null ? (
            <p>Verificando o navegador…</p>
          ) : (
            <>
              <p className="cg-compatibility__intro">
                Checagem feita no seu navegador. Isso não garante desempenho nem que o serviço externo esteja online.
              </p>
              {checks.length > 0 && (
                <ul className="cg-compatibility__checks">
                  {checks.map(check => (
                    <li key={check.key}>
                      <span className={`cg-compatibility__dot cg-compatibility__dot--${check.result}`} aria-hidden="true" />
                      {check.label}: {check.result === "pass" ? "disponível" : check.result === "fail" ? "indisponível" : "não verificado"}
                    </li>
                  ))}
                </ul>
              )}
              {result?.controls?.length > 0 && <p><strong>Controles:</strong> {result.controls.join("; ")}</p>}
              {details.length > 0 && (
                <ul className="cg-compatibility__notes">
                  {details.map((detail, index) => <li key={index}>{detail}</li>)}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default GameCompatibilityBadges;
