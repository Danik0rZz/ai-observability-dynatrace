import { Arrow, NodeBox, Scene, useScene, type Rect } from 'beatdeck';
import { CONV_DQL } from '../terminal';
import { A, Big, Bullets, C, Code, Grid, Head, Meta, Table, Text, TOP } from '../ui';

const K8S = [
  { k: '1', t: 'Full-Stack en el clúster', d: 'Y Service Detection v2 para Kubernetes.' },
  { k: '2', t: 'Dynatrace Collector', d: 'Vía Helm: k8sattributes, transform, cumulative_to_delta. Sampling para controlar coste.' },
  { k: '3', t: 'Instrumentar el código', d: 'OpenLLMetry con un token metrics/logs/traces ingest. Métricas en delta.' },
];

// Conversation + RUM
const BRW: Rect = { x: 150, y: 330, w: 400, h: 120 };
const BE: Rect = { x: 760, y: 330, w: 400, h: 120 };
const LLMS: Rect = { x: 1370, y: 330, w: 400, h: 120 };

function UseCases2_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 15 · sample-use-cases" title="Casos de uso II" />

      {/* 15.1 Kubernetes */}
      <Text on={is(0)} out={past(0)} y={TOP} size={38} w={1560}>
        <A>OpenTelemetry / OpenLLMetry</A> emite la telemetría GenAI (modelos, tokens, latencias, coste). <A>OneAgent</A> aporta el contexto
        full-stack de Kubernetes y correlaciona con servicios, problemas y Dynatrace Intelligence.
      </Text>
      <Grid on={is(0)} out={past(0)} items={K8S} cols={3} y={TOP + 200} h={300} />

      {/* 15.2 what the platform adds */}
      <Bullets show={() => is(1)} out={past(1)} y={TOP} size={36} gap={34} stagger={150} items={[
        <><A>Distributed Tracing</A>: trace multi-servicio con los atributos GenAI de cada span a la derecha.</>,
        <><A>Application Security</A>: en Kubernetes ves si tus agentes o servicios de IA tienen vulnerabilidades activas.</>,
        <>Kubernetes › Deployments › Workload › <A>Additional Telemetry</A>: nuevas señales de IA; Pin to dashboard sin escribir DQL.</>,
      ]} />

      {/* 15.3 OpenAI */}
      <Text on={is(2)} out={past(2)} y={TOP} size={38} w={1560}>
        Recoger, visualizar y alertar sobre consumo, latencia y estabilidad de OpenAI y Azure OpenAI junto al resto de servicios.
      </Text>
      <Table on={is(2)} out={past(2)} y={TOP + 140} kw={520} size={28} delay={200} rows={[
        ['OpenAI Agents SDK sample', 'Customer Service Agent con OpenLLMetry emitiendo traces y métricas'],
        ['Coste vía logs', 'Línea de log (Winston) con tokens + trace/span context enrichment → Explorer › Logs'],
        ['Coste vía métricas', <>Tokens del payload enviados al OneAgent local: <C>localhost:14499/metrics/ingest</C></>],
        ['Dashboard', 'Consumo de tokens, SLOs de latencia y disponibilidad, tiempo de respuesta, errores, peticiones'],
      ]} />

      {/* 15.4 root cause */}
      <Big on={is(3)} out={past(3)} y={TOP + 40} size={116}>GPT como <A>causa raíz</A>,<br />detectado solo.</Big>
      <Text on={is(3)} out={past(3)} y={640} size={36} dim delay={300} w={1560}>
        Dynatrace Intelligence aprende el comportamiento típico de cada servicio. Ante una ralentización o subida de errores anómala en las
        respuestas del modelo, lanza el análisis de causa raíz automáticamente.
      </Text>

      {/* 15.5 conversation id + RUM */}
      <NodeBox rect={BRW} on={is(4)} kind="navegador · rum javascript" value="user action" />
      <Arrow from={BRW} to={BE} on={is(4)} label="traceparent" delay={150} />
      <NodeBox rect={BE} on={is(4)} kind="fastapi" value="span raíz" delay={150} tone="hot" />
      <Arrow from={BE} to={LLMS} on={is(4)} label="mismo traceId" delay={300} />
      <NodeBox rect={LLMS} on={is(4)} kind="pydantic ai" value="spans LLM" delay={300} />
      <Table on={is(4)} out={past(4)} y={520} kw={520} size={27} delay={450} head={['atributo', 'significado']} rows={[
        ['gen_ai.conversation.id', 'Agrupa todos los spans LLM de una sesión del navegador'],
        ['dt.rum.session.id', 'Vía tracestate de RUM: enlace del trace a la sesión en Experience Vitals'],
        ['session.id', 'Alias de gen_ai.conversation.id en AI Observability'],
      ]} />
      <Meta on={is(4)} out={past(4)} y={930} size={20} delay={600}>El frontend sustituye su UUID por el ID de sesión RUM: gen_ai.conversation.id = dt.rum.session.id</Meta>

      {/* 15.6 one query, the whole trajectory */}
      <Text on={is(5)} y={TOP} size={36} w={1560}>
        Cada pregunta es un trace distinto. Un <C>SpanProcessor</C> deja el ID en un atributo privado y un exporter wrapper lo copia a
        <C> gen_ai.conversation.id</C> justo antes de exportar, por encima de lo que ponga el framework.
      </Text>
      <Code on={is(5)} y={TOP + 200} lines={CONV_DQL} size={20} delay={200} label="DQL · la trayectoria completa del agente en una sesión" />
      <Text on={is(5)} y={TOP + 470} size={30} dim delay={400} w={1560}>
        En Prompts, filtra por <A>Session</A>: todas las interacciones LLM de esa sesión juntas, aunque abarquen varios trace IDs.
      </Text>
    </>
  );
}

/** 15 CASOS DE USO II — Kubernetes, OpenAI, conversation + RUM. */
export const UseCases2 = () => <Scene index={14}><UseCases2_ /></Scene>;
