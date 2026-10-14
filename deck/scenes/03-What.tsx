import { Reveal, Scene, useScene } from 'beatdeck';
import { A, Big, Chips, Grid, Head, L, Meta, Text, TOP, W } from '../ui';

const METRICS = [
  { k: 'stability', t: 'Estabilidad', d: 'Frecuencia de respuestas correctas del modelo frente a fallos.' },
  { k: 'latency', t: 'Latencia', d: 'Tiempo que tardan modelos o servicios en devolver resultados.' },
  { k: 'load', t: 'Carga', d: 'Volumen de peticiones; detecta picos o caídas anómalas.' },
  { k: 'model drift', t: 'Model drift', d: 'Cambios en la precisión del modelo por datos de entrada que cambian.' },
  { k: 'data drift', t: 'Data drift', d: 'Estacionariedad de los datos de entrada para anticipar el model drift.' },
  { k: 'cost', t: 'Coste', d: 'Uso de tokens, tarifas del servicio o consumo total de recursos.' },
];

const CAPS = [
  { t: 'Monitorización', d: 'Recogida y análisis continuo de métricas, eventos y logs del modelo.' },
  { t: 'Logging', d: 'Eventos y errores para debugging y análisis post-mortem.' },
  { t: 'Métricas y rendimiento', d: 'Dashboards y notebooks con tendencias de rendimiento.' },
  { t: 'Visualización', d: 'Dashboards de dominio para ver patrones y problemas rápido.' },
  { t: 'Detección de anomalías', d: 'Alertas automáticas ante desviaciones del patrón normal.' },
  { t: 'Explicabilidad', d: 'Técnicas para iluminar cómo decide el modelo.' },
];

const USES = [
  { k: '01', t: 'Salud y rendimiento', d: 'Peticiones, duraciones y tasas de error en tiempo real. Alineado con SLOs.' },
  { k: '02', t: 'Calidad y coste', d: 'Error budgets de rendimiento y coste; consumo y tiempos de respuesta.' },
  { k: '03', t: 'Calidad de respuesta', d: 'Evaluaciones LLM-as-a-judge online; regresiones y score drift.' },
  { k: '04', t: 'Tracing extremo a extremo', d: 'Del request inicial a la respuesta final: prompts, tokens, integraciones.' },
  { k: '05', t: 'Confianza y cumplimiento', d: 'Audit trail de cada input y output; data lineage completo.' },
];

const STACK: [string, string][] = [
  ['Agentes', 'OpenAI Agent SDK · LangChain/LangGraph · CrewAI · Amazon Bedrock AgentCore · MCP tools · Google ADK'],
  ['Proveedores de modelos', 'OpenAI · Amazon Bedrock · NVIDIA NIM · Ollama — tokens, latencia, disponibilidad, errores'],
  ['Vector DBs y caches semánticas', 'Milvus · Weaviate · Qdrant — cuellos de botella y anomalías de uso'],
  ['Orquestación', 'LangChain — rendimiento, versiones y puntos de degradación del pipeline RAG'],
  ['Infraestructura', 'GPU/TPU: temperatura, memoria… Amazon Elastic Inference · Google TPU · NVIDIA GPU'],
];

function What_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 03 · overview" title="Qué es AI Observability" />

      {/* 03.1 definition */}
      <Text on={is(0)} out={past(0)} y={TOP + 40} size={58} w={1560}>
        Recoger, analizar y <A>correlacionar telemetría</A> de todo el stack para entender cómo se comportan
        los sistemas de IA, los agentes y los LLM — en todos los entornos, <A>también en producción</A>.
      </Text>
      <Meta on={is(0)} out={past(0)} y={720} delay={300}>Para developers · SREs · equipos de plataforma</Meta>
      <Text on={is(0)} out={past(0)} y={790} size={32} dim delay={400} w={1500}>
        Objetivo: servicios con IA fiables, con buen rendimiento, eficientes en coste y que cumplen estándares de calidad.
      </Text>

      {/* 03.2 opaque execution */}
      <Big on={is(1)} out={past(1)} y={TOP + 40} size={104}>La ejecución del modelo<br />ocurre <A>fuera</A> y es <A>opaca</A>.</Big>
      <Chips on={is(1)} out={past(1)} y={620} items={['OpenAI', 'Anthropic', 'Gemini (Google Cloud)', 'Amazon Bedrock', 'Azure AI Foundry', 'Vertex AI']} />
      <Text on={is(1)} out={past(1)} y={760} size={38} dim delay={300}>…pero afecta directamente a flujos de negocio críticos.</Text>

      {/* 03.3 key metrics */}
      <Meta on={is(2)} out={past(2)} y={TOP} >Métricas clave</Meta>
      <Grid on={is(2)} out={past(2)} items={METRICS} cols={3} h={270} />
      <Meta on={is(2)} out={past(2)} y={960} size={19} delay={500}>Observar modelos es una tarea de dominio: los dueños del modelo deben exponer logs, métricas y datos</Meta>

      {/* 03.4 platform capabilities */}
      <Meta on={is(3)} out={past(3)} y={TOP}>Capacidades de la plataforma</Meta>
      <Grid on={is(3)} out={past(3)} items={CAPS} cols={3} h={250} />
      <Meta on={is(3)} out={past(3)} y={960} size={19} delay={500}>Métricas, logs, traces, problemas y causa raíz unificados en dashboards y notebooks</Meta>

      {/* 03.5 key use cases */}
      <Meta on={is(4)} out={past(4)} y={TOP}>Casos de uso clave</Meta>
      <Grid on={is(4)} out={past(4)} items={USES} cols={5} h={340} tSize={32} dSize={24} gap={22} />

      {/* 03.6 the whole stack */}
      <Meta on={is(5)} out={past(5)} y={TOP}>Visibilidad en cada capa</Meta>
      {STACK.map(([k, v], i) => (
        <Reveal key={k} on={is(5)} out={past(5)} x={L} y={TOP + 56 + i * 124} delay={120 + i * 110}>
          <div style={{ width: W, height: 104, boxSizing: 'border-box', borderLeft: '4px solid var(--accent)', borderBottom: '1px solid var(--hair)', paddingLeft: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
            <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>{k}</div>
            <div style={{ fontSize: 24, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>{v}</div>
          </div>
        </Reveal>
      ))}

      {/* 03.7 Dynatrace observes its own AI */}
      <Big on={is(6)} y={TOP + 60} size={112}>Dynatrace se observa<br />a sí mismo<A>.</A></Big>
      <Text on={is(6)} y={640} size={40} dim delay={300} w={1500}>
        Los data scientists de Dynatrace usan la misma solución —dashboards de self-monitoring— para observar
        la operación de Dynatrace Intelligence en todos los entornos.
      </Text>
    </>
  );
}

/** 03 QUÉ ES — the overview page. */
export const What = () => <Scene index={2}><What_ /></Scene>;
