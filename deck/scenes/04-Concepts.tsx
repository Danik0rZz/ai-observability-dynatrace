import { NodeBox, Reveal, Scene, useScene } from 'beatdeck';
import { A, Big, C, Grid, Head, L, Meta, Text, TOP } from '../ui';

const EVALS = [
  { k: 'llm as a judge', t: 'Un modelo puntúa a otro', d: 'Recibe petición, respuesta y rúbrica; devuelve score y una breve justificación. Para calidad matizada: faithfulness, relevancia, tono, sesgo.' },
  { k: 'code evals', t: 'Reglas fijas, deterministas', d: 'Exact match, keyword, regex, validar JSON, ejecutar tests o comprobar que el agente llamó a la tool correcta.' },
  { k: 'online evals', t: 'Tráfico real de producción', d: 'Sin etiquetas, muestreado. Detecta patrones nuevos, edge cases, drift y anomalías sin frenar al usuario.' },
  { k: 'offline evals', t: 'Dataset fijo antes de desplegar', d: 'Curado y versionado. Regresión, comparación de modelos, optimización de prompts, red-teaming.' },
];

const KINDS: [string, string][] = [
  ['workflows', 'proceso de alto nivel o cadena de operaciones'],
  ['task', 'operación o paso concreto dentro de un workflow'],
  ['agent', 'componente autónomo que decide o actúa'],
  ['tool', 'utilidad o función usada por la aplicación'],
];

/** An illustrative waterfall (span names from the OpenInference → gen_ai.operation.name mapping). */
const SPANS: [string, number, number][] = [
  ['invoke_agent', 0, 1300],
  ['retrieval', 80, 360],
  ['chat', 460, 560],
  ['execute_tool', 1040, 260],
];

function Concepts_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 04 · terms and concepts" title="Términos y conceptos" />

      {/* 04.1 RAG */}
      <Big on={is(0)} out={past(0)} y={TOP + 40} size={220}>RAG<A>.</A></Big>
      <Meta on={is(0)} out={past(0)} y={TOP + 290}>Retrieval-Augmented Generation</Meta>
      <Text on={is(0)} out={past(0)} x={820} y={TOP + 60} w={950} size={38} delay={200}>
        Recupera documentos de fuentes externas y los usa para enriquecer la entrada del LLM al generar.
      </Text>
      <Text on={is(0)} out={past(0)} x={820} y={TOP + 290} w={950} size={30} dim delay={350}>
        Frente a un LLM que solo usa sus datos de entrenamiento: respuestas más precisas, actuales y con contexto.
      </Text>

      {/* 04.2 agents / agentic */}
      <Text on={is(1)} out={past(1)} y={TOP + 40} w={760} size={74} weight={600}>Agente</Text>
      <Text on={is(1)} out={past(1)} y={TOP + 150} w={740} size={32} dim delay={150}>
        Entidad autónoma o semiautónoma que realiza tareas en nombre de usuarios u otros sistemas, a menudo impulsada por un modelo de lenguaje.
      </Text>
      <Text on={is(1)} out={past(1)} x={1000} y={TOP + 40} w={770} size={74} weight={600} delay={250}><A>Agentic</A></Text>
      <Text on={is(1)} out={past(1)} x={1000} y={TOP + 150} w={770} size={32} dim delay={400}>
        Varios agentes colaboran en consultas complejas: evalúan la relevancia de la información, la priorizan y ajustan la generación según el contexto.
      </Text>

      {/* 04.3 guardrails */}
      <Text on={is(2)} out={past(2)} y={TOP + 30} size={74} weight={600}>Guardrails</Text>
      <Text on={is(2)} out={past(2)} y={TOP + 140} size={38} w={1560} delay={150}>
        Controles en runtime que mantienen la app segura, conforme y predecible. Explican por qué una interacción
        fue <A>bloqueada</A>, <A>modificada</A> o <A>permitida</A>: «el modelo falló» pasa a ser una causa raíz basada en políticas.
      </Text>
      {['Guardrails nativos del proveedor\n(Bedrock, filtros Azure / OpenAI)', 'Checks en la orquestación\n(callbacks de LangChain)', 'Emitir resultados y eventos\nde seguridad vía OpenTelemetry'].map((t, i) => (
        <NodeBox key={i} rect={{ x: L + i * 550, y: 660, w: 500, h: 170 }} on={is(2)} kind={`paso ${i + 1}`} tone={i === 0 ? 'hot' : 'normal'} delay={300 + i * 150}
          value={<span style={{ fontFamily: 'var(--font-sans)', fontSize: 28, whiteSpace: 'pre-line', lineHeight: 1.2 }}>{t}</span>} />
      ))}

      {/* 04.4 not enforced */}
      <Big on={is(3)} out={past(3)} y={TOP + 40} size={110}>Dynatrace <A>no aplica</A><br />guardrails en runtime.</Big>
      <Text on={is(3)} out={past(3)} y={640} size={40} dim delay={300} w={1500}>
        Los proveedores exponen las señales; Dynatrace las captura, las visualiza y las correlaciona con latencia,
        tokens y coste. Configúralos a nivel de proveedor: menor latencia y complejidad.
      </Text>

      {/* 04.5 evals */}
      <Meta on={is(4)} out={past(4)} y={TOP}>Evaluaciones (evals): ¿la respuesta cumple lo esperado?</Meta>
      <Grid on={is(4)} out={past(4)} items={EVALS} cols={4} h={500} tSize={32} dSize={25} />

      {/* 04.6 traces */}
      <Text on={is(5)} out={past(5)} y={TOP + 20} size={40} w={1560}>
        Un <A>trace</A> describe una petición y todas las operaciones para resolverla. Cada acción es un <A>span</A>, con
        atributos de IA: coste en tokens, prompts de entrada y salida.
      </Text>
      {SPANS.map(([n, x0, w], i) => (
        <Reveal key={n} on={is(5)} out={past(5)} x={L + 260 + x0} y={560 + i * 90} delay={300 + i * 120} axis="x">
          <div style={{ width: w, height: 64, background: i === 0 ? 'var(--hair-strong)' : 'var(--accent)', opacity: i === 0 ? 1 : 0.85, display: 'flex', alignItems: 'center', paddingLeft: 18 }}>
            <span className="mono keep-case" style={{ fontSize: 24, color: i === 0 ? 'var(--ink)' : '#0b0b0c', fontWeight: 600, whiteSpace: 'nowrap' }}>{n}</span>
          </div>
        </Reveal>
      ))}
      <Meta on={is(5)} out={past(5)} y={590} size={20} delay={200}>trace</Meta>
      <Meta on={is(5)} out={past(5)} y={940} size={19} delay={700}>Ilustrativo · nombres de operación del mapeo gen_ai.operation.name</Meta>

      {/* 04.7 traceloop.span.kind */}
      <Text on={is(6)} out={past(6)} y={TOP + 20} size={40} w={1560}>
        Traceloop marca los spans de frameworks LLM con <C>traceloop.span.kind</C>:
      </Text>
      {KINDS.map(([k, d], i) => (
        <Reveal key={k} on={is(6)} out={past(6)} x={L} y={TOP + 140 + i * 130} delay={200 + i * 120}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 40 }}>
            <span className="mono keep-case" style={{ fontSize: 56, color: 'var(--accent)', width: 420, fontWeight: 600 }}>{k}</span>
            <span style={{ fontSize: 36, color: 'var(--ink-2)' }}>{d}</span>
          </div>
        </Reveal>
      ))}

      {/* 04.8 instrumentation + semconv */}
      <Text on={is(7)} y={TOP + 20} size={60} weight={600} w={1560}>Instrumentación</Text>
      <Text on={is(7)} y={TOP + 110} size={36} dim w={1560} delay={120}>
        Para ingesta basada en OpenTelemetry, Dynatrace recomienda <A>OpenInference</A>. También OpenLLMetry si encaja con tu implementación.
      </Text>
      <Text on={is(7)} y={TOP + 320} size={60} weight={600} w={1560} delay={300}>OTel GenAI semantic conventions</Text>
      <Text on={is(7)} y={TOP + 410} size={36} dim w={1560} delay={420}>
        Estandarizan atributos y métricas de las operaciones de IA generativa: los datos de distintos proveedores
        son <A>comparables</A>. OpenInference usa sus propias convenciones y puede requerir normalización a <C>gen_ai.*</C>.
      </Text>
    </>
  );
}

/** 04 CONCEPTOS — terms and concepts. */
export const Concepts = () => <Scene index={3}><Concepts_ /></Scene>;
