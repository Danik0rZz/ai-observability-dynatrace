import { Scene, useScene } from 'beatdeck';
import { A, Bullets, C, Head, Text, TOP } from '../ui';

const QA: { q: string; a: React.ReactNode[] }[] = [
  {
    q: '¿Cómo instrumento mis servicios?',
    a: [
      <>Página de onboarding de AI Observability: <A>OpenInference</A> (camino OTel recomendado) o OpenTelemetry directo.</>,
      'Define permisos, estrategias de sampling y tokens.',
      'Guía por escenarios («data not in», «no access») y herramientas para validar la ingesta.',
    ],
  },
  {
    q: '¿Qué métricas hay?',
    a: [
      'Volumen (peticiones LLM), errores y tasas de éxito/fallo, latencia y tráfico por modelo.',
      'Tokens (input, completion, total), coste por modelo y guardrails.',
      <>Tres orígenes: atributos <C>gen_ai.*</C> de span · métricas nativas del proveedor · otras fuentes OTel o terceros.</>,
      'Vistas personalizables, con métricas basadas en DQL.',
    ],
  },
  {
    q: '¿Quién aplica los guardrails?',
    a: [
      <>El <A>proveedor</A>, durante la inferencia (p. ej. Amazon Bedrock Guardrails). Dynatrace no los ejecuta.</>,
      'Dynatrace instrumenta esas señales y las muestra de forma centralizada.',
      'Sobre ellas: alertas, notificaciones, tiles de dashboard y workflows.',
    ],
  },
  {
    q: '¿Soporta frameworks y protocolos de agentes?',
    a: [
      'Sí: Amazon Bedrock Strands y AgentCore, OpenAI agents, Gemini agents.',
      'SDKs como Google ADK, AWS Strands, AgentCore.',
      <>Protocolo <A>MCP</A> para monitorizar la comunicación multi-agente.</>,
    ],
  },
  {
    q: '¿Puedo crear alertas proactivas?',
    a: [
      'Sí, directamente en AI Observability, con campos pre-rellenados.',
      'Notificaciones integradas (Slack / email) y enlace de vuelta para investigar.',
      'Vista centralizada de todas las alertas que han creado tú y tus equipos.',
    ],
  },
  {
    q: '¿Y si ya uso los dashboards listos?',
    a: [
      'Siguen disponibles hasta que AI Observability sea GA, etiquetados y con navegación de vuelta a la app.',
      <>Recomendación: usar <A>AI Observability</A> como punto de entrada principal.</>,
      'Los dashboards solos pueden quedarse cortos o ser inconsistentes para flujos GenAI.',
    ],
  },
  {
    q: '¿Genera coste de consulta adicional?',
    a: [
      <>Algunos dashboards usan span queries que consumen <A>Traces powered by Grail - Query</A>, aunque no haya datos.</>,
      'Mitígalo con la variable de sampling, restringiendo dashboards exploratorios y prefiriendo tiles de métricas.',
      'Dynatrace trabaja en reducir este coste dejando de usar span queries.',
    ],
  },
];

function FAQ_() {
  const { here, b } = useScene();
  return (
    <>
      <Head on={here} eyebrow="// 16 · frequently-asked-questions" title="Preguntas frecuentes" />
      {QA.map((qa, i) => {
        const on = here && b === i;
        const out = here && b > i;
        return (
          <div key={i}>
            <Text on={on} out={out} y={TOP + 10} size={64} weight={600} w={1600}>{qa.q}</Text>
            <Bullets show={() => on} out={out} y={TOP + 170} size={36} gap={26} stagger={140} items={qa.a} />
          </div>
        );
      })}
    </>
  );
}

/** 16 FAQ — one question per beat. */
export const FAQ = () => <Scene index={15}><FAQ_ /></Scene>;
