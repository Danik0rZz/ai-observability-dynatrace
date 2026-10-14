import { Reveal, Scene, useScene } from 'beatdeck';
import { Head, L } from '../ui';

/** The documentation tree, in the order of the talk (scene number → docs section). */
const MAP: [string, string, string][] = [
  ['03', 'Qué es AI Observability', 'overview'],
  ['04', 'Términos y conceptos', 'terms-and-concepts'],
  ['05', 'Enviar datos: los caminos de ingesta', 'get-started'],
  ['06', 'OneAgent', 'get-started/oneagent'],
  ['07', 'OpenInference', 'get-started/openinference'],
  ['08', 'OpenTelemetry · OpenLLMetry', 'get-started/opentelemetry · openllmetry'],
  ['09', 'Microsoft Agent Framework', 'integrations/microsoft-agent-framework'],
  ['10', 'La app AI Observability', 'ai-observability-app'],
  ['11', 'Evaluaciones LLM-as-a-judge', 'agent-evaluations · llm-judge-evaluation'],
  ['12', 'Integraciones', 'integrations'],
  ['13', 'Referencia de métricas', 'metrics-reference'],
  ['14', 'Casos de uso I', 'A/B testing · gobernanza · RAG'],
  ['15', 'Casos de uso II', 'Kubernetes · OpenAI · conversación + RUM'],
  ['16', 'Preguntas frecuentes', 'frequently-asked-questions'],
];

function Map_() {
  const { here } = useScene();
  const half = Math.ceil(MAP.length / 2);
  return (
    <>
      <Head on={here} eyebrow="// la documentación, sección a sección" title="El mapa" />
      {MAP.map(([n, t, p], i) => {
        const col = i < half ? 0 : 1;
        const row = i < half ? i : i - half;
        return (
          <Reveal key={n} on={here} x={L + col * 830} y={318 + row * 94} delay={140 + i * 50}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, width: 790 }}>
              <span className="mono" style={{ fontSize: 26, color: 'var(--accent)', flex: 'none' }}>{n}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{t}</span>
                <span className="mono keep-case" style={{ fontSize: 19, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{p}</span>
              </span>
            </div>
          </Reveal>
        );
      })}
    </>
  );
}

/** 02 MAPA — the documentation tree this talk walks through. */
export const DocMap = () => <Scene index={1}><Map_ /></Scene>;
