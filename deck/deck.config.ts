/**
 * Everything that may need changing five minutes before going on stage lives here.
 * After editing, rebuild (`npm run build` / `npm run present`).
 */
export const config = {
  title: 'AI Observability',
  /** One line under the title. Empty = none. */
  subtitle: 'Dynatrace · recorrido completo por la documentación',
  author: 'Daniel Espinoza Prado',
  /** Destination of the QR on the closing screen. "TODO" = no QR (the presenter view warns). Never guess it. */
  qrUrl: 'https://docs.dynatrace.com/docs/observe/dynatrace-for-ai-observability',
  /** Shown under the QR, e.g. "example.com/talk". */
  qrLabel: 'docs.dynatrace.com · AI Observability',
} as const;
