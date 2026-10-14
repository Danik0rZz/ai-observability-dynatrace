import { QR, Reveal, Scene, qrConfigured, useScene } from 'beatdeck';
import { config } from '../deck.config';
import { A, L } from '../ui';

const RECAP: [string, string][] = [
  ['Ingesta', 'OneAgent · OpenInference · OpenTelemetry · OpenLLMetry'],
  ['Idioma común', 'atributos y métricas gen_ai.*'],
  ['La app', 'Overview · Explorer · Prompts · Agents topology · Evaluations'],
  ['Calidad', 'LLM-as-a-judge en la UI y con dt-evals'],
  ['Actuar', 'alertas · Distributed Tracing · Dynatrace Intelligence'],
];

function End_() {
  const { here, b } = useScene();
  const recap = here && b === 0;
  const q = here && b === 1;
  const qr = qrConfigured(config.qrUrl);
  return (
    <>
      {/* 17.1 recap */}
      <Reveal on={recap} out={q} x={L + 4} y={130}>
        <div className="t-eyebrow">// en resumen</div>
      </Reveal>
      {RECAP.map(([k, v], i) => (
        <Reveal key={k} on={recap} out={q} x={L} y={210 + i * 150} delay={100 + i * 120}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 50, borderBottom: '1px solid var(--hair)', paddingBottom: 26, width: 1620 }}>
            <span style={{ fontSize: 64, fontWeight: 600, letterSpacing: '-0.03em', width: 470, flex: 'none' }}>{k}</span>
            <span className="mono keep-case" style={{ fontSize: 30, color: i === 1 ? 'var(--accent)' : 'var(--ink-2)' }}>{v}</span>
          </div>
        </Reveal>
      ))}

      {/* 17.2 questions + QR to the docs */}
      <Reveal on={q} x={160} y={380}>
        <div className="t-statement" style={{ fontSize: 220 }}>¿Preguntas<A>?</A></div>
      </Reveal>
      <Reveal on={q} x={170} y={680} delay={200}>
        <div className="t-meta" style={{ fontSize: 24 }}>{config.author}</div>
      </Reveal>
      {qr && (
        <Reveal on={q} x={1440} y={330} delay={300}>
          <QR url={config.qrUrl} size={320} />
          {config.qrLabel && (
            <div className="t-meta" style={{ fontSize: 18, marginTop: 24, width: 320, textAlign: 'center', textTransform: 'none', letterSpacing: '0.02em' }}>{config.qrLabel}</div>
          )}
        </Reveal>
      )}
    </>
  );
}

/** 17 CIERRE — recap, then questions with the QR from deck.config.ts. */
export const End = () => <Scene index={16}><End_ /></Scene>;
