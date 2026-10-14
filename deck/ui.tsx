import { Reveal, Terminal } from 'beatdeck';

/**
 * Deck-local building blocks. Every scene has the same grammar: a header (eyebrow + title), then one idea per
 * beat in the content area (x 150–1770, y ≥ 300). Positions are stage pixels.
 */

export const L = 150;          // left margin
export const R = 1770;         // right edge of the content area
export const W = R - L;        // content width
export const TOP = 300;        // first content row under the header

/** Scene header: eyebrow (`// 05 · get started`) + title. Stays for the whole scene. */
export function Head({ on, eyebrow, title }: { on: boolean; eyebrow: string; title: React.ReactNode }) {
  return (
    <>
      <Reveal on={on} x={L + 4} y={112}>
        <div className="t-eyebrow">{eyebrow}</div>
      </Reveal>
      <Reveal on={on} x={L} y={156} delay={80}>
        <div className="t-statement" style={{ fontSize: 84 }}>{title}</div>
      </Reveal>
    </>
  );
}

/** Accent span. */
export const A = ({ children }: { children: React.ReactNode }) => <span style={{ color: 'var(--accent)' }}>{children}</span>;
/** Inline code, keeps its case. */
export const C = ({ children }: { children: React.ReactNode }) => (
  <span className="mono keep-case" style={{ fontSize: '0.86em', color: 'var(--accent)' }}>{children}</span>
);

/** A block of prose that wraps inside `w`. */
export function Text({ on, out, x = L, y, w = W, size = 40, delay = 0, dim = false, weight = 500, children, style }: {
  on: boolean; out?: boolean; x?: number; y: number; w?: number; size?: number; delay?: number; dim?: boolean;
  weight?: number; children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <Reveal on={on} out={out} x={x} y={y} delay={delay}>
      <div className="t-editorial" style={{ width: w, fontSize: size, fontWeight: weight, lineHeight: 1.18, color: dim ? 'var(--ink-2)' : 'var(--ink)', ...style }}>
        {children}
      </div>
    </Reveal>
  );
}

/** Small mono label. */
export function Meta({ on, out, x = L, y, size = 24, delay = 0, children, color }: {
  on: boolean; out?: boolean; x?: number; y: number; size?: number; delay?: number; children: React.ReactNode; color?: string;
}) {
  return (
    <Reveal on={on} out={out} x={x} y={y} delay={delay}>
      <div className="t-meta" style={{ fontSize: size, color, whiteSpace: 'nowrap' }}>{children}</div>
    </Reveal>
  );
}

/** A bulleted list; item i shows when `show(i)`. */
export function Bullets({ items, show, out, x = L, y, w = W, size = 34, gap = 22, stagger = 90 }: {
  items: React.ReactNode[]; show: (i: number) => boolean; out?: boolean; x?: number; y: number; w?: number;
  size?: number; gap?: number; stagger?: number;
}) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, display: 'flex', flexDirection: 'column', gap }}>
      {items.map((it, i) => (
        <Reveal key={i} on={show(i)} out={out} delay={i * stagger}>
          <div style={{ display: 'flex', gap: 22, fontSize: size, lineHeight: 1.2, fontWeight: 450 }}>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', flex: 'none' }}>—</span>
            <span>{it}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export interface CardData { k?: string; t: React.ReactNode; d?: React.ReactNode }

/** A hairline card: small mono kind, title, optional description. Text wraps inside the box. */
export function Card({ on, out, x, y, w, h, k, t, d, hot = false, delay = 0, tSize = 34, dSize = 24 }: CardData & {
  on: boolean; out?: boolean; x: number; y: number; w: number; h: number; hot?: boolean; delay?: number;
  tSize?: number; dSize?: number;
}) {
  return (
    <Reveal on={on} out={out} x={x} y={y} delay={delay}>
      <div style={{
        width: w, height: h, boxSizing: 'border-box', padding: '22px 26px', overflow: 'hidden',
        border: `${hot ? 3 : 2}px solid ${hot ? 'var(--accent)' : 'var(--hair-strong)'}`, background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', gap: 10, transition: 'border-color 400ms',
      }}>
        {k && <div className="t-meta" style={{ fontSize: 19, color: hot ? 'var(--accent)' : 'var(--ink-3)' }}>{k}</div>}
        <div style={{ fontSize: tSize, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{t}</div>
        {d && <div style={{ fontSize: dSize, lineHeight: 1.3, color: 'var(--ink-2)' }}>{d}</div>}
      </div>
    </Reveal>
  );
}

/** A grid of cards filling the content area row by row. */
export function Grid({ on, out, items, cols, y = TOP + 40, h, gap = 28, x = L, w = W, tSize, dSize, hot, stagger = 80 }: {
  on: boolean; out?: boolean; items: CardData[]; cols: number; y?: number; h: number; gap?: number; x?: number;
  w?: number; tSize?: number; dSize?: number; hot?: (i: number) => boolean; stagger?: number;
}) {
  const cw = (w - gap * (cols - 1)) / cols;
  return (
    <>
      {items.map((it, i) => (
        <Card key={i} {...it} on={on} out={out} x={x + (i % cols) * (cw + gap)} y={y + Math.floor(i / cols) * (h + gap)}
          w={cw} h={h} tSize={tSize} dSize={dSize} hot={hot?.(i)} delay={i * stagger} />
      ))}
    </>
  );
}

/** A row of chips that wraps inside `w`. */
export function Chips({ on, out, items, x = L, y, w = W, size = 30, hot, stagger = 40 }: {
  on: boolean; out?: boolean; items: string[]; x?: number; y: number; w?: number; size?: number;
  hot?: (s: string) => boolean; stagger?: number;
}) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {items.map((s, i) => (
        <Reveal key={s} on={on} out={out} delay={i * stagger} rise={16}>
          <div style={{
            fontSize: size, fontWeight: 500, padding: '10px 20px', whiteSpace: 'nowrap',
            border: `2px solid ${hot?.(s) ? 'var(--accent)' : 'var(--hair-strong)'}`, color: hot?.(s) ? 'var(--accent)' : 'var(--ink)',
          }}>{s}</div>
        </Reveal>
      ))}
    </div>
  );
}

/** Code from deck/terminal.ts, framed, with no prompt (the source has none). */
export function Code({ on, out, lines, x = L, y, size = 24, delay = 0, label }: {
  on: boolean; out?: boolean; lines: string[]; x?: number; y: number; size?: number; delay?: number; label?: string;
}) {
  return (
    <Reveal on={on} out={out} x={x} y={y} delay={delay}>
      {label && <div className="t-meta" style={{ fontSize: 19, marginBottom: 12, color: 'var(--ink-3)' }}>{label}</div>}
      <Terminal lines={lines} size={size} prompt="" framed />
    </Reveal>
  );
}

/** A big statement on one or two lines. */
export function Big({ on, out, x = L, y, size = 120, delay = 0, children }: {
  on: boolean; out?: boolean; x?: number; y: number; size?: number; delay?: number; children: React.ReactNode;
}) {
  return (
    <Reveal on={on} out={out} x={x} y={y} delay={delay} ms={1000}>
      <div className="t-statement" style={{ fontSize: size, lineHeight: 0.98 }}>{children}</div>
    </Reveal>
  );
}

/** A two-column table (key → value) with hairlines. */
export function Table({ on, out, rows, x = L, y, w = W, kw = 560, size = 28, delay = 0, head }: {
  on: boolean; out?: boolean; rows: [React.ReactNode, React.ReactNode][]; x?: number; y: number; w?: number;
  kw?: number; size?: number; delay?: number; head?: [string, string];
}) {
  return (
    <Reveal on={on} out={out} x={x} y={y} delay={delay}>
      <div style={{ width: w, fontSize: size }}>
        {head && (
          <div style={{ display: 'flex', paddingBottom: 12, borderBottom: '2px solid var(--hair-strong)' }}>
            <div className="t-meta" style={{ width: kw, fontSize: 19, flex: 'none' }}>{head[0]}</div>
            <div className="t-meta" style={{ fontSize: 19 }}>{head[1]}</div>
          </div>
        )}
        {rows.map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', padding: '13px 0', borderBottom: '1px solid var(--hair)', lineHeight: 1.25 }}>
            <div className="mono keep-case" style={{ width: kw, flex: 'none', color: 'var(--accent)', fontSize: '0.86em', paddingRight: 24 }}>{k}</div>
            <div style={{ color: 'var(--ink)' }}>{v}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
