import { Reveal, Scene, useScene } from 'beatdeck';
import { A, Big, C, Chips, Grid, Head, L, Meta, Table, Text, TOP } from '../ui';

const STEPS = [
  { k: 'paso 1', t: 'Habilitar Python monitoring', d: 'Necesario para que OneAgent instrumente la app Python.' },
  { k: 'paso 2', t: 'Activar OneAgent features', d: 'Settings › Collect and capture › General monitoring settings › OneAgent features (filtrar por Python).' },
  { k: 'paso 3', t: 'Desplegar y enviar peticiones', d: 'Comprobar el proceso en Infrastructure & Operations › Explorer › Compute › Processes.' },
  { k: 'paso 4', t: 'Observar', d: 'AI Observability › Explorer: la app aparece como AI service tras la primera petición.' },
];

const FEATURES: { p: string; rows: [string, string][] }[] = [
  { p: 'AWS Bedrock', rows: [['Python AWS SDK Client', 'Required'], ['Python AWS SDK GenAI Bedrock', 'Required'], ['Python AWS SDK Bedrock prompt capture', 'Optional'], ['Python GenAI Langchain', 'Optional']] },
  { p: 'OpenAI', rows: [['Python OpenAI', 'Required'], ['Python OpenAI prompt capture', 'Optional'], ['Python GenAI Langchain', 'Optional']] },
  { p: 'LangChain', rows: [['Python GenAI Langchain', 'Required'], ['+ feature del proveedor subyacente', 'Bedrock / OpenAI'], ['+ prompt capture del proveedor', 'Optional']] },
];

function OneAgent_() {
  const { here, b } = useScene();
  const is = (k: number) => here && b === k;
  const past = (k: number) => here && b > k;
  return (
    <>
      <Head on={here} eyebrow="// 06 · get-started/oneagent" title="OneAgent" />

      {/* 06.1 zero code */}
      <Big on={is(0)} out={past(0)} y={TOP + 40} size={150}>Cero cambios<br />de código<A>.</A></Big>
      <Text on={is(0)} out={past(0)} y={680} size={38} dim delay={300} w={1500}>
        Con OneAgent en el host, Dynatrace captura atributos GenAI —modelo, tokens, latencia y contenido del prompt—
        sin librerías de instrumentación ni wrappers de SDK.
      </Text>
      <Meta on={is(0)} out={past(0)} y={900} delay={450}>Python AI SDKs: AWS Bedrock · OpenAI · LangChain · Dynatrace SaaS + DPS</Meta>

      {/* 06.2 steps */}
      <Grid on={is(1)} out={past(1)} items={STEPS} cols={4} h={420} tSize={34} dSize={25} />

      {/* 06.3 features per SDK */}
      {FEATURES.map((f, i) => (
        <Reveal key={f.p} on={is(2)} out={past(2)} x={L + i * 550} y={TOP + 20} delay={i * 140}>
          <div style={{ width: 510 }}>
            <div style={{ fontSize: 40, fontWeight: 600, paddingBottom: 16, borderBottom: '3px solid var(--accent)' }}>{f.p}</div>
            {f.rows.map(([n, r]) => (
              <div key={n} style={{ padding: '18px 0', borderBottom: '1px solid var(--hair)' }}>
                <div style={{ fontSize: 27, fontWeight: 500 }}>{n}</div>
                <div className="t-meta" style={{ fontSize: 19, marginTop: 6, color: r === 'Required' ? 'var(--accent)' : 'var(--ink-3)' }}>{r}</div>
              </div>
            ))}
          </div>
        </Reveal>
      ))}

      {/* 06.4 web framework + restart */}
      <Text on={is(3)} out={past(3)} y={TOP + 30} size={52} weight={600} w={1560}>
        Activa también el sensor de tu <A>web framework</A>
      </Text>
      <Chips on={is(3)} out={past(3)} y={TOP + 140} items={['Python FastAPI', 'Python Django', 'Python Flask']} size={34} />
      <Text on={is(3)} out={past(3)} y={TOP + 270} size={34} dim delay={250} w={1500}>
        Crea los spans HTTP de entrada bajo los que se anidan las llamadas al proveedor de IA: el trace distribuido queda completo.
      </Text>
      <Text on={is(3)} out={past(3)} y={TOP + 480} size={34} delay={400} w={1500}>
        Tras activar las features, <A>reinicia la aplicación Python</A> para que se carguen al arrancar el proceso.
      </Text>

      {/* 06.5 experimental sensors */}
      <Text on={is(4)} out={past(4)} y={TOP + 20} size={52} weight={600}>Sensores <A>experimentales</A></Text>
      <Chips on={is(4)} out={past(4)} y={TOP + 130} items={['Anthropic', 'Claude Agent SDK', 'Cohere', 'Groq', 'Mistral AI', 'Ollama', 'Google GenAI', 'CrewAI', 'Haystack']} size={34} />
      <Text on={is(4)} out={past(4)} y={TOP + 400} size={32} dim delay={350} w={1500}>
        Funcionales y entregados con calendario acelerado. Sin SLA de soporte; la recogida de atributos es best-effort
        y el esquema puede cambiar. Se activan buscando el proveedor en OneAgent features.
      </Text>

      {/* 06.6 what gets captured */}
      <Text on={is(5)} y={TOP + 20} size={40} w={1560}>
        El span HTTP de entrada contiene la llamada al proveedor como span hijo con los atributos GenAI:
      </Text>
      <Table on={is(5)} y={TOP + 130} kw={640} size={32} delay={200} rows={[
        ['gen_ai.provider', <>Proveedor (p. ej. <C>aws_bedrock</C> u <C>openai</C>)</>],
        ['gen_ai.model', 'Modelo usado en la petición'],
        ['gen_ai.usage.input_tokens', 'Tokens de entrada'],
        ['gen_ai.usage.output_tokens', 'Tokens de salida'],
      ]} />
      <Text on={is(5)} y={TOP + 520} size={32} dim delay={400} w={1560}>
        Prompt capture: hoy solo <A>AWS Bedrock</A> y <A>OpenAI</A> (también como modelo bajo LangChain). Habilítalo para ver el contenido en Explorer.
      </Text>
    </>
  );
}

/** 06 ONEAGENT — zero-code AI observability. */
export const OneAgent = () => <Scene index={5}><OneAgent_ /></Scene>;
