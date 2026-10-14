import { Arrow, NodeBox, Reveal, Scene, useScene, type Rect } from 'beatdeck';
import { DQL_EVALS, DTEVAL_YAML, DTEVALS_CMDS } from '../terminal';
import { A, Big, Bullets, C, Chips, Code, Head, L, Meta, Text, TOP } from '../ui';

const FLOW: { k: string; v: string; d: string }[] = [
  { k: '1 · sample', v: 'Muestrear', d: 'Spans GenAI del servicio y timeframe: % aleatorio, últimos N o solo errores.' },
  { k: '2 · mask', v: 'Enmascarar', d: 'Emails, teléfonos, tarjetas y SSN se redactan en memoria.' },
  { k: '3 · score', v: 'Puntuar', d: 'El modelo juez puntúa cada interacción y explica por qué.' },
  { k: '4 · store', v: 'Guardar', d: 'Cada score es un bizevents enlazado a su trace.' },
];
const FW = 370, FG = 46, FY = 360;
const fr = (i: number): Rect => ({ x: L + i * (FW + FG), y: FY, w: FW, h: 130 });

const DETECTS = [
  'Frustración del usuario en los prompts entrantes',
  'Respuestas tóxicas, dañinas o inseguras',
  'Respuestas irrelevantes o incompletas',
  'Alucinaciones y afirmaciones sin soporte',
  'Poca fidelidad al contexto recuperado',
  'Fuga de PII, prompt injection y sesgo dañino',
];

function Evals_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 11 · agent-evaluations · llm-judge-evaluation · preview" title="Evaluaciones" />

      {/* 11.1 LLM-as-a-judge on production */}
      <Big on={is(0)} out={past(0)} y={TOP + 40} size={116}>LLM-as-a-judge sobre<br />tráfico <A>de producción</A>.</Big>
      <Text on={is(0)} out={past(0)} y={640} size={36} dim delay={300} w={1560}>
        Lee los mismos spans GenAI que ya ingieres y escribe cada score de vuelta en Dynatrace, enlazado al trace, prompt y agente que
        produjo la respuesta. Evaluaciones en la UI o automatizadas con el CLI open source <A>dt-evals</A>.
      </Text>
      <Meta on={is(0)} out={past(0)} y={880} size={20} delay={450}>Preview · sujeto a los términos del programa Preview</Meta>

      {/* 11.2 the run */}
      {FLOW.map((f, i) => (
        <NodeBox key={f.k} rect={fr(i)} on={is(1)} kind={f.k} value={f.v} tone={i === 3 ? 'hot' : 'normal'} delay={i * 180} />
      ))}
      {FLOW.slice(1).map((_, i) => (
        <Arrow key={i} from={fr(i)} to={fr(i + 1)} on={is(1)} delay={i * 180 + 120} />
      ))}
      {FLOW.map((f, i) => (
        <Reveal key={`d${i}`} on={is(1)} out={past(1)} x={fr(i).x} y={FY + 160} delay={300 + i * 180}>
          <div style={{ width: FW, fontSize: 26, lineHeight: 1.3, color: 'var(--ink-2)' }}>{f.d}</div>
        </Reveal>
      ))}
      <Text on={is(1)} out={past(1)} y={760} size={32} delay={900} w={1560}>
        <C>event.type == "gen_ai.evaluation.result"</C> · el evaluador <A>drift</A> compara con una baseline de siete días:
        regresiones graduales, no solo umbrales de una ejecución.
      </Text>

      {/* 11.3 evaluators */}
      <Text on={is(2)} out={past(2)} y={TOP} size={40} w={1560}>
        <A>14 evaluadores</A> integrados de safety, grounding, quality y retrieval — faithfulness, relevance, hallucination, toxicity… — más detección estadística de drift. Detectan:
      </Text>
      <Bullets show={() => is(2)} out={past(2)} y={TOP + 170} size={32} gap={14} items={DETECTS} />
      <Text on={is(2)} out={past(2)} y={TOP + 590} size={28} dim delay={600} w={1560}>
        Y evaluadores propios: tu prompt de juez, rango de score y umbral. Mapea campos con <C>scope.spanFields</C> si tus spans no siguen la semconv.
      </Text>

      {/* 11.4 dt-evals CLI */}
      <Code on={is(3)} out={past(3)} y={TOP} lines={DTEVALS_CMDS} size={30} label="dt-evals · node.js 20+" />
      <Bullets show={() => is(3)} out={past(3)} x={1000} y={TOP + 40} w={770} size={28} gap={18} stagger={120} items={[
        <><C>doctor</C> crea el token, lo guarda en un .env gitignored y verifica scopes y conectividad.</>,
        <><C>configure</C> escribe <C>.dt-eval.yaml</C>.</>,
        <><C>--sample</C> % de traces · <C>--metric</C> un evaluador · <C>--dry-run</C> sin llamar al juez.</>,
        <><C>--ci</C> sale con código ≠ 0 si un score baja del umbral: <A>gate de calidad</A> en el pipeline.</>,
      ]} />

      {/* 11.5 the config */}
      <Code on={is(4)} out={past(4)} y={TOP - 10} lines={DTEVAL_YAML} size={20} label=".dt-eval.yaml (extracto)" />
      <Bullets show={() => is(4)} out={past(4)} x={720} y={TOP + 40} w={1050} size={28} gap={20} stagger={120} items={[
        <>Jueces: OpenAI, Anthropic, Azure OpenAI, Google Gemini Enterprise Platform (Vertex AI), Amazon Bedrock.</>,
        <>Credenciales siempre por entorno (<C>DT_API_TOKEN</C>, clave del juez); nunca en el fichero de config.</>,
        <>En CI, como secretos del pipeline.</>,
        <><C>storeEvaluatedPrompt: false</C> por defecto: el contenido evaluado no se guarda en los bizevents.</>,
      ]} />

      {/* 11.6 from the UI */}
      <Meta on={is(5)} out={past(5)} y={TOP}>Configura un proveedor juez (Settings)</Meta>
      <Chips on={is(5)} out={past(5)} y={TOP + 46} size={26} stagger={30} items={['Anthropic', 'OpenAI', 'Microsoft Foundry', 'Azure OpenAI', 'Google Gemini', 'Vertex AI', 'AWS Bedrock', 'OpenAI-compatible']} />
      <Text on={is(5)} out={past(5)} y={TOP + 200} size={28} dim delay={200} w={1560}>
        Antes, permite su host en Settings › General › External requests (p. ej. <C>api.openai.com</C>, <C>api.anthropic.com</C>). Credenciales como secretos en app settings.
      </Text>
      <Bullets show={() => is(5)} out={past(5)} y={TOP + 330} size={30} gap={14} stagger={120} items={[
        <>Evaluation method library: métodos propios con system prompt de juez y variables <C>input</C> / <C>output</C>.</>,
        <>Prompts › selecciona prompt runs › <A>Run manual evaluations</A> › proveedor, modelo y métodos.</>,
        <>Evaluaciones = prompt runs × métodos. Máximo 30 a la vez (límite temporal); con más de 20 algunas pueden no completarse.</>,
      ]} />

      {/* 11.7 review */}
      <Text on={is(6)} out={past(6)} y={TOP} size={40} w={1560}>Del score a la causa raíz</Text>
      <Chips on={is(6)} out={past(6)} y={TOP + 90} size={32} stagger={120} hot={(s) => s === 'View trace'}
        items={['Evaluations › Runs', 'Evals', 'Open prompts', 'View trace', 'Agents topology']} />
      <Bullets show={() => is(6)} out={past(6)} y={TOP + 240} size={30} gap={14} stagger={120} items={[
        'Runs: run ID, pass rate, modelo juez, AI app, métodos y última ejecución.',
        'Evals: score, veredicto y explicación; método, versión, juez, run ID, trace ID y span ID.',
        'Compara score y explicación con input, output y system prompt.',
        <>Con <C>dtctl</C> y sus agent skills, consulta bizevents y spans para automatizar la investigación con tu coding assistant o agente SRE.</>,
      ]} />

      {/* 11.8 DQL + alerts */}
      <Code on={is(7)} y={TOP} lines={DQL_EVALS} size={26} label="DQL · score medio por evaluador" />
      <Text on={is(7)} y={TOP + 290} size={32} delay={250} w={1560}>
        Cada resultado lleva <C>gen_ai.evaluation.score.value</C>, <C>gen_ai.evaluation.score.label</C>, la explicación del juez y el <C>trace_id</C>.
      </Text>
      <Text on={is(7)} y={TOP + 440} size={32} dim delay={400} w={1560}>
        Son bizevents: alerta sobre una tasa de fallo creciente o un score medio en caída, como con cualquier otra señal.
      </Text>
      <Meta on={is(7)} y={TOP + 600} size={19} delay={500}>scopes dt-evals: storage:spans:read · buckets:read · bizevents:read · events:write · metrics:write · logs:read</Meta>
    </>
  );
}

/** 11 EVALUACIONES — LLM-as-a-judge in the app and with dt-evals. */
export const Evals = () => <Scene index={10}><Evals_ /></Scene>;
