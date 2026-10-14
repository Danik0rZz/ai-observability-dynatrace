import type { SceneDef } from 'beatdeck';

/**
 * The talk's beat map: scenes → beats. One click = one beat.
 * `ref` = the docs page (under docs.dynatrace.com/docs/observe/dynatrace-for-ai-observability/), `source` = what
 * it says, `note` = speaker cue. The presenter view shows all three; the audience never does.
 */
const OV = 'dynatrace-for-ai-observability (overview)';
const TC = 'terms-and-concepts';
const GS = 'get-started';
const OA = 'get-started/oneagent';
const OI = 'get-started/openinference';
const OT = 'get-started/opentelemetry';
const OL = 'get-started/openllmetry';
const MAF = 'integrations/microsoft-agent-framework';
const APP = 'ai-observability-app';
const EV = 'agent-evaluations + get-started/llm-judge-evaluation';
const INT = 'integrations';
const MR = 'metrics-reference';
const UC = 'sample-use-cases';
const FAQ = 'frequently-asked-questions';

export const SCENES: SceneDef[] = [
  {
    id: '01', title: 'APERTURA',
    beats: [
      { name: 'standby', note: 'Pantalla tranquila mientras la gente se sienta. El primer clic empieza la charla.' },
      { name: 'título', ref: OV, note: 'Recorrido completo por la documentación de Dynatrace for AI Observability.' },
    ],
  },
  {
    id: '02', title: 'MAPA',
    beats: [
      { name: 'mapa de la documentación', ref: 'árbol de la sección (21 páginas)', note: 'Así está organizada la documentación; seguimos este orden.' },
    ],
  },
  {
    id: '03', title: 'QUÉ ES',
    beats: [
      { name: 'definición', ref: OV, source: 'AI observability is the practice of collecting, analyzing, and correlating telemetry across your tech stack to understand how AI systems, agents, and LLMs behave in all environments including production.' },
      { name: 'ejecución opaca', ref: OV, source: 'model execution happens externally and opaquely, yet directly affects business-critical workflows.' },
      { name: 'métricas clave', ref: OV + ' · Key metrics' },
      { name: 'capacidades', ref: OV + ' · Dynatrace Platform capabilities' },
      { name: 'casos de uso', ref: OV + ' · Key use cases' },
      { name: 'todo el stack', ref: OV + ' · Observing agents / providers / vector DBs / orchestration / infrastructure' },
      { name: 'dogfooding', ref: OV + ' · AI observability provided by Dynatrace', note: 'Dynatrace observa sus propios modelos (Dynatrace Intelligence) con la misma solución.' },
    ],
  },
  {
    id: '04', title: 'CONCEPTOS',
    beats: [
      { name: 'RAG', ref: TC },
      { name: 'agentes', ref: TC },
      { name: 'guardrails', ref: TC },
      { name: 'no se aplican', ref: TC + ' + ' + APP, source: 'Dynatrace does not enforce runtime guardrails. Providers expose these signals, which Dynatrace captures and visualizes.' },
      { name: 'evals', ref: TC + ' · Evaluations (evals)' },
      { name: 'traces', ref: TC + ' · Traces' },
      { name: 'traceloop.span.kind', ref: TC + ' · Traceloop span kind' },
      { name: 'semconv', ref: TC + ' · Instrumentation / OTel GenAI semantic conventions' },
    ],
  },
  {
    id: '05', title: 'INGESTA',
    beats: [
      { name: 'tu app', ref: GS },
      { name: 'oneagent', ref: GS, source: 'Dynatrace OneAgent for automatic, zero-code AI observability.' },
      { name: 'openinference', ref: GS, source: 'OpenInference instrumentors for OpenTelemetry-based ingestion.' },
      { name: 'opentelemetry', ref: GS, source: 'OpenTelemetry SDK for direct instrumentation.' },
      { name: 'openllmetry · cloud', ref: APP + ' · Get started', source: 'Open source auto-instrumentation libraries like OpenLLMetry. Directly pulling the data from cloud providers through cloud monitoring.' },
      { name: 'gen_ai.*', ref: MR, note: 'Todos los caminos convergen en atributos gen_ai.*: el idioma que entiende la app.' },
      { name: 'evaluar', ref: GS, source: 'Score production GenAI traces with the open-source dt-evals CLI and visualize quality and drift in Dynatrace.' },
    ],
  },
  {
    id: '06', title: 'ONEAGENT',
    beats: [
      { name: 'cero código', ref: OA },
      { name: 'pasos', ref: OA },
      { name: 'features', ref: OA + ' · 2. Enable required OneAgent features' },
      { name: 'web framework', ref: OA },
      { name: 'sensores experimentales', ref: OA },
      { name: 'qué captura', ref: OA + ' · 4. Observe in Dynatrace' },
    ],
  },
  {
    id: '07', title: 'OPENINFERENCE',
    beats: [
      { name: 'estándar', ref: OI },
      { name: 'tres caminos', ref: OI },
      { name: 'collector vs openpipeline', ref: OI + ' · Normalize your OpenInference attributes' },
      { name: 'collector', ref: OI + ' · OTel Collector with the genainormalizer processor' },
      { name: 'openpipeline', ref: OI + ' · Dynatrace OpenPipeline' },
      { name: 'mapeo', ref: OI + ' · Attribute mapping reference' },
      { name: 'privacidad y samples', ref: OI + ' · Control message-content capture' },
    ],
  },
  {
    id: '08', title: 'OPENTELEMETRY',
    beats: [
      { name: 'vendor-neutral', ref: OT },
      { name: 'span gen_ai', ref: OT + ' · 2. Add GenAI attributes to your spans', note: 'Código literal de la guía (Python).' },
      { name: 'atributos', ref: OT + ' · GenAI span attributes' },
      { name: 'openllmetry', ref: OL },
      { name: 'traceloop.init', ref: OL + ' · 1. Instrument your application' },
      { name: 'resultado', ref: OL + ' · 5. Observe in Dynatrace' },
    ],
  },
  {
    id: '09', title: 'AGENT FRAMEWORK',
    beats: [
      { name: 'otel nativo', ref: MAF },
      { name: 'dos spans', ref: MAF + ' · About the Microsoft Agent Framework' },
      { name: 'señales', ref: MAF },
      { name: 'delta', ref: MAF + ' · 1. Configure your environment' },
      { name: 'observar', ref: MAF + ' · 5. Observe in Dynatrace' },
    ],
  },
  {
    id: '10', title: 'LA APP',
    beats: [
      { name: 'qué ofrece', ref: APP },
      { name: 'prerrequisitos', ref: APP + ' · Prerequisites' },
      { name: 'pestañas', ref: APP + ' · Concepts' },
      { name: 'overview', ref: APP + ' · Overview tab' },
      { name: 'explorer', ref: APP + ' · Explorer tab' },
      { name: 'prompts', ref: APP + ' · Prompts tab' },
      { name: 'agents topology', ref: APP + ' · Agents topology tab' },
      { name: 'evaluations', ref: APP + ' · Evaluations tab (Preview)' },
      { name: 'alertas y traces', ref: APP + ' · Create and manage alerts / Debug prompts and traces' },
      { name: 'coste y lo que viene', ref: APP + ' · Query and sampling cost / What\'s coming next?' },
    ],
  },
  {
    id: '11', title: 'EVALUACIONES',
    beats: [
      { name: 'llm-as-a-judge', ref: EV },
      { name: 'flujo', ref: 'get-started/llm-judge-evaluation · What happens during a run' },
      { name: 'evaluadores', ref: OV + ' + ' + FAQ },
      { name: 'dt-evals cli', ref: 'get-started/llm-judge-evaluation · steps 1–7', note: 'Comandos literales del tutorial.' },
      { name: '.dt-eval.yaml', ref: 'get-started/llm-judge-evaluation · 3. Configure the CLI' },
      { name: 'desde la UI', ref: 'agent-evaluations' },
      { name: 'revisar resultados', ref: 'agent-evaluations · Review evaluation runs and results' },
      { name: 'dql y alertas', ref: 'get-started/llm-judge-evaluation · Query with DQL' },
    ],
  },
  {
    id: '12', title: 'INTEGRACIONES',
    beats: [
      { name: 'catálogo', ref: INT, note: 'Recuento de la página de integraciones; el catálogo completo vive en Dynatrace Hub.' },
      { name: 'agentes', ref: INT + ' · AI agents' },
      { name: 'modelos', ref: INT + ' · Model providers and platforms' },
      { name: 'coding agents', ref: INT + ' · AI coding agent monitoring' },
      { name: 'vector stores', ref: INT + ' · Data management and vector stores' },
      { name: 'orquestación · infra · gateways', ref: INT },
    ],
  },
  {
    id: '13', title: 'MÉTRICAS',
    beats: [
      { name: 'cuatro fuentes', ref: MR },
      { name: 'client metrics', ref: MR + ' · GenAI client metrics' },
      { name: '$0', ref: MR + ' · Metric: gen_ai.client.token.usage', source: 'If this metric is missing, all cost tiles show $0 with no visible error.' },
      { name: 'server · agent · tool', ref: MR },
      { name: 'atributos de span', ref: MR + ' · Core span attributes' },
      { name: 'vendor-native', ref: MR + ' · Vendor-native metrics and attributes' },
      { name: 'dashboards y otras fuentes', ref: MR + ' · Other ready-made dashboards / Other OTel or third-party sources' },
    ],
  },
  {
    id: '14', title: 'CASOS DE USO I',
    beats: [
      { name: 'seis casos', ref: UC },
      { name: 'a/b testing', ref: UC + '/ab-model-testing' },
      { name: 'metadatos', ref: UC + '/ab-model-testing · Configure your application' },
      { name: 'variable dql', ref: UC + '/ab-model-testing · Adapt the existing dashboard' },
      { name: 'gobernanza', ref: UC + '/data-governance' },
      { name: 'rag', ref: UC + '/self-service-ai-observability-tutorial' },
      { name: 'rag dql', ref: UC + '/self-service-ai-observability-tutorial · Observe your RAG pipeline' },
    ],
  },
  {
    id: '15', title: 'CASOS DE USO II',
    beats: [
      { name: 'kubernetes', ref: UC + '/end-to-end-observability' },
      { name: 'capacidades k8s', ref: UC + '/end-to-end-observability · Platform capabilities' },
      { name: 'openai', ref: UC + '/openai-observability' },
      { name: 'causa raíz', ref: UC + '/openai-observability · Dynatrace Intelligence automatically detects GPT as root cause' },
      { name: 'conversación + rum', ref: UC + '/conversation-and-session-tracking' },
      { name: 'dql conversación', ref: UC + '/conversation-and-session-tracking · Query with DQL' },
    ],
  },
  {
    id: '16', title: 'FAQ',
    beats: [
      { name: 'instrumentar', ref: FAQ },
      { name: 'métricas', ref: FAQ },
      { name: 'guardrails', ref: FAQ },
      { name: 'agentes y protocolos', ref: FAQ },
      { name: 'alertas', ref: FAQ },
      { name: 'dashboards existentes', ref: FAQ },
      { name: 'coste de consulta', ref: FAQ },
    ],
  },
  {
    id: '17', title: 'CIERRE',
    beats: [
      { name: 'resumen', note: 'Síntesis de las secciones; no añade afirmaciones nuevas.' },
      { name: 'preguntas', note: 'El QR apunta a la página de la documentación.' },
    ],
  },
];
