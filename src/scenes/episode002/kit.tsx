// Shared look and primitives for Episode 002 (submarine life support).
// Dark navy stage, restrained cyan (systems working / air / signals) and amber
// (heat / CO₂ / primary loop / warnings). All drawing is SVG in the caller's
// coordinate system; all motion is driven by frame-based progress values.
import React from "react";
import { AbsoluteFill } from "remotion";
import { easeInOut, progress } from "../../animations/timing";
import { fontFamily, palette } from "../../styles/theme";

export const K = {
  bg: "#050B16",
  bg2: "#0A1424",
  panel: "#0E1B2E",
  line: "#2A3D58",
  steel: "#5D738F",
  steelHi: "#93A9C4",
  muted: "#8FA3BC",
  ivory: palette.warmIvory,
  cyan: "#3FD3E3",
  cyanDim: "#1D7F8C",
  amber: "#F2A64A",
  amberDim: "#8A5A24",
  green: "#5FD39A",
} as const;

export const F = fontFamily;

// Clamped 0→1 progress over [start, start + dur] (local frames).
export const pr = (t: number, start: number, dur: number, ease = easeInOut) => progress(t, start, dur, ease);

// Deterministic pseudo-random in [0, 1).
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const Defs: React.FC = () => (
  <defs>
    <radialGradient id="e2vig" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stopColor="#0D1A2E" />
      <stop offset="100%" stopColor={K.bg} />
    </radialGradient>
    <linearGradient id="e2water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#0E2A44" />
      <stop offset="100%" stopColor="#040A14" />
    </linearGradient>
    <linearGradient id="e2hull" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#22344D" />
      <stop offset="100%" stopColor="#111C2D" />
    </linearGradient>
    <filter id="e2glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="e2soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="22" />
    </filter>
    <pattern id="e2grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0 L0 0 0 64" fill="none" stroke={K.ivory} strokeOpacity={0.035} strokeWidth={2} />
    </pattern>
  </defs>
);

// Full-frame SVG stage with vignette and faint technical grid.
export const Stage: React.FC<{
  w: number;
  h: number;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  grid?: boolean;
}> = ({ w, h, children, overlay, grid = true }) => (
  <AbsoluteFill style={{ backgroundColor: K.bg }}>
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ position: "absolute", inset: 0 }}>
      <Defs />
      <rect width={w} height={h} fill="url(#e2vig)" />
      {grid ? <rect width={w} height={h} fill="url(#e2grid)" /> : null}
      {children}
    </svg>
    {overlay}
  </AbsoluteFill>
);

export const T: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
  children: React.ReactNode;
  spacing?: number;
}> = ({ x, y, size = 30, color = K.ivory, weight = 600, anchor = "start", opacity = 1, children, spacing = 0 }) => (
  <text
    x={x}
    y={y}
    fontFamily={F}
    fontSize={size}
    fontWeight={weight}
    fill={color}
    textAnchor={anchor}
    opacity={opacity}
    letterSpacing={spacing}
  >
    {children}
  </text>
);

// Small framed note, e.g. "Amine scrubber · classic design".
export const Tag: React.FC<{
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: string;
  opacity?: number;
  anchor?: "start" | "middle" | "end";
}> = ({ x, y, text, size = 24, color = K.muted, opacity = 1, anchor = "start" }) => {
  const w = text.length * size * 0.52 + size * 1.2;
  const left = anchor === "start" ? x : anchor === "middle" ? x - w / 2 : x - w;
  return (
    <g opacity={opacity}>
      <rect x={left} y={y - size * 1.05} width={w} height={size * 1.55} rx={size * 0.35} fill={K.bg} fillOpacity={0.75} stroke={color} strokeOpacity={0.55} strokeWidth={2} />
      <T x={left + w / 2} y={y} size={size} color={color} weight={600} anchor="middle">
        {text}
      </T>
    </g>
  );
};

// Fact line with a source, rendered as a lower-third style plate.
export const Fact: React.FC<{
  x: number;
  y: number;
  text: string;
  source?: string;
  opacity?: number;
  size?: number;
  color?: string;
  anchor?: "start" | "middle";
}> = ({ x, y, text, source, opacity = 1, size = 34, color = K.ivory, anchor = "start" }) => (
  <g opacity={opacity}>
    <T x={x} y={y} size={size} color={color} weight={650} anchor={anchor}>
      {text}
    </T>
    {source ? (
      <T x={x} y={y + size * 1.15} size={size * 0.66} color={K.muted} weight={500} anchor={anchor}>
        {source}
      </T>
    ) : null}
  </g>
);

// Leader-line label pointing at (px, py).
export const Lead: React.FC<{
  px: number;
  py: number;
  lx: number;
  ly: number;
  text: string;
  color?: string;
  opacity?: number;
  size?: number;
}> = ({ px, py, lx, ly, text, color = K.cyan, opacity = 1, size = 28 }) => (
  <g opacity={opacity}>
    <circle cx={px} cy={py} r={6} fill={color} />
    <path d={`M${px} ${py} L${lx} ${ly}`} stroke={color} strokeWidth={2.5} opacity={0.8} />
    <T x={lx + (lx >= px ? 10 : -10)} y={ly + size * 0.35} size={size} color={K.ivory} anchor={lx >= px ? "start" : "end"}>
      {text}
    </T>
  </g>
);

export type RowState = 0 | 1 | 2;

// Threat checklist HUD: locked (0), active (1), solved (2).
export const Checklist: React.FC<{
  x: number;
  y: number;
  rows: { label: string; state: RowState }[];
  opacity?: number;
  scale?: number;
}> = ({ x, y, rows, opacity = 1, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <rect x={-16} y={-44} width={300} height={rows.length * 46 + 58} rx={14} fill={K.bg} fillOpacity={0.72} stroke={K.line} strokeWidth={2} />
    <T x={0} y={-12} size={20} color={K.muted} weight={700} spacing={3}>
      LIFE CHECKLIST
    </T>
    {rows.map((r, i) => {
      const c = r.state === 2 ? K.cyan : r.state === 1 ? K.amber : K.steel;
      return (
        <g key={r.label} transform={`translate(0 ${24 + i * 46})`}>
          <rect x={0} y={-16} width={22} height={22} rx={5} fill={r.state === 2 ? K.cyan : "none"} stroke={c} strokeWidth={2.5} opacity={r.state === 0 ? 0.55 : 1} />
          {r.state === 2 ? <path d="M5 -5 L10 1 L18 -11" stroke={K.bg} strokeWidth={3.5} fill="none" /> : null}
          <T x={38} y={2} size={26} color={r.state === 0 ? K.steel : K.ivory} weight={r.state === 1 ? 700 : 600}>
            {r.label}
          </T>
        </g>
      );
    })}
  </g>
);

export const CHECK_ROWS = ["Pressure", "Air", "Contaminants", "Position", "Stealth", "Contact"] as const;

// Builds checklist rows: rows before `active` solved, `active` highlighted, later locked.
export const checkRows = (active: number, extra?: { label: string; state: RowState }[], allSolved = false) => [
  ...CHECK_ROWS.map((label, i) => ({
    label,
    state: (allSolved || i < active ? 2 : i === active ? 1 : 0) as RowState,
  })),
  ...(extra ?? []),
];

// Generic attack-sub silhouette (not any specific class), drawn in a local box of
// width `w` with the hull axis at y = 0. Returns geometry helpers for slot placement.
export const subGeom = (w: number) => {
  const h = w * 0.105;
  const nose = w * 0.07;
  const tail = w * 0.2;
  const body = `M${-w / 2 + nose} ${-h / 2}
    L${w / 2 - tail} ${-h / 2}
    Q${w / 2 - tail * 0.35} ${-h * 0.42} ${w / 2} ${-h * 0.08}
    L${w / 2} ${h * 0.08}
    Q${w / 2 - tail * 0.35} ${h * 0.42} ${w / 2 - tail} ${h / 2}
    L${-w / 2 + nose} ${h / 2}
    Q${-w / 2} ${h / 2} ${-w / 2} 0
    Q${-w / 2} ${-h / 2} ${-w / 2 + nose} ${-h / 2} Z`;
  const sailX = -w * 0.2;
  const sail = `M${sailX - w * 0.045} ${-h / 2} L${sailX - w * 0.03} ${-h * 1.25} L${sailX + w * 0.045} ${-h * 1.25} L${sailX + w * 0.06} ${-h / 2} Z`;
  const fin = `M${w / 2 - w * 0.04} ${-h * 0.15} L${w / 2 - w * 0.015} ${-h * 0.75} L${w / 2 + w * 0.005} ${-h * 0.75} L${w / 2} ${-h * 0.1} Z`;
  return { h, body, sail, fin };
};

// Machine slots along the hull, as fractions of hull width (−0.5 … 0.5).
export const SLOTS = {
  sonar: -0.44,
  scrubber: -0.3,
  electrolyser: -0.22,
  cleaners: -0.14,
  analyser: -0.07,
  nav: -0.2,
  reactor: 0.08,
  turbine: 0.24,
} as const;

export type SlotName = keyof typeof SLOTS;

const SLOT_LABEL: Record<SlotName, string> = {
  sonar: "Sonar",
  scrubber: "CO₂ scrubber",
  electrolyser: "O₂ generator",
  cleaners: "Burner + filters",
  analyser: "Air analyser",
  nav: "Navigation",
  reactor: "Reactor",
  turbine: "Turbines",
};

export const SubCutaway: React.FC<{
  x: number;
  y: number;
  w: number;
  // 0→1 draw-on of the closed air loop.
  air?: number;
  // Air loop flow phase (frames).
  flow?: number;
  // 0→1 amount of amber exhaled CO₂ particles.
  breath?: number;
  // Machines lit (0→1 each).
  lit?: Partial<Record<SlotName, number>>;
  // 0→1 power bus from the turbines to every lit slot.
  bus?: number;
  labels?: number;
  tag?: number;
  opacity?: number;
}> = ({ x, y, w, air = 0, flow = 0, breath = 0, lit = {}, bus = 0, labels = 0, tag = 1, opacity = 1 }) => {
  const g = subGeom(w);
  const slotX = (s: SlotName) => SLOTS[s] * w;
  const loopY0 = -g.h * 0.22;
  const loopY1 = g.h * 0.22;
  const lx0 = -w * 0.38;
  const lx1 = -w * 0.02;
  const loopLen = 2 * (lx1 - lx0) + 2 * (loopY1 - loopY0);
  const particles = Array.from({ length: 36 }, (_, i) => i);
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <path d={g.sail} fill="url(#e2hull)" stroke={K.steel} strokeWidth={3} />
      <path d={g.fin} fill="url(#e2hull)" stroke={K.steel} strokeWidth={3} />
      <path d={g.body} fill="url(#e2hull)" stroke={K.steelHi} strokeWidth={3.5} />
      {/* Compartment bulkheads */}
      {[-0.36, -0.01, 0.16, 0.32].map((f) => (
        <line key={f} x1={f * w} y1={-g.h * 0.46} x2={f * w} y2={g.h * 0.46} stroke={K.line} strokeWidth={3} />
      ))}
      {/* Closed air loop through the forward compartment */}
      <rect
        x={lx0}
        y={loopY0}
        width={lx1 - lx0}
        height={loopY1 - loopY0}
        rx={18}
        fill="none"
        stroke={K.cyan}
        strokeWidth={4}
        pathLength={1}
        strokeDasharray={`${air} 2`}
        opacity={0.85}
      />
      {air > 0.98
        ? [0, 1, 2, 3, 4, 5].map((i) => {
            const d = (((flow * 3 + i * (loopLen / 6)) % loopLen) + loopLen) % loopLen;
            const top = lx1 - lx0;
            const side = loopY1 - loopY0;
            let px: number;
            let py: number;
            if (d < top) {
              px = lx0 + d;
              py = loopY0;
            } else if (d < top + side) {
              px = lx1;
              py = loopY0 + (d - top);
            } else if (d < 2 * top + side) {
              px = lx1 - (d - top - side);
              py = loopY1;
            } else {
              px = lx0;
              py = loopY1 - (d - 2 * top - side);
            }
            return <circle key={i} cx={px} cy={py} r={6} fill={K.cyan} filter="url(#e2glow)" />;
          })
        : null}
      {/* Exhaled CO₂ particles accumulating in the forward compartment */}
      {particles.map((i) => {
        const appear = i / particles.length;
        if (breath <= appear) {
          return null;
        }
        const px = lx0 + rnd(i) * (lx1 - lx0);
        const py = -g.h * 0.36 + rnd(i + 50) * g.h * 0.72;
        return <circle key={i} cx={px} cy={py + Math.sin(flow * 0.05 + i) * 4} r={4.5} fill={K.amber} opacity={0.75} />;
      })}
      {/* Machine slots */}
      {(Object.keys(SLOTS) as SlotName[]).map((s, idx) => {
        const v = lit[s] ?? 0;
        if (v <= 0) {
          return null;
        }
        const sx = slotX(s);
        const sy = s === "nav" ? -g.h * 0.85 : s === "sonar" ? 0 : g.h * 0.02;
        const color = s === "reactor" ? K.amber : K.cyan;
        const bw = s === "reactor" ? w * 0.07 : w * 0.045;
        const bh = s === "reactor" ? g.h * 0.55 : g.h * 0.32;
        return (
          <g key={s} opacity={v}>
            <rect x={sx - bw / 2} y={sy - bh / 2} width={bw} height={bh} rx={8} fill={K.panel} stroke={color} strokeWidth={3} filter="url(#e2glow)" />
            {labels > 0 ? (
              <>
                {s !== "nav" ? (
                  <line x1={sx} y1={g.h * 0.2} x2={sx} y2={idx % 2 ? g.h * 1.15 : g.h * 0.72} stroke={K.line} strokeWidth={2} opacity={labels} />
                ) : null}
                <T
                  x={sx}
                  y={s === "nav" ? -g.h * 1.45 : idx % 2 ? g.h * 1.42 : g.h * 0.98}
                  size={Math.max(18, w * 0.0135)}
                  color={K.ivory}
                  anchor="middle"
                  opacity={labels}
                >
                  {SLOT_LABEL[s]}
                </T>
              </>
            ) : null}
          </g>
        );
      })}
      {/* Power bus from turbines to lit machines */}
      {bus > 0
        ? (Object.keys(SLOTS) as SlotName[])
            .filter((s) => s !== "turbine" && (lit[s] ?? 0) > 0)
            .map((s, i) => {
              const sx = slotX(s);
              const tx = slotX("turbine");
              const yb = g.h * 0.36;
              const sy = s === "nav" ? -g.h * 0.85 : 0;
              const d = `M${tx} ${yb} L${sx} ${yb} L${sx} ${sy}`;
              const local = Math.max(0, Math.min(1, bus * 1.6 - i * 0.12));
              return <path key={s} d={d} fill="none" stroke={K.cyan} strokeWidth={3} pathLength={1} strokeDasharray={`${local} 2`} opacity={0.9} filter="url(#e2glow)" />;
            })
        : null}
      {tag > 0 ? <Tag x={-w / 2} y={-g.h * 1.6} text="Nuclear-powered" size={Math.max(20, w * 0.016)} opacity={tag} /> : null}
    </g>
  );
};

// Vertical gauge with an independent track.
export const Gauge: React.FC<{
  x: number;
  y: number;
  h: number;
  w?: number;
  value: number;
  color: string;
  label: string;
  band?: [number, number];
  opacity?: number;
  size?: number;
}> = ({ x, y, h, w = 70, value, color, label, band, opacity = 1, size = 30 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect x={-w / 2} y={0} width={w} height={h} rx={w / 2} fill={K.panel} stroke={K.line} strokeWidth={3} />
    {band ? <rect x={-w / 2 + 4} y={h * (1 - band[1])} width={w - 8} height={h * (band[1] - band[0])} fill={K.green} opacity={0.18} /> : null}
    <rect x={-w / 2 + 8} y={h * (1 - value) + 4} width={w - 16} height={Math.max(0, h * value - 8)} rx={(w - 16) / 2} fill={color} opacity={0.9} filter="url(#e2glow)" />
    <T x={0} y={h + size * 1.4} size={size} color={K.ivory} anchor="middle" weight={700}>
      {label}
    </T>
  </g>
);

// Molecule glyphs (ball style).
export const Mol: React.FC<{ kind: "H2O" | "O2" | "H2" | "CO2" | "CO"; x: number; y: number; s?: number; opacity?: number }> = ({
  kind,
  x,
  y,
  s = 1,
  opacity = 1,
}) => {
  const O = (cx: number, cy: number, k: number) => <circle key={`o${k}`} cx={cx} cy={cy} r={14 * s} fill="#E25F5F" />;
  const Hh = (cx: number, cy: number, k: number) => <circle key={`h${k}`} cx={cx} cy={cy} r={9 * s} fill={K.ivory} />;
  const Cc = (cx: number, cy: number, k: number) => <circle key={`c${k}`} cx={cx} cy={cy} r={13 * s} fill="#4A4F5A" stroke={K.steel} strokeWidth={1.5} />;
  const parts: React.ReactNode[] = [];
  if (kind === "H2O") {
    parts.push(Hh(-15 * s, 11 * s, 1), Hh(15 * s, 11 * s, 2), O(0, 0, 1));
  } else if (kind === "O2") {
    parts.push(O(-11 * s, 0, 1), O(11 * s, 0, 2));
  } else if (kind === "H2") {
    parts.push(Hh(-7 * s, 0, 1), Hh(7 * s, 0, 2));
  } else if (kind === "CO2") {
    parts.push(O(-22 * s, 0, 1), O(22 * s, 0, 2), Cc(0, 0, 1));
  } else {
    parts.push(Cc(-9 * s, 0, 1), O(11 * s, 0, 1));
  }
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      {parts}
    </g>
  );
};
