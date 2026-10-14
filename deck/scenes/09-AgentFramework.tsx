import { Reveal, Scene, useScene } from 'beatdeck';
import { MAF_ENV } from '../terminal';
import { A, Big, C, Code, Head, L, Meta, Table, Text, TOP } from '../ui';

function AgentFramework_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 09 · integrations/microsoft-agent-framework" title="Microsoft Agent Framework" />

      {/* 09.1 native OTel */}
      <Big on={is(0)} out={past(0)} y={TOP + 40} size={140}>OTel nativo.<br />Sin SDK <A>extra</A>.</Big>
      <Text on={is(0)} out={past(0)} y={680} size={36} dim delay={300} w={1500}>
        El framework emite traces y métricas con las GenAI semantic conventions, que AI Observability entiende de forma nativa.
        Ejemplo: un agente que llama a Azure OpenAI y exporta por OTLP HTTP.
      </Text>

      {/* 09.2 two nested spans */}
      <Meta on={is(1)} out={past(1)} y={TOP}>Agent.run() produce dos spans anidados</Meta>
      <Reveal on={is(1)} out={past(1)} x={L} y={TOP + 60} delay={100}>
        <div style={{ width: 1620, height: 220, border: '3px solid var(--accent)', padding: '24px 32px', boxSizing: 'border-box' }}>
          <div className="mono keep-case" style={{ fontSize: 44, fontWeight: 600, color: 'var(--accent)' }}>invoke_agent</div>
          <div style={{ fontSize: 28, marginTop: 10 }}>AgentTelemetryLayer · <C>gen_ai.agent.name</C> · <C>gen_ai.conversation.id</C></div>
        </div>
      </Reveal>
      <Reveal on={is(1)} out={past(1)} x={L + 120} y={TOP + 320} delay={300}>
        <div style={{ width: 1500, height: 220, border: '2px solid var(--ink-2)', padding: '24px 32px', boxSizing: 'border-box' }}>
          <div className="mono keep-case" style={{ fontSize: 44, fontWeight: 600 }}>chat</div>
          <div style={{ fontSize: 28, marginTop: 10 }}>ChatTelemetryLayer · tokens · nombre del modelo · contenido de prompt y completion</div>
        </div>
      </Reveal>

      {/* 09.3 signals */}
      <Table on={is(2)} out={past(2)} y={TOP} kw={620} size={30} head={['endpoint', 'atributos clave']} rows={[
        ['/api/v2/otlp/v1/traces', <>Traces: <C>gen_ai.agent.name</C>, <C>gen_ai.input.messages</C>, <C>gen_ai.output.messages</C>, tokens</>],
        ['/api/v2/otlp/v1/metrics', <>Métricas: <C>gen_ai.client.operation.duration</C>, <C>gen_ai.client.token.usage</C> — alimentan las vistas de latencia y coste</>],
      ]} />
      <Text on={is(2)} out={past(2)} y={TOP + 420} size={30} dim delay={300} w={1560}>
        Prompt y completion viajan como atributos de span con <C>enable_sensitive_data=True</C>; no hace falta endpoint de logs.
      </Text>

      {/* 09.4 delta */}
      <Code on={is(3)} out={past(3)} y={TOP} lines={MAF_ENV} size={19} label=".env" />
      <Big on={is(3)} out={past(3)} y={TOP + 280} size={120} delay={300}>Dynatrace exige <A>delta</A>.</Big>
      <Text on={is(3)} out={past(3)} y={TOP + 440} size={34} dim delay={450} w={1500}>
        El valor por defecto del SDK (cumulative) devuelve HTTP 400. Requisitos: Python 3.10+, endpoint de Azure OpenAI y
        DPS con Traces y Metrics powered by Grail.
      </Text>

      {/* 09.5 observe */}
      <Text on={is(4)} y={TOP + 10} size={40} w={1560}>
        El agente aparece en el filtro <A>Agent</A> como <C>observability-haiku-agent</C>:
      </Text>
      <Table on={is(4)} y={TOP + 120} kw={620} size={30} delay={200} head={['vista', 'qué mirar']} rows={[
        ['Overview › Response time per model', 'Latencia p99 y media por modelo (requiere el endpoint de métricas)'],
        ['Cost dashboard', 'Coste de tokens de entrada y salida por modelo (requiere métricas)'],
        ['Prompts', <>Texto de prompt y completion, agrupado por <C>gen_ai.conversation.id</C></>],
      ]} />
    </>
  );
}

/** 09 AGENT FRAMEWORK — Microsoft Agent Framework self-instruments with OTel. */
export const AgentFramework = () => <Scene index={8}><AgentFramework_ /></Scene>;
