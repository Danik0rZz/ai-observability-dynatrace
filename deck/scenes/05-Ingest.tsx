import { Arrow, NodeBox, Reveal, Scene, useScene, type Rect } from 'beatdeck';
import { A, Head } from '../ui';
import { Choose } from './05-Choose';

const APP: Rect = { x: 150, y: 560, w: 300, h: 120 };
const PATHS: { r: Rect; k: string; v: string }[] = [
  { r: { x: 610, y: 310, w: 560, h: 110 }, k: 'zero-code · full-stack', v: 'OneAgent' },
  { r: { x: 610, y: 445, w: 560, h: 110 }, k: 'OTel · instrumentor recomendado', v: 'OpenInference' },
  { r: { x: 610, y: 580, w: 560, h: 110 }, k: 'instrumentación directa', v: 'OpenTelemetry SDK' },
  { r: { x: 610, y: 715, w: 560, h: 110 }, k: 'auto-instrumentación OSS', v: 'OpenLLMetry' },
  { r: { x: 610, y: 850, w: 560, h: 110 }, k: 'pull de proveedores', v: 'Cloud monitoring' },
];
const DT: Rect = { x: 1340, y: 400, w: 430, h: 130 };
const AIO: Rect = { x: 1340, y: 640, w: 430, h: 130 };
const EVAL: Rect = { x: 1340, y: 860, w: 430, h: 100 };

function Ingest_() {
  const { here, b } = useScene();
  // the diagram builds over 05.1–05.7, then gives the stage to the comparison (05.8–05.9)
  const at = (k: number) => here && b >= k && b <= 6;
  // path i appears on beat i+1; the last two share beat 4
  const pathOn = (i: number) => at(Math.min(i + 1, 4));
  return (
    <>
      <Head on={here} eyebrow="// 05 · get started" title="Enviar datos a Dynatrace" />

      <NodeBox rect={APP} on={at(0)} kind="tu aplicación" value="App de IA" tone={b === 0 ? 'hot' : 'normal'} />
      {PATHS.map((p, i) => (
        <Arrow key={`a${i}`} from={{ x: APP.x + APP.w, y: APP.y + APP.h / 2 }} to={{ x: p.r.x, y: p.r.y + p.r.h / 2 }} on={pathOn(i)} gap={10} />
      ))}
      {PATHS.map((p, i) => (
        <NodeBox key={p.v} rect={p.r} on={pathOn(i)} kind={p.k} value={p.v} delay={i === 4 ? 150 : 0}
          tone={b === Math.min(i + 1, 4) ? 'hot' : 'normal'} />
      ))}

      {/* 05.6 everything converges on gen_ai.* */}
      {PATHS.map((p, i) => (
        <Arrow key={`d${i}`} from={{ x: p.r.x + p.r.w, y: p.r.y + p.r.h / 2 }} to={{ x: DT.x, y: DT.y + DT.h / 2 }} on={at(5)} delay={i * 60} gap={10} />
      ))}
      <NodeBox rect={DT} on={at(5)} kind="dynatrace · grail" tone={b === 5 ? 'hot' : 'normal'}
        value={<span>atributos <span style={{ color: 'var(--accent)' }}>gen_ai.*</span></span>} />
      <Arrow from={DT} to={AIO} on={at(5)} delay={300} />
      <NodeBox rect={AIO} on={at(5)} kind="app" value="AI Observability" delay={300} />

      {/* 05.7 evaluate the traffic you already ingest */}
      <Arrow from={EVAL} to={AIO} on={at(6)} label="scores → bizevents" lx={-16} labelAnchor="end" />
      <NodeBox rect={EVAL} on={at(6)} kind="llm-as-a-judge" value="dt-evals" tone="hot" />

      <Choose here={here} b={b} />

      <Reveal on={here && b === 0} x={150} y={330}>
        <div style={{ fontSize: 34, width: 400, lineHeight: 1.25, color: 'var(--ink-2)' }}>
          Instrumenta, <A>envía</A> y <A>evalúa</A> el tráfico GenAI.
        </div>
      </Reveal>
    </>
  );
}

/** 05 INGESTA — the ways in, converging on gen_ai.* attributes. */
export const Ingest = () => <Scene index={4}><Ingest_ /></Scene>;
