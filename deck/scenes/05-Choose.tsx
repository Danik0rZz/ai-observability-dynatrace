import { Reveal } from 'beatdeck';
import { A } from '../ui';

/**
 * 05.8 OneAgent vs OpenTelemetry, side by side (mirrored columns, divider drawn top to bottom).
 * 05.9 the two titles glide together and lock: OneAgent complements OTel (end-to-end-observability use case).
 * All motion is CSS transitions keyed on the beat, so a fresh load renders the settled frame.
 */

const ROWS: { k: string; l: React.ReactNode; r: React.ReactNode }[] = [
  {
    k: 'código',
    l: <>Ninguno: activar OneAgent features en Settings y reiniciar la app</>,
    r: <>Instrumentar con el SDK, instrumentors o auto-instrumentación</>,
  },
  {
    k: 'cobertura',
    l: <>Python: AWS Bedrock, OpenAI, LangChain + sensores experimentales (Anthropic, Claude Agent SDK, CrewAI…)</>,
    r: <>Cualquier librería compatible con OpenTelemetry o instrumentación propia</>,
  },
  {
    k: 'prompt capture',
    l: <>AWS Bedrock y OpenAI (también como modelo bajo LangChain)</>,
    r: <>Según el instrumentor; se puede ocultar (OPENINFERENCE_HIDE_*)</>,
  },
  {
    k: 'contexto',
    l: <>Full-stack: infraestructura, procesos, Kubernetes, logs, código, vulnerabilidades</>,
    r: <>Estándar vendor-neutral, por OTLP directo o vía Collector / ActiveGate</>,
  },
];

const COL = 730;            // column width
const LX = 150;             // left column x
const RX = 1770 - COL;      // right column x (1040)
const TY = 296, TH = 140;   // title boxes
const ROW0 = 470, ROWH = 125;
const EASE = 'cubic-bezier(.22,1,.36,1)';

function TitleBox({ side, cmp, join }: { side: 'l' | 'r'; cmp: boolean; join: boolean }) {
  const x = side === 'l' ? LX : RX;
  // in 05.9 each box scales to .75 and its centre glides to ±(60 + 274) px from the stage centre
  const dx = join ? (side === 'l' ? 626 - (LX + COL / 2) : 1294 - (RX + COL / 2)) : 0;
  const on = cmp || join;
  const enter = side === 'l' ? -80 : 80;
  return (
    <div style={{
      position: 'absolute', left: x, top: TY, width: COL, height: TH, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
      border: `3px solid ${join ? 'var(--accent)' : 'transparent'}`, background: join ? 'var(--surface)' : 'transparent',
      opacity: on ? 1 : 0,
      transform: on ? `translate(${dx}px, ${join ? 110 : 0}px) scale(${join ? 0.75 : 1})` : `translateX(${enter}px)`,
      transition: on
        ? `opacity 700ms ${EASE} ${cmp && !join ? 250 : 0}ms, transform 1100ms ${EASE} ${join ? 280 : 0}ms, border-color 500ms 700ms, background 500ms 700ms`
        : 'opacity 250ms, transform 250ms',
    }}>
      <div className="t-meta" style={{ fontSize: 20, color: 'var(--accent)' }}>
        {side === 'l' ? 'zero-code · full-stack' : 'OpenInference · OpenLLMetry · SDK'}
      </div>
      <div className="t-statement" style={{ fontSize: 76 }}>{side === 'l' ? 'OneAgent' : 'OpenTelemetry'}</div>
      {join && <div className="dt-sweep" />}
    </div>
  );
}

export function Choose({ here, b }: { here: boolean; b: number }) {
  const cmp = here && b === 7;
  const join = here && b === 8;
  return (
    <>
      {/* divider, drawn top to bottom */}
      <div style={{
        position: 'absolute', left: 959, top: TY, width: 2, height: 660, background: 'var(--hair-strong)',
        transformOrigin: 'top', transform: `scaleY(${cmp ? 1 : 0})`,
        transition: cmp ? `transform 900ms ${EASE} 150ms` : 'transform 250ms',
      }} />

      <TitleBox side="l" cmp={cmp} join={join} />
      <TitleBox side="r" cmp={cmp} join={join} />

      {/* 05.8 the rows, alternating left / right */}
      {ROWS.map((row, i) => {
        const y = ROW0 + i * ROWH;
        const d = 500 + i * 160;
        return (
          <div key={row.k}>
            <Reveal on={cmp} out={join} x={960 - 130} y={y} delay={cmp ? d : 0} rise={10}>
              <div className="t-meta" style={{ width: 260, textAlign: 'center', fontSize: 18, background: 'var(--bg)', padding: '2px 0' }}>{row.k}</div>
            </Reveal>
            <Reveal on={cmp} out={join} x={LX} y={y + 34} delay={cmp ? d + 60 : 0} axis="x" rise={-40}>
              <div style={{ width: COL - 70, fontSize: 28, lineHeight: 1.22 }}>{row.l}</div>
            </Reveal>
            <Reveal on={cmp} out={join} x={RX + 70} y={y + 34} delay={cmp ? d + 120 : 0} axis="x" rise={40}>
              <div style={{ width: COL - 70, fontSize: 28, lineHeight: 1.22, textAlign: 'right' }}>{row.r}</div>
            </Reveal>
          </div>
        );
      })}

      {/* 05.9 the lock: a + between the two, with a pulse */}
      <div style={{
        position: 'absolute', left: 915, top: TY + TH / 2 + 110 - 45, width: 90, height: 90, borderRadius: '50%',
        border: '3px solid var(--accent)', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: join ? 1 : 0, transform: `scale(${join ? 1 : 0.2}) rotate(${join ? 0 : -90}deg)`,
        transition: join ? `opacity 400ms 850ms, transform 700ms cubic-bezier(.34,1.56,.64,1) 850ms` : 'opacity 200ms, transform 200ms',
      }}>
        <span style={{ fontSize: 56, fontWeight: 300, color: 'var(--accent)', lineHeight: 1 }}>+</span>
        {join && <span className="dt-pulse" />}
      </div>

      <Reveal on={join} x={LX} y={630} delay={1100}>
        <div style={{ width: 1620, display: 'flex', flexDirection: 'column', gap: 22, fontSize: 32, lineHeight: 1.25 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <span className="mono" style={{ color: 'var(--accent)', flex: 'none', width: 400, fontSize: 30 }}>OTel / OpenLLMetry</span>
            <span>emite la telemetría GenAI: modelos, tokens, latencias, coste.</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span className="mono" style={{ color: 'var(--accent)', flex: 'none', width: 400, fontSize: 30 }}>OneAgent</span>
            <span>aporta el contexto full-stack —infraestructura, procesos, logs, código, vulnerabilidades— y correlaciona los traces OTel con servicios, problemas y Dynatrace Intelligence.</span>
          </div>
        </div>
      </Reveal>
      <Reveal on={join} x={LX} y={900} delay={1400}>
        <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em' }}>
          No compiten: <A>juntos dan tracing extremo a extremo</A> entre servicios.
        </div>
      </Reveal>
    </>
  );
}
