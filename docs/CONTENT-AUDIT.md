# Content audit — AI Observability

Source: `reference/source.md` — texto extraído (14/10/2026) de las 21 páginas de
https://docs.dynatrace.com/docs/observe/dynatrace-for-ai-observability (según el sitemap de la documentación).
Design reference: tema neutral de beatdeck.
Rule: the source decides **what** is said; the design reference decides **how** it looks and moves.

## Facts (never guess)

| Fact | Value | Source |
| --- | --- | --- |
| Title | AI Observability · Dynatrace | página overview |
| Speaker / role | Daniel Espinoza Prado | cuenta del usuario (confirmar) |
| Event · city · date | — | no indicado |
| QR target | https://docs.dynatrace.com/docs/observe/dynatrace-for-ai-observability | URL dada por el usuario |

## Docs page → beat mapping

| Página | Beat(s) | Status | Notes |
| --- | --- | --- | --- |
| overview | 1.2, 3.1–3.7 | kept | definición, métricas clave, capacidades, casos de uso, capas del stack, dogfooding |
| (árbol de la sección) | 2.1 | new | mapa de navegación de la charla |
| terms-and-concepts | 4.1–4.8 | kept | RAG, agentes, guardrails, evals (4 tipos), traces, traceloop.span.kind, semconv |
| get-started | 5.1–5.7 | kept | + "cloud monitoring" y "OpenLLMetry" de ai-observability-app › Get started |
| get-started/oneagent | 6.1–6.6 | kept | tablas de features por SDK, sensores experimentales, atributos capturados |
| get-started/openinference | 7.1–7.7 | kept | 3 caminos, Collector vs OpenPipeline, mapeo (extracto), privacidad, samples. Pasos docker/Windows CMD resumidos, no mostrados literalmente |
| get-started/opentelemetry | 8.1–8.3 | kept | snippet Python literal (omitidas 3 líneas de argumentos de la llamada); variante Node.js no mostrada |
| get-started/openllmetry | 8.4–8.6 | kept | init + decoradores literales; ejemplo LangChain completo resumido |
| integrations/microsoft-agent-framework | 9.1–9.5 | kept | app.py completo no mostrado (resumido) |
| ai-observability-app | 10.1–10.10 | kept | las 5 pestañas, alertas, traces, coste de consulta, roadmap |
| agent-evaluations + llm-judge-evaluation | 11.1–11.8 | kept | flujo, evaluadores, CLI, YAML (extracto), UI manual, revisión, DQL |
| integrations | 12.1–12.6 | kept | 57 = recuento propio de la lista de la página (7 categorías) |
| metrics-reference | 13.1–13.7 | kept | tablas de atributos por métrica resumidas; requirement levels de core attributes |
| sample-use-cases (+6 subpáginas) | 14.1–15.6 | kept | YAML de Helm, manifiestos K8s y código RAG completo resumidos |
| frequently-asked-questions | 16.1–16.7 | kept | scopes de dt-evals y PII movidos a 11.5/11.8 |
| — | 17.1 | new | resumen; no añade afirmaciones |

## Notas de fidelidad

- 5.8–5.9 (nuevos): comparación OneAgent vs OpenTelemetry con datos de oneagent, opentelemetry y openinference, y unión de ambos según el caso end-to-end-observability ("OneAgent complements this…"). OpenInference es el recomendado *dentro* de OTel, no frente a OneAgent; las etiquetas de 5.x y 7.1 lo dejan explícito.

- Todo el código en pantalla sale de `deck/terminal.ts`, copiado literal de la fuente (verify `--source` lo comprueba).
- 4.6 (waterfall) es **ilustrativo**: nombres de operación del mapeo OpenInference → `gen_ai.operation.name`; duraciones inventadas a propósito, sin valores.
- "14 evaluadores" (FAQ); el overview dice "más de 10". Se usa el número concreto.
- La traducción al español es mía; términos técnicos y nombres de producto se mantienen en inglés.

## Open questions

- [ ] ¿Ponente, evento y fecha correctos?
- [ ] ¿Se quiere tema claro (sala iluminada / stream) o colores de marca Dynatrace?
- [ ] ¿Capturas reales de la app (Overview, Explorer, Agents topology)? No se usaron: las imágenes de la documentación no son nuestras.

## Decisions taken on the speaker's behalf

- Autor = nombre del titular de la cuenta; idioma español; tema neutral oscuro.
- Orden de la charla = orden lógico de la documentación (concepto → ingesta → app → calidad → referencia → casos → FAQ).
- QR → página principal de la documentación.
