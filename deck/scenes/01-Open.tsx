import { Reveal, Scene, useScene } from 'beatdeck';
import { config } from '../deck.config';

function Open_() {
  const { here, b } = useScene();
  const title = here && b === 1;
  return (
    <>
      {/* 01.1 standby: nothing but a quiet mark */}
      <div style={{ position: 'absolute', left: 952, top: 532, width: 16, height: 16, background: 'var(--accent)', opacity: here && b === 0 ? 1 : 0, transition: 'opacity 400ms' }} />

      {/* 01.2 title */}
      <Reveal on={title} x={168} y={300}>
        <div className="t-eyebrow">// {config.subtitle}</div>
      </Reveal>
      <Reveal on={title} x={150} y={380} delay={120} ms={1100}>
        <div className="t-statement" style={{ fontSize: 210 }}>AI Observability<span style={{ color: 'var(--accent)' }}>.</span></div>
      </Reveal>
      <Reveal on={title} x={156} y={600} delay={260} ms={1100}>
        <div className="t-statement" style={{ fontSize: 96, color: 'var(--ink-2)' }}>LLMs, agentes y GenAI en producción</div>
      </Reveal>
      <Reveal on={title} x={168} y={880} delay={400}>
        <div className="t-meta" style={{ fontSize: 22 }}>{config.author}</div>
      </Reveal>
    </>
  );
}

/** 01 APERTURA — standby, then the title. */
export const Open = () => <Scene index={0}><Open_ /></Scene>;
