/**
 * Every line of code, command or query shown on stage, copied character for character from
 * reference/source.md (the extracted Dynatrace docs). Scenes import from here; never retype.
 * `npm run verify -- --source=reference/source.md` checks each line.
 */

/** get-started/opentelemetry · "2. Add GenAI attributes to your spans" (Python) */
export const OTEL_SPAN = [
  'with tracer.start_as_current_span("chat gpt-5", kind=SpanKind.CLIENT) as span:',
  '    span.set_attribute("gen_ai.operation.name", "chat")',
  '    span.set_attribute("gen_ai.provider.name", "openai")',
  '    span.set_attribute("gen_ai.request.model", "gpt-5.2")',
  '    span.set_attribute("gen_ai.request.temperature", 0.7)',
  '    response = openai_client.chat.completions.create(',
  '    )',
  '    span.set_attribute("gen_ai.response.model", response.model)',
  '    span.set_attribute("gen_ai.response.id", response.id)',
  '    span.set_attribute("gen_ai.usage.input_tokens", response.usage.prompt_tokens)',
  '    span.set_attribute("gen_ai.usage.output_tokens", response.usage.completion_tokens)',
];

/** get-started/openllmetry · "Initialize the tracer" (Python) */
export const TRACELOOP_INIT = [
  'from traceloop.sdk import Traceloop',
  'headers = { "Authorization": "Api-Token <YOUR_DT_API_TOKEN>" }',
  'Traceloop.init(',
  '    app_name="<your-service>",',
  '    api_endpoint="https://<YOUR_ENV>.live.dynatrace.com/api/v2/otlp", # or OpenTelemetry Collector URL',
  '    headers=headers',
  ')',
];

/** get-started/openllmetry · "2. Configure your application" — the decorators */
export const TRACELOOP_DECORATORS = [
  '@task(name="add_prompt_context")',
  '@task(name="prep_prompt_chain")',
  '@workflow(name="ask_question")',
];

/** get-started/openinference · "Use OpenTelemetry GenAI semantic conventions when available" */
export const OI_SEMCONV = ['OPENINFERENCE_ENABLE_GENAI_SEMCONV=true'];

/** integrations/microsoft-agent-framework · "1. Configure your environment" */
export const MAF_ENV = [
  'OTEL_SERVICE_NAME=microsoft-agent-framework',
  'OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf                        # required by Dynatrace OTLP ingest',
  'OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE=delta          # Dynatrace requires delta; the SDK default (cumulative) returns HTTP 400',
];

/** get-started/llm-judge-evaluation · steps 1–7 */
export const DTEVALS_CMDS = [
  'npm install -g @dynatrace-oss/dt-evals',
  'dt-evals doctor',
  'dt-evals configure',
  'dt-evals validate',
  'dt-evals run --since 1h --sample 10',
  'dt-evals evaluators add',
  'dt-evals run --ci',
];

/** get-started/llm-judge-evaluation · "3. Configure the CLI" (.dt-eval.yaml) */
export const DTEVAL_YAML = [
  'judge:',
  '  provider: openai',
  '  model: gpt-4.1',
  'scope:',
  '  service: pydantic-ai-music-agent',
  '  since: 1h',
  '  sampling:',
  '    strategy: random',
  '    percent: 10',
  'metrics:',
  '  enabled:',
  '    - faithfulness',
  '    - relevance',
  '    - hallucination',
  '    - toxicity',
  '    - drift',
  'alerts:',
  '  thresholds:',
  '    faithfulness: 0.7',
  '    relevance: 0.7',
  'storeEvaluatedPrompt: false',
];

/** get-started/llm-judge-evaluation · "Query with DQL" */
export const DQL_EVALS = [
  'fetch bizevents',
  '| filter event.type == "gen_ai.evaluation.result"',
  '| summarize avg_score = avg(gen_ai.evaluation.score.value), by: { gen_ai.evaluation.name }',
  '| sort avg_score asc',
];

/** sample-use-cases/ab-model-testing · "Configure your application" */
export const AB_RESOURCE = [
  '    resource_attributes={',
  "        'model.version': os.getenv('MODEL_VERSION'),",
  "        'dataset.id': os.getenv('DATASET_ID'),",
  '    }',
];
export const AB_FLAG = [
  '   with trace.get_tracer("my-awesome-app").start_as_current_span(name="handle_request") as span:',
  '       span.set_attribute("feature_flag.key", "my-new-feature-enabled")',
  '       span.set_attribute("feature_flag.result.value", "true")',
];
/** sample-use-cases/ab-model-testing · "Adapt the existing dashboard" */
export const AB_DQL = [
  'fetch spans',
  '| filter isNotNull(gen_ai.system) and isNotNull(model.version)',
  '| summarize versions = collectDistinct(model.version)',
  '| expand versions',
  '| filter model.version == $ModelVersion',
];

/** sample-use-cases/self-service-ai-observability-tutorial · DQL examples */
export const RAG_DQL = [
  'fetch spans',
  '| summarize models = collectDistinct(gen_ai.request.model)',
  '| expand models',
  '| sort models',
];
/** sample-use-cases/conversation-and-session-tracking · "Query with DQL" */
export const CONV_DQL = [
  'fetch spans',
  '| filter gen_ai.conversation.id == "<paste-from-UI>"',
  '| fields timestamp, span.name, gen_ai.request.model, gen_ai.usage.input_tokens, gen_ai.usage.output_tokens, feedback.rating',
  '| sort timestamp asc',
];
