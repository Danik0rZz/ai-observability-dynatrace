import { CountUp, Reveal, Scene, useScene } from 'beatdeck';
import { A, Chips, Head, L, Meta, Text, TOP } from '../ui';

/** integrations page, category by category, in its order. */
const CATS: { t: string; d: string; items: string[] }[] = [
  { t: 'Agentes de IA', d: 'AI agents', items: ['Amazon Bedrock AgentCore', 'Amazon Bedrock AgentCore Gateway', 'AWS Strands Agents', 'Google ADK', 'LangGraph', 'MCP AI Agent monitoring', 'Microsoft Agent Framework', 'OpenAI Agents', 'Pydantic AI'] },
  { t: 'Modelos y plataformas', d: 'Model providers and platforms', items: ['OpenAI', 'Amazon Bedrock', 'CrewAI', 'Azure AI Foundry', 'Anthropic', 'Gemini', 'DeepSeek', 'NVIDIA NIM', 'Red Hat OpenShift AI', 'Vertex AI Studio', 'Mistral AI', 'Ollama', 'Amazon SageMaker', 'Hugging Face', 'Replicate', 'Cohere', 'Groq', 'Together AI', 'IBM watsonx AI', 'Amazon Textract', 'Amazon Translate', 'Amazon Nova', 'Nutanix AI'] },
  { t: 'Coding agents', d: 'AI coding agent monitoring', items: ['Antigravity CLI', 'Claude Code', 'OpenAI Codex', 'GitHub Copilot SDK', 'OpenCode', 'OpenClaw', 'Kiro'] },
  { t: 'Vector stores', d: 'Data management and vector stores', items: ['Pinecone', 'LanceDB', 'Chroma', 'Milvus', 'Weaviate', 'Qdrant', 'Elasticsearch', 'Marqo'] },
  { t: 'Orquestación', d: 'Orchestration and prompt engineering', items: ['LangChain', 'Haystack', 'LlamaIndex', 'Langfuse'] },
  { t: 'Infraestructura', d: 'Infrastructure and compute', items: ['Google Cloud Tensor Processing Units', 'TensorFlow Keras', 'NVIDIA GPU', 'vLLM'] },
  { t: 'Seguridad y gateways', d: 'Security, governance, traffic', items: ['Kong AI', 'LiteLLM'] },
];
const TOTAL = CATS.reduce((n, c) => n + c.items.length, 0);

function Integrations_() {
  const { here, b, entry } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 12 · integrations" title="Integraciones" />

      {/* 12.1 the catalogue at a glance */}
      <Reveal on={is(0)} out={past(0)} x={L} y={TOP + 20}>
        <div className="t-numeral" style={{ fontSize: 300, color: 'var(--accent)' }}>
          <CountUp value={TOTAL} from={is(0) ? 0 : undefined} entry={entry} ms={1200} />
        </div>
      </Reveal>
      <Text on={is(0)} out={past(0)} x={L + 420} y={TOP + 60} w={1150} size={50} weight={600} delay={200}>
        tecnologías en la página de integraciones, en <A>{CATS.length} categorías</A>.
      </Text>
      {CATS.map((c, i) => (
        <Reveal key={c.t} on={is(0)} out={past(0)} x={L + (i % 4) * 410} y={TOP + 380 + Math.floor(i / 4) * 110} delay={300 + i * 70}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span className="mono" style={{ fontSize: 34, color: 'var(--accent)' }}>{c.items.length}</span>
            <span style={{ fontSize: 30, fontWeight: 500, whiteSpace: 'nowrap' }}>{c.t}</span>
          </div>
        </Reveal>
      ))}
      <Meta on={is(0)} out={past(0)} y={TOP + 640} size={20} delay={800}>Catálogo completo y actualizado: Dynatrace Hub</Meta>

      {/* 12.2–12.5 one category per beat; 12.6 the last three together */}
      {[0, 1, 2, 3].map((ci) => {
        const c = CATS[ci];
        const k = ci + 1;
        return (
          <div key={c.t}>
            <Reveal on={is(k)} out={past(k)} x={L} y={TOP}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
                <span className="t-numeral" style={{ fontSize: 120, color: 'var(--accent)' }}>{c.items.length}</span>
                <span style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.03em' }}>{c.t}</span>
              </div>
              <div className="t-meta" style={{ fontSize: 20, marginTop: 14 }}>{c.d}</div>
            </Reveal>
            <Chips on={is(k)} out={past(k)} y={TOP + 200} items={c.items} size={ci === 1 ? 30 : 36} stagger={ci === 1 ? 25 : 50} />
          </div>
        );
      })}
      {[4, 5, 6].map((ci, j) => {
        const c = CATS[ci];
        return (
          <div key={c.t}>
            <Reveal on={is(5)} x={L} y={TOP + j * 220} delay={j * 150}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 22 }}>
                <span className="t-numeral" style={{ fontSize: 80, color: 'var(--accent)' }}>{c.items.length}</span>
                <span style={{ fontSize: 44, fontWeight: 600 }}>{c.t}</span>
              </div>
            </Reveal>
            <Chips on={is(5)} y={TOP + 90 + j * 220} items={c.items} size={30} />
          </div>
        );
      })}
    </>
  );
}

/** 12 INTEGRACIONES — the integrations page, category by category. */
export const Integrations = () => <Scene index={11}><Integrations_ /></Scene>;
