import { Scene, useScene } from 'beatdeck';
import { A, Big, C, Grid, Head, Meta, Table, Text, TOP } from '../ui';

const SOURCES = [
  { k: '1', t: 'Métricas OTel nativas', d: 'Tu instrumentación emite gen_ai.client.*, gen_ai.server.*, gen_ai.workflow.*… Dynatrace las ingiere tal cual.' },
  { k: '2', t: 'Derivadas de spans', d: 'Dynatrace calcula tiles, filtros y desgloses directamente de los atributos gen_ai.* del span.' },
  { k: '3', t: 'Nativas del proveedor', d: 'Amazon Bedrock, Azure OpenAI, NVIDIA NIM, Kong AI Gateway: atributos o métricas propias.' },
  { k: '4', t: 'Otras fuentes', d: 'Métricas que derivas tú (p. ej. parseando logs del servidor de inferencia) y reenvías.' },
];

const VENDORS = [
  { k: 'amazon bedrock', t: 'Guardrails y caching', d: 'gen_ai.bedrock.guardrail.* · gen_ai.guardrail.grounding_type · métrica gen_ai.prompt.caching' },
  { k: 'azure openai', t: 'Content filters', d: 'gen_ai.prompt.prompt_filter_results · gen_ai.completion.content_filter_results' },
  { k: 'nvidia nim · vllm', t: 'Métricas Prometheus', d: 'Tokens, e2e latency, time to first token, GPU cache… en el dashboard NVIDIA.' },
  { k: 'kong ai gateway', t: 'Tráfico LLM', d: 'kong_ai_llm_requests_total · kong_ai_llm_tokens_total · latencia de proveedor y gateway.' },
  { k: 'gemini · vertex ai', t: 'safetyRatings', d: 'Aún no visualizados: reenvíalos y consúltalos con DQL.' },
  { k: 'openai', t: 'Atributos semconv', d: 'openai.api.type, service_tier, system_fingerprint: ingeridos, sin tile hoy.' },
];

function Metrics_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 13 · metrics-reference" title="Referencia de métricas" />

      {/* 13.1 four sources */}
      <Grid on={is(0)} out={past(0)} items={SOURCES} cols={4} h={430} tSize={34} dSize={25} />
      <Meta on={is(0)} out={past(0)} y={TOP + 520} size={20} delay={500}>Saber la fuente ayuda cuando una métrica falta o sale vacía · todo es consultable con DQL</Meta>

      {/* 13.2 client metrics */}
      <Table on={is(1)} out={past(1)} y={TOP} kw={760} size={28} head={['GenAI client metrics (histogramas)', 'visualización']} rows={[
        ['gen_ai.client.token.usage', <>Tiles de <A>coste</A>, separados por tipo de token</>],
        ['gen_ai.client.operation.duration', <>Gráficas de <A>latencia</A> (p99, media)</>],
        ['gen_ai.client.operation.time_to_first_chunk', 'No disponible (solo streaming)'],
        ['gen_ai.client.operation.time_per_output_chunk', 'No disponible (solo streaming)'],
      ]} />
      <Text on={is(1)} out={past(1)} y={TOP + 400} size={30} dim delay={300} w={1560}>
        Son instrumentos de métrica, no atributos de span: hay que configurar la instrumentación para emitirlos
        (p. ej. <C>should_enrich_metrics=True</C> de Traceloop o un MeterProvider propio).
      </Text>
      <Text on={is(1)} out={past(1)} y={TOP + 540} size={28} dim delay={400} w={1560}>
        <C>gen_ai.request.model</C> y <C>gen_ai.response.model</C> son Required aquí — más estricto que la semconv de OTel — porque alimentan filtros y gráficas.
      </Text>

      {/* 13.3 the silent zero */}
      <Big on={is(2)} out={past(2)} y={TOP + 20} size={300}><A>$0</A></Big>
      <Text on={is(2)} out={past(2)} x={820} y={TOP + 40} w={950} size={44} weight={600} delay={200}>
        Si falta <C>gen_ai.client.token.usage</C>, todos los tiles de coste muestran $0 sin error visible.
      </Text>
      <Text on={is(2)} out={past(2)} x={820} y={TOP + 280} w={950} size={30} dim delay={350}>
        Sin <C>gen_ai.token.type</C>: un total de coste sin separar input y output. Sin <C>gen_ai.client.operation.duration</C>: tiles de latencia vacíos, sin error.
      </Text>

      {/* 13.4 server, workflow, agent, tool */}
      <Table on={is(3)} out={past(3)} y={TOP} kw={720} size={27} head={['métricas OTel', 'qué miden']} rows={[
        ['gen_ai.server.request.duration', 'Duración de la petición en el servidor de modelos'],
        ['gen_ai.server.time_to_first_token', 'Tiempo hasta el primer token (streaming)'],
        ['gen_ai.server.time_per_output_token', 'Tiempo por token tras el primero'],
        ['gen_ai.workflow.duration', 'Ejecución completa de un workflow'],
        ['gen_ai.invoke_agent.duration', 'Una invocación de agente en proceso'],
        ['gen_ai.execute_tool.duration', 'Una ejecución de tool'],
      ]} />
      <Text on={is(3)} out={past(3)} y={TOP + 560} size={30} dim delay={300} w={1560}>
        Sin visualización hoy, pero ingeribles y consultables con DQL. Las de servidor, para modelos self-hosted o detrás de gateway.
      </Text>

      {/* 13.5 core span attributes */}
      <Table on={is(4)} out={past(4)} y={TOP} kw={760} size={27} head={['atributo de span · requirement', 'en la app']} rows={[
        ['gen_ai.provider.name · Required', 'Filtro de proveedor, tabla del service explorer'],
        ['gen_ai.operation.name · Required', 'Desglose por operación, análisis de traces'],
        ['gen_ai.request.model · Required', 'Tabla de prompts, Distributed Tracing'],
        ['gen_ai.response.model · Required', 'Filtro de modelo, gráficas del overview'],
        ['gen_ai.usage.*_tokens · Required', 'Tabla de prompts; fallback del tile de coste'],
        ['gen_ai.input/output.messages · Required', 'Contenido de la tabla de prompts'],
        ['gen_ai.agent.name · Cond.', 'Distinción agente / LLM, filtro de agente'],
        ['gen_ai.conversation.id · Cond.', 'Agrupa spans en conversaciones'],
      ]} />

      {/* 13.6 vendor-native */}
      <Grid on={is(5)} out={past(5)} items={VENDORS} cols={3} y={TOP} h={300} tSize={32} dSize={23} />

      {/* 13.7 ready-made dashboards + other sources */}
      <Text on={is(6)} y={TOP} size={40} weight={600} w={1560}>Dashboards listos adicionales</Text>
      <Table on={is(6)} y={TOP + 80} kw={560} size={28} delay={150} rows={[
        ['Model versioning & A/B testing', 'Dos combinaciones proveedor/modelo lado a lado, solo desde atributos gen_ai.* de span'],
        ['Audit trail', <>Lee bizevents <C>event.type == "gen_ai.auditing"</C> para gobernanza y cumplimiento</>],
      ]} />
      <Text on={is(6)} y={TOP + 380} size={40} weight={600} w={1560} delay={300}>Fuentes que no emiten gen_ai.*</Text>
      <Text on={is(6)} y={TOP + 460} size={30} dim w={1560} delay={400}>
        OpenInference → normalizar con Collector u OpenPipeline. Métricas derivadas de logs (p. ej. logs de Ollama) → API de ingesta de métricas,
        con nombres y dimensiones consistentes para verlas junto a las vistas estándar.
      </Text>
    </>
  );
}

/** 13 MÉTRICAS — the metrics reference. */
export const Metrics = () => <Scene index={12}><Metrics_ /></Scene>;
