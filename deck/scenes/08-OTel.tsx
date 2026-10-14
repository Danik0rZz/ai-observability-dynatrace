import { CountUp, Reveal, Scene, useScene } from 'beatdeck';
import { OTEL_SPAN, TRACELOOP_DECORATORS, TRACELOOP_INIT } from '../terminal';
import { A, Big, C, Chips, Code, Head, L, Meta, Table, Text, TOP } from '../ui';

const ATTRS: [string, string][] = [
  ['gen_ai.provider.name', 'Proveedor GenAI (OpenAI, Anthropic…)'],
  ['gen_ai.input.messages', 'Mensajes de entrada enviados al modelo'],
  ['gen_ai.output.messages', 'Mensajes de salida recibidos'],
  ['gen_ai.system_instructions', 'Instrucciones de sistema'],
  ['gen_ai.request.model', 'Modelo al que se hace la petición'],
  ['gen_ai.response.model', 'Modelo que generó la respuesta'],
  ['gen_ai.usage.input_tokens', 'Tokens del prompt'],
  ['gen_ai.usage.output_tokens', 'Tokens de la respuesta'],
  ['gen_ai.agent.name', 'Agente implicado en la operación'],
  ['traceloop.span.kind', 'Tipo de operación (task o tool = tool)'],
  ['gen_ai.prompt.prompt_filter_results', 'Filtros aplicados al prompt'],
  ['gen_ai.completion.content_filter_results', 'Filtros aplicados a la respuesta'],
];

function OTel_() {
  const { here, b, entry } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 08 · get-started/opentelemetry · openllmetry" title="OpenTelemetry · OpenLLMetry" />

      {/* 08.1 vendor-neutral */}
      <Big on={is(0)} out={past(0)} y={TOP + 40} size={128}>Vendor-neutral.<br />Directo por <A>OTLP</A>.</Big>
      <Text on={is(0)} out={past(0)} y={640} size={36} dim delay={300} w={1560}>
        Las GenAI semantic conventions definen cómo capturar modelos, tokens, latencia y coste de forma consistente
        entre proveedores. Cualquier librería compatible con OpenTelemetry, o instrumentación propia.
      </Text>
      <Meta on={is(0)} out={past(0)} y={860} size={20} delay={450}>DPS: Traces + Metrics powered by Grail, Log Analytics · scopes openpipeline:traces/metrics/logs:ingest</Meta>

      {/* 08.2 the span, literally */}
      <Code on={is(1)} out={past(1)} y={TOP} lines={OTEL_SPAN} size={24} label="python · añadir atributos GenAI al span" />

      {/* 08.3 attributes */}
      <Table on={is(2)} out={past(2)} y={TOP - 10} w={1620} kw={780} size={27} head={['atributo de span', 'descripción']} rows={ATTRS} />

      {/* 08.4 OpenLLMetry */}
      <Text on={is(3)} out={past(3)} y={TOP + 20} size={44} w={1560}>
        SDK open source de <A>Traceloop</A> sobre OpenTelemetry. La auto-instrumentación OTel da spans y atributos básicos,
        pero no los KPIs de IA: modelo, versión, tokens de prompt y completion, temperature.
      </Text>
      <Meta on={is(3)} out={past(3)} y={TOP + 270} delay={250}>Frameworks</Meta>
      <Chips on={is(3)} out={past(3)} y={TOP + 320} items={['OpenAI', 'HuggingFace', 'Pinecone', 'LangChain']} size={34} />
      <Text on={is(3)} out={past(3)} y={TOP + 480} size={32} dim delay={400} w={1560}>
        Python o Node.js (OpenLLMetry para Node.js aún no soporta métricas). Exporta a Dynatrace, a un Collector o a un ActiveGate.
      </Text>

      {/* 08.5 Traceloop.init + decorators */}
      <Code on={is(4)} out={past(4)} y={TOP} lines={TRACELOOP_INIT} size={22} label="python · inicializar" />
      <Code on={is(4)} out={past(4)} y={TOP + 380} lines={TRACELOOP_DECORATORS} size={26} delay={250} label="anotaciones · @workflow @task @agent @tool" />

      {/* 08.6 what the span shows */}
      <Text on={is(5)} y={TOP + 10} size={40} w={1560}>
        Workflow <C>ask_question</C> en Distributed Tracing. El span de OpenLLMetry muestra:
      </Text>
      <Reveal on={is(5)} x={L} y={TOP + 140} delay={150}>
        <div style={{ display: 'flex', gap: 120 }}>
          <div>
            <div className="t-meta" style={{ fontSize: 20 }}>modelo</div>
            <div className="mono keep-case" style={{ fontSize: 64, fontWeight: 600, marginTop: 14 }}>gpt-4o-mini</div>
          </div>
          <div>
            <div className="t-meta" style={{ fontSize: 20 }}>temperature</div>
            <div className="t-numeral" style={{ fontSize: 120, marginTop: 14 }}>0.7</div>
          </div>
          <div>
            <div className="t-meta" style={{ fontSize: 20 }}>completion tokens</div>
            <div className="t-numeral" style={{ fontSize: 120, marginTop: 14, color: 'var(--accent)' }}>
              <CountUp value={54} from={is(5) ? 0 : undefined} entry={entry} ms={900} />
            </div>
          </div>
        </div>
      </Reveal>
      <Text on={is(5)} y={TOP + 440} size={30} dim delay={350} w={1500}>
        Ejemplo de la guía: un LLM de OpenAI sobre LangChain que resume el negocio de una empresa. Cada tarea de LangChain con su latencia y fiabilidad.
      </Text>
    </>
  );
}

/** 08 OPENTELEMETRY · OPENLLMETRY — direct OTel and Traceloop. */
export const OTel = () => <Scene index={7}><OTel_ /></Scene>;
