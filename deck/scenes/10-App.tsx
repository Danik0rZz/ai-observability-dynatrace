import { Reveal, Scene, useScene } from 'beatdeck';
import { A, Bullets, C, Chips, Grid, Head, L, Meta, Text, TOP } from '../ui';

const OFFERS = [
  { t: 'Analítica out-of-the-box' }, { t: 'Auto-instrumentación' }, { t: 'Métricas dirigidas' },
  { t: 'Flujo de debugging' }, { t: '20+ tecnologías', d: 'OpenAI, Amazon Bedrock, Google Gemini, Google Vertex, Anthropic, LangChain…' }, { t: 'Dashboards listos' },
];

const PERMS = ['app-settings:objects:read', 'davis:analyzers:execute', 'environment-api:entities:read', 'state:user-app-states:write',
  'storage:entities:read', 'storage:filter-segments:read', 'storage:logs:read', 'storage:metrics:read', 'storage:smartscape:read', 'storage:spans:read'];

const TABS = ['Overview', 'Explorer', 'Prompts', 'Agents topology', 'Evaluations'];
const TAB_W = 300, TAB_GAP = 30, TAB_Y = 290;

/** What each tab is for: tab index → beat. */
const TAB_BEAT = [3, 4, 5, 6, 7];

function App_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  const tabsOn = here && b >= 2 && b <= 7;
  const body = TAB_Y + 150; // content under the tab row
  return (
    <>
      <Head on={here} eyebrow="// 10 · ai-observability-app" title="La app AI Observability" />

      {/* 10.1 what it offers */}
      <Text on={is(0)} out={past(0)} y={TOP} size={40} w={1560}>
        Visibilidad extremo a extremo de cargas de IA: <A>servicios, LLMs, agentes y protocolos</A>.
      </Text>
      <Grid on={is(0)} out={past(0)} items={OFFERS} cols={3} y={TOP + 110} h={230} tSize={38} />

      {/* 10.2 prerequisites */}
      <Meta on={is(1)} out={past(1)} y={TOP}>Dynatrace Platform Subscription con</Meta>
      <Chips on={is(1)} out={past(1)} y={TOP + 50} items={['Metrics powered by Grail', 'Traces powered by Grail', 'Logs powered by Grail']} size={32} />
      <Meta on={is(1)} out={past(1)} y={TOP + 190} delay={200}>Permisos</Meta>
      <Reveal on={is(1)} out={past(1)} x={L} y={TOP + 240} delay={250}>
        <div className="mono keep-case" style={{ columnCount: 2, columnGap: 80, width: 1620, fontSize: 28, lineHeight: 1.7 }}>
          {PERMS.map((p) => <div key={p}>{p}</div>)}
        </div>
      </Reveal>
      <Text on={is(1)} out={past(1)} y={TOP + 560} size={28} dim delay={400} w={1560}>
        Para que los dashboards rendericen bien, añade a tus spans todos los atributos GenAI Required, Conditionally required y Recommended.
      </Text>

      {/* 10.3–10.8 the tab row, the current tab highlighted */}
      {TABS.map((t, i) => {
        const cur = here && b === TAB_BEAT[i];
        return (
          <Reveal key={t} on={tabsOn} x={L + i * (TAB_W + TAB_GAP)} y={TAB_Y} delay={i * 70}>
            <div style={{ width: TAB_W, height: 92, boxSizing: 'border-box', border: `${cur ? 3 : 2}px solid ${cur ? 'var(--accent)' : 'var(--hair-strong)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 600, color: cur ? 'var(--accent)' : b === 2 ? 'var(--ink)' : 'var(--ink-3)', transition: 'all 400ms' }}>
              {t}{i === 4 && <span className="t-meta" style={{ fontSize: 18, marginLeft: 10, color: 'inherit' }}>preview</span>}
            </div>
          </Reveal>
        );
      })}

      {/* 10.3 tabs + shared filters */}
      <Text on={is(2)} out={past(2)} y={body} size={38} w={1560} delay={300}>
        Todas las pestañas comparten el mismo menú de filtros a la izquierda:
      </Text>
      <Chips on={is(2)} out={past(2)} y={body + 90} items={['Type', 'Agent', 'Model', 'Provider', 'Service', 'Evaluation score']} size={32} />

      {/* 10.4 Overview */}
      <Bullets show={() => is(3)} out={past(3)} y={body} size={36} items={[
        <>Punto de partida: <A>descubrir cargas de IA</A> y validar la ingesta.</>,
        'Resumen de salud, rendimiento y coste de tus servicios de IA.',
        'Tiles: proveedores, agentes, versiones de modelo, servicios, peticiones LLM, tokens y tendencia de coste.',
        <>Cada tile abre Explorer; dashboards listos etiquetados <C>[AI Observability]</C>.</>,
      ]} />

      {/* 10.5 Explorer */}
      <Text on={is(4)} out={past(4)} y={body} size={34} w={1560}>
        Dos vistas: <A>Model Providers</A> (por proveedor, modelo, servicio o agente) y <A>Service explorer</A> (salud de los servicios).
        Errores, tráfico, latencia, coste de tokens y guardrails. Al abrir un servicio:
      </Text>
      <Grid on={is(4)} out={past(4)} y={body + 150} cols={6} h={180} gap={18} tSize={26} dSize={20} items={[
        { t: 'Problems & failures', d: 'HTTP, span errors' }, { t: 'Vulnerabilities', d: 'servicios, endpoints, modelos' },
        { t: 'Debug logs', d: 'WARN · INFO · ERROR' }, { t: 'Prompts & traces', d: 'system prompt, modelo' },
        { t: 'Additional telemetry', d: 'otras métricas' }, { t: 'Properties', d: 'metadatos, tags' },
      ]} />

      {/* 10.6 Prompts */}
      <Bullets show={() => is(5)} out={past(5)} y={body} size={33} gap={18} items={[
        'Todos los prompts cuyos spans siguen las GenAI semantic conventions: runs, scores, coste, rendimiento y release gates.',
        'Implica a PMs, SMEs o compliance directamente en la UI, sin cambios de código.',
        <>Desacopla los cambios de prompt de los despliegues y haz <A>rollback instantáneo</A> si cae la calidad.</>,
        'Compara versiones lado a lado y lanza A/B tests sobre tráfico real o datasets.',
        'Exporta prompts y traces a JSON. Cada prompt abre su waterfall de trace.',
      ]} />

      {/* 10.7 Agents topology */}
      <Bullets show={() => is(6)} out={past(6)} y={body} size={34} items={[
        <>Topología de <A>agentes, modelos, proveedores y servicios</A> de un vistazo.</>,
        'Interacciones entre agentes, handovers y schedulers.',
        'Anomalías y causa raíz en las cadenas agente → tool → LLM.',
        'Métricas por entidad: peticiones LLM, tokens, tiempo de respuesta medio, logs de error.',
        'Renderiza modelos (GPT-4, Claude, Gemini) y proveedores (OpenAI, Amazon Bedrock, Google Vertex).',
      ]} />

      {/* 10.8 Evaluations */}
      <Bullets show={() => is(7)} out={past(7)} y={body} size={34} items={[
        <>Puntúa calidad, seguridad y fiabilidad con <A>LLM-as-a-judge</A> sobre tráfico real, no test sets estáticos.</>,
        'Métricas de juez: safety, grounding, relevance, quality y retrieval.',
        'Pass/fail, score medio por evaluador, distribución y drift frente a una baseline móvil.',
        <>Cada score es un <C>bizevents</C> enlazado al trace: de un score bajo al trace en un clic.</>,
      ]} />

      {/* 10.9 alerts + traces */}
      <Text on={is(8)} out={past(8)} y={TOP} size={40} weight={600} w={1560}><A>New alert</A> en los tiles basados en métricas</Text>
      <Chips on={is(8)} out={past(8)} y={TOP + 80} size={28} items={['Invocation error count', 'Invocation latency', 'Token count', 'Token usage forecast', 'Overall guardrail activation']} />
      <Text on={is(8)} out={past(8)} y={TOP + 230} size={30} dim delay={200} w={1560}>
        El asistente se abre con el scope actual; ajusta umbrales y notificaciones. Gestión centralizada con Manage all alerts.
      </Text>
      <Text on={is(8)} out={past(8)} y={TOP + 380} size={40} weight={600} w={1560} delay={300}>Explorer › <A>View traces and prompts</A></Text>
      <Text on={is(8)} out={past(8)} y={TOP + 460} size={30} dim delay={400} w={1560}>
        Abre Distributed Tracing con tus filtros y timeframe: traces enriquecidos con campos GenAI — proveedor, modelo, servicio o endpoint y agente.
      </Text>

      {/* 10.10 query cost + what's next */}
      <Text on={is(9)} y={TOP} size={40} weight={600} w={1560}>Coste de consulta</Text>
      <Text on={is(9)} y={TOP + 70} size={30} dim w={1560} delay={100}>
        Algunos dashboards usan span queries que consumen <A>Traces powered by Grail - Query</A>, incluso sin datos. Para controlarlo:
      </Text>
      <Bullets show={() => is(9)} y={TOP + 190} size={30} gap={14} items={[
        'Usa la variable de sampling de esos dashboards.',
        'Restringe los dashboards exploratorios a quien los necesite.',
        'Prefiere tiles y vistas basadas en métricas.',
      ]} />
      <Text on={is(9)} y={TOP + 430} size={40} weight={600} w={1560} delay={300}>Lo que viene</Text>
      <Bullets show={() => is(9)} y={TOP + 500} size={30} gap={14} stagger={120} items={[
        'AI model and AI services explorer: detalle con logs, vulnerabilidades y nueva vista de prompts.',
        'Integración con Smartscape: topología de agentes para análisis cruzado con servicios, Kubernetes y cloud.',
      ]} />
    </>
  );
}

/** 10 LA APP — the AI Observability app, tab by tab. */
export const App = () => <Scene index={9}><App_ /></Scene>;
