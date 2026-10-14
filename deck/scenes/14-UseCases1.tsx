import { Arrow, CountUp, NodeBox, Reveal, Scene, useScene, type Rect } from 'beatdeck';
import { AB_DQL, AB_FLAG, AB_RESOURCE, RAG_DQL } from '../terminal';
import { A, Bullets, C, Code, Grid, Head, L, Meta, Text, TOP } from '../ui';

const CASES = [
  { k: '14', t: 'Versionado de modelos y A/B testing' },
  { k: '14', t: 'Gobernanza de datos con Amazon Bedrock' },
  { k: '14', t: 'Observabilidad de pipelines RAG' },
  { k: '15', t: 'Extremo a extremo en Kubernetes' },
  { k: '15', t: 'OpenAI Observability' },
  { k: '15', t: 'Conversation ID y sesiones con RUM' },
];

// RAG pipeline (travel-advisor)
const USER: Rect = { x: 150, y: 470, w: 240, h: 110 };
const API: Rect = { x: 520, y: 470, w: 380, h: 110 };
const EMB: Rect = { x: 1040, y: 330, w: 330, h: 110 };
const PC: Rect = { x: 1440, y: 330, w: 330, h: 110 };
const LLM: Rect = { x: 1040, y: 620, w: 730, h: 110 };

function UseCases1_() {
  const { here, b, entry } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 14 · sample-use-cases" title="Casos de uso I" />

      {/* 14.1 the six */}
      <Grid on={is(0)} out={past(0)} items={CASES} cols={3} h={220} tSize={38} hot={(i) => i < 3} />

      {/* 14.2 A/B testing */}
      <Text on={is(1)} out={past(1)} y={TOP} size={40} w={1560}>
        Mide el impacto de cambiar dataset, vector DB, algoritmo o configuración sobre <A>métricas de negocio</A>: precisión, engagement, ingresos.
      </Text>
      <Bullets show={() => is(1)} out={past(1)} y={TOP + 170} size={32} gap={16} items={[
        'Dashboard listo: elige proveedores y modelos y compáralos.',
        'Tiempo de respuesta, nº de peticiones, tokens, coste y temperature.',
        'Cómo respondió cada modelo al mismo prompt: clave para detectar regresiones.',
        'Pasos: explorar el dashboard → enviar metadatos propios → adaptar el dashboard.',
      ]} />

      {/* 14.3 custom metadata */}
      <Code on={is(2)} out={past(2)} y={TOP} lines={AB_RESOURCE} size={26} label="Traceloop.init · resource attributes (estáticos, en todas las señales)" />
      <Code on={is(2)} out={past(2)} y={TOP + 300} lines={AB_FLAG} size={22} delay={250} label="span por petición · p. ej. el valor de un feature flag" />

      {/* 14.4 DQL variable */}
      <Code on={is(3)} out={past(3)} y={TOP} lines={AB_DQL} size={28} label="Duplicate › variable ModelVersion (DQL) › filtro en los tiles" />
      <Text on={is(3)} out={past(3)} y={TOP + 380} size={30} dim delay={300} w={1560}>
        <C>gen_ai.system</C> está en todos los spans de IA; <C>model.version</C> es el atributo que añadimos. <C>expand</C> convierte cada valor en una opción del desplegable.
      </Text>

      {/* 14.5 data governance */}
      <Text on={is(4)} out={past(4)} y={TOP} size={36} w={1560}>
        Regulaciones como la <A>EU AI Act</A> exigen conservar registros. Con Amazon Bedrock, Dynatrace ayuda con el record-keeping.
      </Text>
      <Reveal on={is(4)} out={past(4)} x={L} y={TOP + 130} delay={150}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 60 }}>
          <div>
            <div className="t-meta" style={{ fontSize: 20 }}>retención por defecto de BizEvents</div>
            <div className="t-numeral" style={{ fontSize: 150, color: 'var(--ink-2)' }}>35 <span style={{ fontSize: 40 }}>días</span></div>
          </div>
          <div style={{ fontSize: 80, color: 'var(--accent)', paddingBottom: 20 }}>→</div>
          <div>
            <div className="t-meta" style={{ fontSize: 20 }}>bucket Grail gen_ai_events</div>
            <div className="t-numeral" style={{ fontSize: 150, color: 'var(--accent)' }}>
              <CountUp value={1825} from={is(4) ? 35 : undefined} entry={entry} ms={1400} locale="es-ES" /> <span style={{ fontSize: 40 }}>días ≈ 5 años</span>
            </div>
          </div>
        </div>
      </Reveal>
      <Bullets show={() => is(4)} out={past(4)} y={TOP + 380} size={28} gap={12} stagger={120} items={[
        <>OpenPipeline › Business events: pipeline con bucket assignment + dynamic route <C>matchesValue(event.type,"gen_ai.auditing")</C></>,
        <>Amazon EventBridge reenvía los eventos de configuración de Bedrock (despliegues, fine-tuning) con type <C>gen_ai.auditing</C></>,
        'La app se instrumenta con el fork de OpenLLMetry de Dynatrace (alpha) para las interacciones usuario ↔ IA',
      ]} />

      {/* 14.6 RAG pipeline */}
      <NodeBox rect={USER} on={is(5)} kind="usuario" value="pregunta" />
      <Arrow from={USER} to={API} on={is(5)} delay={100} />
      <NodeBox rect={API} on={is(5)} kind="fastapi · langchain" value="travel-advisor" tone="hot" delay={100} />
      <Arrow from={API} to={EMB} on={is(5)} label="1 · embedding" labelAnchor="end" lx={-10} delay={250} />
      <NodeBox rect={EMB} on={is(5)} kind="ollama" value="orca-mini:3b" delay={250} />
      <Arrow from={EMB} to={PC} on={is(5)} label="2" delay={400} />
      <NodeBox rect={PC} on={is(5)} kind="pinecone · 3200 dims" value="travel-advisor" delay={400} />
      <Arrow from={API} to={LLM} on={is(5)} label="3 · generar con contexto" labelAnchor="end" lx={-10} ly={30} delay={550} />
      <NodeBox rect={LLM} on={is(5)} kind="ollama · llm" value="respuesta de viaje en 3–4 frases" delay={550} />
      <Text on={is(5)} out={past(5)} y={800} size={30} dim delay={700} w={1560}>
        Un RAG «simple» ya esconde mucha comunicación con servicios externos. Con <C>Traceloop.init</C>, cada paso del pipeline LangChain es un span:
        cuellos de botella, mejoras o servicios inalcanzables.
      </Text>

      {/* 14.7 RAG with DQL */}
      <Code on={is(6)} y={TOP} lines={RAG_DQL} size={28} label="DQL · modelos usados" />
      <Bullets show={() => is(6)} y={TOP + 290} size={30} gap={18} stagger={120} items={[
        'Tokens de entrada y salida y latencia en dashboards.',
        'SLO de consumo de tokens frente a una baseline.',
        'Tiempo de respuesta por tipo de invocación LLM.',
        'Prompt de entrada frente a respuesta generada.',
      ]} />
      <Meta on={is(6)} y={TOP + 620} size={20} delay={500}>Pruébalo: demo GenAI en GitHub Codespaces · Dynatrace Observability Lab</Meta>
    </>
  );
}

/** 14 CASOS DE USO I — A/B testing, data governance, RAG. */
export const UseCases1 = () => <Scene index={13}><UseCases1_ /></Scene>;
