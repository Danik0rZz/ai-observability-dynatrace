import { Arrow, NodeBox, Reveal, Scene, useScene, type Rect } from 'beatdeck';
import { OI_SEMCONV } from '../terminal';
import { A, C, Chips, Code, Grid, Head, L, Meta, Table, Text, TOP } from '../ui';

const WAYS = [
  { k: 'opción 1 · nativo', t: 'Emitir gen_ai.* directamente', d: 'Si el instrumentor lo soporta (los ejemplos de OpenAI y Cohere). La cobertura varía por proveedor.' },
  { k: 'opción 2 · recomendada', t: 'OTel Collector + genainormalizer', d: 'Normaliza en local, antes de enviar a Dynatrace. Reconstruye el historial completo de mensajes.' },
  { k: 'opción 3', t: 'Dynatrace OpenPipeline', d: 'Normaliza en el servidor, dentro de tu tenant. Sin Collector que gestionar.' },
];

const COMPARE: [string, string, string][] = [
  ['Dónde se transforma', 'En el proceso del Collector, en local', 'En el servidor, en tu tenant'],
  ['¿Requiere Docker?', 'Sí', 'No'],
  ['¿Configurar Dynatrace?', 'No', 'Sí; despliegue único'],
  ['Historial de mensajes', 'Reconstruye gen_ai.input/output.messages', 'Fallback desde input.value / output.value'],
  ['Ideal para', 'Control total del pipeline e historial completo', 'Operación más simple; sin Collector'],
];

const APPN: Rect = { x: 150, y: 480, w: 340, h: 120 };
const COL: Rect = { x: 680, y: 440, w: 560, h: 200 };
const DTN: Rect = { x: 1430, y: 480, w: 340, h: 120 };

const MAP: [string, string][] = [
  ['LLM', 'chat (Collector) · llm (OpenPipeline)'],
  ['EMBEDDING', 'embeddings'],
  ['CHAIN · AGENT', 'invoke_agent'],
  ['RETRIEVER · RERANKER', 'retrieval'],
  ['TOOL', 'execute_tool'],
  ['PROMPT', 'text_completion'],
];

function OpenInference_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 07 · get-started/openinference" title="OpenInference" />

      {/* 07.1 the standard and the gap */}
      <Text on={is(0)} out={past(0)} y={TOP + 20} size={44} w={1560}>
        Estándar abierto de observabilidad de IA desarrollado por <A>Arize AI</A>. El instrumentor <A>recomendado</A> si ingieres con OpenTelemetry.
      </Text>
      <Reveal on={is(0)} out={past(0)} x={L} y={TOP + 220} delay={200}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
          <div>
            <div className="t-meta" style={{ fontSize: 20, marginBottom: 16 }}>OpenInference emite</div>
            <div className="mono keep-case" style={{ fontSize: 40, lineHeight: 1.5 }}>llm.model_name<br />llm.token_count.*</div>
          </div>
          <div style={{ fontSize: 80, color: 'var(--accent)' }}>→</div>
          <div>
            <div className="t-meta" style={{ fontSize: 20, marginBottom: 16 }}>AI Observability necesita</div>
            <div className="mono keep-case" style={{ fontSize: 40, lineHeight: 1.5, color: 'var(--accent)' }}>gen_ai.request.model<br />gen_ai.usage.*_tokens</div>
          </div>
        </div>
      </Reveal>
      <Meta on={is(0)} out={past(0)} y={TOP + 520} delay={350}>Token: platform openpipeline:traces:ingest · o Classic openTelemetryTrace.ingest</Meta>

      {/* 07.2 three ways */}
      <Grid on={is(1)} out={past(1)} items={WAYS} cols={3} h={300} hot={(i) => i === 1} />
      <Code on={is(1)} out={past(1)} y={720} lines={OI_SEMCONV} size={30} delay={400} label="opción 1 · variable de entorno" />

      {/* 07.3 Collector vs OpenPipeline */}
      <Reveal on={is(2)} out={past(2)} x={L} y={TOP}>
        <div style={{ width: 1620, fontSize: 28 }}>
          <div style={{ display: 'flex', paddingBottom: 14, borderBottom: '2px solid var(--hair-strong)' }}>
            <div style={{ width: 420 }} />
            <div style={{ width: 600, fontSize: 32, fontWeight: 600 }}>OTel Collector + <A>genainormalizer</A></div>
            <div style={{ fontSize: 32, fontWeight: 600 }}>OpenPipeline</div>
          </div>
          {COMPARE.map(([k, a, z]) => (
            <div key={k} style={{ display: 'flex', padding: '20px 0', borderBottom: '1px solid var(--hair)' }}>
              <div className="t-meta" style={{ width: 420, fontSize: 20, flex: 'none' }}>{k}</div>
              <div style={{ width: 600, flex: 'none', paddingRight: 30 }}>{a}</div>
              <div>{z}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* 07.4 Collector */}
      <NodeBox rect={APPN} on={is(3)} kind="app" value="OTLP/HTTP" />
      <Arrow from={APPN} to={COL} on={is(3)} label="localhost:4318" lx={0} ly={-18} />
      <NodeBox rect={COL} on={is(3)} kind="otel collector" tone="hot" delay={150}
        value={<span style={{ fontSize: 24, lineHeight: 1.5, whiteSpace: 'normal' }}>genainormalizer<br />source: openinference<br />remove_originals: true</span>} />
      <Arrow from={COL} to={DTN} on={is(3)} label="/api/v2/otlp" delay={300} />
      <NodeBox rect={DTN} on={is(3)} kind="dynatrace" value="DT_ENDPOINT" delay={300} />
      <Text on={is(3)} out={past(3)} y={720} size={30} dim delay={400} w={1560}>
        La app no necesita credenciales de Dynatrace. <C>transform/response_model</C> copia <C>gen_ai.request.model</C> a <C>gen_ai.response.model</C>.
      </Text>
      <Meta on={is(3)} out={past(3)} y={860} size={20} delay={500}>Dynatrace Collector ≥ 0.53.1 · Bindplane Distro for OpenTelemetry (BDOT) ≥ 1.104.0</Meta>

      {/* 07.5 OpenPipeline */}
      <Text on={is(4)} out={past(4)} y={TOP + 20} size={44} w={1560}>
        Pipeline en el servidor: la app envía directamente al endpoint OTLP de Dynatrace. <A>Configuración única por entorno.</A>
      </Text>
      <Table on={is(4)} out={past(4)} y={TOP + 200} kw={520} size={32} delay={200} rows={[
        ['OpenPipeline › Spans', <>Add pipeline <C>openinference-ai-spans</C></>],
        ['Processors', <>Los de <C>openpipeline-openinference.yaml</C> del repo de ejemplos</>],
        ['Routing · matcher', <C>isNotNull(openinference.span.kind)</C>],
      ]} />
      <Text on={is(4)} out={past(4)} y={TOP + 520} size={28} dim delay={400} w={1560}>
        El routing solo evalúa atributos de span (no campos de scope OTLP). Todos los instrumentors de OpenInference ponen <C>openinference.span.kind</C>.
      </Text>

      {/* 07.6 mapping */}
      <Meta on={is(5)} out={past(5)} y={TOP}>openinference.span.kind → gen_ai.operation.name</Meta>
      <Table on={is(5)} out={past(5)} y={TOP + 50} w={760} kw={380} size={28} rows={MAP} />
      <Meta on={is(5)} out={past(5)} x={1000} y={TOP} delay={200}>Otros atributos</Meta>
      <Table on={is(5)} out={past(5)} x={1000} y={TOP + 50} w={770} kw={400} size={24} delay={200} rows={[
        ['llm.model_name', 'gen_ai.request.model'],
        ['llm.provider', 'gen_ai.provider.name'],
        ['llm.token_count.prompt', 'gen_ai.usage.input_tokens'],
        ['llm.token_count.completion', 'gen_ai.usage.output_tokens'],
        ['agent.name', 'gen_ai.agent.name'],
        ['tool.name', 'gen_ai.tool.name'],
        ['llm.input_messages.N.*', 'gen_ai.input.messages'],
      ]} />

      {/* 07.7 privacy + samples */}
      <Text on={is(6)} y={TOP + 10} size={40} w={1560}>
        Los instrumentors Python con <C>TraceConfig</C> capturan contenido <A>por defecto</A>. Revisa qué envías.
      </Text>
      <Chips on={is(6)} y={TOP + 110} size={26} items={['OPENINFERENCE_HIDE_INPUTS', 'OPENINFERENCE_HIDE_OUTPUTS', 'OPENINFERENCE_HIDE_INPUT_MESSAGES', 'OPENINFERENCE_HIDE_OUTPUT_MESSAGES']} />
      <Meta on={is(6)} y={TOP + 330} delay={300}>Samples con README propio</Meta>
      <Chips on={is(6)} y={TOP + 380} size={30} stagger={60} items={['OpenAI', 'Amazon Bedrock', 'LangGraph', 'Anthropic', 'Cohere', 'Groq', 'Mistral', 'Ollama', 'Haystack']} />
      <Text on={is(6)} y={TOP + 560} size={28} dim delay={500} w={1560}>
        Las transformaciones mapean lo que la instrumentación emite; no pueden reconstruir datos que el instrumentor no emitió o descartó.
      </Text>
    </>
  );
}

/** 07 OPENINFERENCE — the recommended OTel path and its normalization. */
export const OpenInference = () => <Scene index={6}><OpenInference_ /></Scene>;
