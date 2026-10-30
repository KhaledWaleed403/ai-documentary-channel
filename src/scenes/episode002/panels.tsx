// Mechanism diagrams for Episode 002. Each panel draws in its own local box
// (origin at its centre unless noted) and takes 0→1 progress props, so the
// long-form (16:9) and the Shorts (9:16) place the same diagram at any size.
import React from "react";
import { K, Mol, T, Tag, rnd } from "./kit";

const clamp = (v: number) => Math.max(0, Math.min(1, v));

// ---------- Hatch ----------
export const Hatch: React.FC<{ x: number; y: number; r: number; close: number; seal: number }> = ({ x, y, r, close, seal }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r * 1.18} fill="#0A1322" stroke={K.steel} strokeWidth={6} />
    <circle r={r} fill="url(#e2hull)" stroke={K.steelHi} strokeWidth={5} />
    <circle r={r * 1.18} fill="none" stroke={K.amber} strokeWidth={4} opacity={0.25 + 0.6 * seal} filter="url(#e2glow)" />
    <g transform={`rotate(${close * 220})`}>
      <circle r={r * 0.42} fill="none" stroke={K.steelHi} strokeWidth={14} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1={0} y1={0} x2={r * 0.42 * Math.cos((a * Math.PI) / 180)} y2={r * 0.42 * Math.sin((a * Math.PI) / 180)} stroke={K.steelHi} strokeWidth={10} />
      ))}
      <circle r={r * 0.09} fill={K.steel} />
    </g>
    {[0, 90, 180, 270].map((a) => (
      <rect
        key={a}
        x={r * (1.02 - 0.12 * seal)}
        y={-14}
        width={r * 0.22}
        height={28}
        rx={6}
        fill={K.steel}
        transform={`rotate(${a})`}
      />
    ))}
  </g>
);

// ---------- Depth ruler (+1 atm per ~10 m of seawater) ----------
export const DepthRuler: React.FC<{ x: number; y: number; h: number; depth: number; ticks?: number; size?: number }> = ({
  x,
  y,
  h,
  depth,
  ticks = 8,
  size = 26,
}) => {
  const step = h / ticks;
  const reached = Math.floor(depth * ticks + 0.0001);
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1={0} y1={0} x2={0} y2={h} stroke={K.steel} strokeWidth={4} />
      <line x1={-30} y1={0} x2={30} y2={0} stroke={K.cyan} strokeWidth={4} />
      <T x={40} y={8} size={size} color={K.cyan}>
        surface · 1 atm
      </T>
      {Array.from({ length: ticks }, (_, i) => {
        const on = i < reached;
        const ty = (i + 1) * step;
        return (
          <g key={i} opacity={on ? 1 : 0.3}>
            <line x1={-18} y1={ty} x2={18} y2={ty} stroke={on ? K.ivory : K.steel} strokeWidth={3} />
            <T x={-28} y={ty + size * 0.35} size={size * 0.85} color={K.muted} anchor="end">
              {`${(i + 1) * 10} m`}
            </T>
            <T x={28} y={ty + size * 0.35} size={size * 0.85} color={on ? K.amber : K.steel}>
              {`+${i + 1} atm`}
            </T>
          </g>
        );
      })}
      <circle cx={0} cy={depth * h} r={10} fill={K.amber} filter="url(#e2glow)" />
    </g>
  );
};

// ---------- Pressure hull cross-section + ring-framed tube ----------
export const HullSection: React.FC<{ x: number; y: number; r: number; arrows: number; frames: number; t: number }> = ({
  x,
  y,
  r,
  arrows,
  frames,
  t,
}) => {
  const n = 16;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Cross-section: dimmed outer fairing, highlighted pressure hull */}
      <ellipse rx={r * 1.28} ry={r * 1.2} fill="none" stroke={K.steel} strokeWidth={3} strokeDasharray="10 10" opacity={0.45} />
      <circle r={r} fill="#0C1729" stroke={K.cyan} strokeWidth={10} filter="url(#e2glow)" />
      <circle r={r * 0.88} fill="none" stroke={K.cyanDim} strokeWidth={6} opacity={0.4 + 0.6 * frames} />
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        const push = 8 * Math.sin(t * 0.12 + i);
        const r0 = r * 1.85 - push;
        const r1 = r * 1.25;
        return (
          <g key={i} opacity={arrows}>
            <line x1={Math.cos(a) * r0} y1={Math.sin(a) * r0} x2={Math.cos(a) * r1} y2={Math.sin(a) * r1} stroke={K.amber} strokeWidth={5} />
            <path
              d={`M${Math.cos(a) * r1} ${Math.sin(a) * r1} L${Math.cos(a + 0.06) * (r1 + 24)} ${Math.sin(a + 0.06) * (r1 + 24)} L${Math.cos(a - 0.06) * (r1 + 24)} ${Math.sin(a - 0.06) * (r1 + 24)} Z`}
              fill={K.amber}
            />
          </g>
        );
      })}
      <T x={0} y={r * 0.12} size={r * 0.17} color={K.ivory} anchor="middle" weight={700} opacity={frames}>
        Pressure hull
      </T>
      <T x={0} y={r * 0.32} size={r * 0.11} color={K.muted} anchor="middle" opacity={frames}>
        ring frames inside
      </T>
    </g>
  );
};

export const FramedTube: React.FC<{ x: number; y: number; w: number; h: number; frames: number }> = ({ x, y, w, h, frames }) => {
  const count = 9;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="url(#e2hull)" stroke={K.steelHi} strokeWidth={4} />
      {Array.from({ length: count }, (_, i) => {
        const fx = -w / 2 + h / 2 + ((w - h) * (i + 0.5)) / count;
        const on = clamp(frames * count - i);
        return <ellipse key={i} cx={fx} cy={0} rx={h * 0.12} ry={h / 2 - 4} fill="none" stroke={K.cyan} strokeWidth={5} opacity={0.15 + 0.85 * on} filter={on > 0.5 ? "url(#e2glow)" : undefined} />;
      })}
    </g>
  );
};

// ---------- Amine scrubber: absorb → heat → release overboard ----------
export const Scrubber: React.FC<{ x: number; y: number; s?: number; t: number; absorb: number; heat: number; vent: number; ts?: number }> = ({
  x,
  y,
  s = 1,
  t,
  absorb,
  heat,
  vent,
  ts = 1,
}) => {
  const bedW = 340;
  const bedH = 220;
  const stuck = Array.from({ length: 22 }, (_, i) => i);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Cabin air in */}
      <path d="M-560 0 L-190 0" stroke={K.cyan} strokeWidth={6} />
      {[0, 1, 2, 3].map((i) => {
        const px = -560 + ((t * 4 + i * 95) % 370);
        return <Mol key={i} kind="CO2" x={px} y={-2} s={0.7} opacity={absorb > 0.05 ? 1 : 0} />;
      })}
      <T x={-560} y={-40} size={28 * ts} color={K.muted}>
        cabin air
      </T>
      {/* Amine bed */}
      <rect x={-bedW / 2} y={-bedH / 2} width={bedW} height={bedH} rx={20} fill={K.panel} stroke={heat > 0.05 ? K.amber : K.cyan} strokeWidth={5} />
      <rect x={-bedW / 2} y={-bedH / 2} width={bedW} height={bedH} rx={20} fill={K.amber} opacity={0.28 * heat} filter="url(#e2soft)" />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={-bedW / 2 + 24 + (i % 10) * 32} cy={-bedH / 2 + 30 + Math.floor(i / 10) * 52} r={7} fill={K.cyanDim} opacity={0.7} />
      ))}
      {stuck.map((i) => {
        const on = clamp(absorb * stuck.length - i);
        const leave = clamp(heat * 1.4 - i / stuck.length);
        const bx = -bedW / 2 + 30 + rnd(i) * (bedW - 60);
        const by = -bedH / 2 + 30 + rnd(i + 9) * (bedH - 60);
        // Released CO₂ rises to the outlet pipe, then travels along it to the compressor.
        const up = clamp(leave * 2);
        const along = clamp(leave * 2 - 1);
        const mx = up < 1 ? bx + (0 - bx) * up : 380 * along;
        const my = up < 1 ? by + (-260 - by) * up : -260;
        return <Mol key={i} kind="CO2" x={mx} y={my} s={0.55} opacity={on * (1 - clamp(along * 3 - 2))} />;
      })}
      <T x={0} y={bedH / 2 + 46} size={32 * ts} color={K.ivory} anchor="middle" weight={700}>
        Amine scrubber
      </T>
      <T x={0} y={bedH / 2 + 84} size={24 * ts} color={K.muted} anchor="middle">
        {heat > 0.3 ? "heated: amine releases the CO₂" : "amine grabs CO₂"}
      </T>
      {/* Clean air out */}
      <path d="M190 0 L560 0" stroke={K.cyan} strokeWidth={6} opacity={absorb} />
      <T x={560} y={-40} size={28 * ts} color={K.cyan} anchor="end" opacity={absorb}>
        cleaner air back
      </T>
      {/* Release path: compress overboard */}
      <path d={`M0 ${-bedH / 2} L0 -260 L380 -260`} stroke={K.amber} strokeWidth={6} fill="none" pathLength={1} strokeDasharray={`${vent} 2`} />
      <rect x={380} y={-300} width={130} height={80} rx={12} fill={K.panel} stroke={K.amber} strokeWidth={4} opacity={vent} />
      <T x={445} y={-250} size={22 * ts} color={K.ivory} anchor="middle" opacity={vent}>
        compressor
      </T>
      <T x={445} y={-322} size={26 * ts} color={K.amber} anchor="middle" weight={700} opacity={vent}>
        CO₂ → overboard
      </T>
    </g>
  );
};

// ---------- Electrolyser: 2 H₂O → O₂ + 2 H₂ ----------
export const Electrolyser: React.FC<{ x: number; y: number; s?: number; t: number; split: number; o2: number; h2: number; ts?: number }> = ({
  x,
  y,
  s = 1,
  t,
  split,
  o2,
  h2,
  ts = 1,
}) => {
  const sp = clamp(split);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Generic internal water feed (purity deliberately unspecified) */}
      <path d="M-520 120 L-200 120" stroke={K.steelHi} strokeWidth={8} />
      <T x={-520} y={90} size={26 * ts} color={K.muted}>
        water feed
      </T>
      <rect x={-200} y={-150} width={400} height={300} rx={24} fill={K.panel} stroke={K.cyan} strokeWidth={5} />
      {/* Electrodes */}
      <rect x={-130} y={-110} width={20} height={220} fill={K.steelHi} />
      <rect x={110} y={-110} width={20} height={220} fill={K.steelHi} />
      <T x={-120} y={-122} size={24 * ts} color={K.amber} anchor="middle">
        −
      </T>
      <T x={120} y={-122} size={24 * ts} color={K.amber} anchor="middle">
        +
      </T>
      {/* Current spark */}
      <path d={`M-110 ${-60 + 8 * Math.sin(t * 0.6)} Q0 ${-90 + 20 * Math.sin(t * 0.3)} 110 -60`} stroke={K.amber} strokeWidth={3} fill="none" opacity={0.5 + 0.4 * Math.sin(t * 0.8)} />
      {/* Two water molecules splitting into one O₂ and two H₂ */}
      <Mol kind="H2O" x={-30} y={40} s={1.2} opacity={1 - sp} />
      <Mol kind="H2O" x={40} y={40} s={1.2} opacity={1 - sp} />
      <Mol kind="O2" x={60 + 20 * sp} y={40 - 70 * sp} s={1.1} opacity={sp} />
      <Mol kind="H2" x={-60 - 20 * sp} y={40 - 70 * sp} s={1.2} opacity={sp} />
      <Mol kind="H2" x={-60 - 20 * sp} y={40 + 30 * sp} s={1.2} opacity={sp} />
      <T x={0} y={200} size={34 * ts} color={K.ivory} anchor="middle" weight={700}>
        2 H₂O → O₂ + 2 H₂
      </T>
      {/* Oxygen into cabin air */}
      <path d="M130 -150 L130 -260 L520 -260" stroke={K.cyan} strokeWidth={6} fill="none" pathLength={1} strokeDasharray={`${o2} 2`} />
      {o2 > 0.6
        ? [0, 1, 2].map((i) => <Mol key={i} kind="O2" x={160 + ((t * 5 + i * 120) % 340)} y={-262} s={0.6} />)
        : null}
      <T x={520} y={-290} size={28 * ts} color={K.cyan} anchor="end" weight={700} opacity={o2}>
        oxygen → cabin air
      </T>
      {/* Hydrogen out through the hull */}
      <path d="M-130 -150 L-130 -300 L-470 -300" stroke={K.steelHi} strokeWidth={6} fill="none" pathLength={1} strokeDasharray={`${h2} 2`} />
      <rect x={-500} y={-340} width={18} height={80} fill={K.steel} opacity={h2} />
      {h2 > 0.6
        ? [0, 1, 2, 3].map((i) => <Mol key={i} kind="H2" x={-150 - ((t * 5 + i * 85) % 320)} y={-302} s={0.6} />)
        : null}
      <T x={-520} y={-360} size={28 * ts} color={K.ivory} weight={700} opacity={h2}>
        hydrogen → sea (US subs)
      </T>
      <T x={-520} y={-250} size={22 * ts} color={K.muted} opacity={h2}>
        hull
      </T>
    </g>
  );
};

// ---------- Burner + charcoal filter ----------
export const Cleaners: React.FC<{ x: number; y: number; s?: number; t: number; burner: number; filter: number }> = ({ x, y, s = 1, t, burner, filter }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-620 0 L620 0" stroke={K.cyan} strokeWidth={6} opacity={0.6} />
    <g opacity={burner}>
      <rect x={-420} y={-110} width={280} height={220} rx={22} fill={K.panel} stroke={K.amber} strokeWidth={5} />
      <rect x={-400} y={-30} width={240} height={60} rx={10} fill={K.amber} opacity={0.25 + 0.1 * Math.sin(t * 0.3)} filter="url(#e2soft)" />
      {[0, 1, 2].map((i) => {
        const px = -600 + ((t * 4 + i * 70) % 200);
        return <Mol key={`co${i}`} kind={i % 2 ? "H2" : "CO"} x={px} y={-40 + i * 40} s={0.7} />;
      })}
      <T x={-280} y={160} size={30} color={K.ivory} anchor="middle" weight={700}>
        Catalytic burner
      </T>
      <T x={-280} y={196} size={23} color={K.muted} anchor="middle">
        removes CO + H₂
      </T>
    </g>
    <g opacity={filter}>
      <rect x={140} y={-110} width={280} height={220} rx={22} fill={K.panel} stroke={K.steelHi} strokeWidth={5} />
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={160 + (i % 6) * 42} y={-90 + Math.floor(i / 6) * 48} width={30} height={30} rx={6} fill="#1E2532" stroke="#3A4250" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => {
        const caught = clamp(filter * 5 - i);
        return <circle key={i} cx={20 + caught * (180 + i * 30)} cy={-60 + i * 30} r={10} fill={K.muted} opacity={0.55 * (1 - caught * 0.4)} />;
      })}
      <T x={280} y={160} size={30} color={K.ivory} anchor="middle" weight={700}>
        Activated charcoal
      </T>
      <T x={280} y={196} size={23} color={K.muted} anchor="middle">
        soaks up odours + vapours
      </T>
    </g>
  </g>
);

// ---------- Air monitoring HUD ----------
const TILES = ["O₂", "CO₂", "H₂", "CO", "H₂O"];
export const AirHud: React.FC<{ x: number; y: number; s?: number; tiles: number; climate: number; t: number }> = ({ x, y, s = 1, tiles, climate, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-470} y={-130} width={940} height={climate > 0 ? 400 : 230} rx={22} fill={K.bg} fillOpacity={0.8} stroke={K.line} strokeWidth={3} />
    <T x={-440} y={-88} size={24} color={K.muted} weight={700} spacing={3}>
      CENTRAL ATMOSPHERE MONITORING
    </T>
    {TILES.map((name, i) => {
      const on = clamp(tiles * TILES.length - i);
      const tx = -440 + i * 180;
      return (
        <g key={name} opacity={on}>
          <rect x={tx} y={-60} width={160} height={150} rx={14} fill={K.panel} stroke={K.cyan} strokeWidth={3} />
          <T x={tx + 80} y={0} size={40} color={K.ivory} anchor="middle" weight={700}>
            {name}
          </T>
          <path
            d={Array.from({ length: 12 }, (_, k) => `${k ? "L" : "M"}${tx + 16 + k * 11.5} ${50 + 10 * Math.sin(t * 0.08 + k * 0.9 + i)}`).join(" ")}
            stroke={K.cyan}
            strokeWidth={3}
            fill="none"
          />
          <T x={tx + 80} y={78} size={18} color={K.muted} anchor="middle">
            sampling
          </T>
        </g>
      );
    })}
    {climate > 0 ? (
      <g opacity={climate}>
        <rect x={-440} y={120} width={880} height={120} rx={14} fill={K.panel} stroke={K.amber} strokeWidth={3} />
        <T x={-410} y={170} size={30} color={K.ivory} weight={700}>
          Design target ≈ 80°F (27°C) · 50% RH
        </T>
        <T x={-410} y={212} size={22} color={K.muted}>
          US attack submarine living spaces (NRC, 2007)
        </T>
      </g>
    ) : null}
  </g>
);

// ---------- GPS beams stopping at the surface (side view) ----------
export const GpsSurface: React.FC<{ x: number; y: number; w: number; h: number; beams: number; t: number }> = ({ x, y, w, h, beams, t }) => {
  const surface = h * 0.38;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={surface} width={w} height={h - surface} fill="url(#e2water)" />
      <path
        d={Array.from({ length: 40 }, (_, k) => `${k ? "L" : "M"}${(k * w) / 39} ${surface + 5 * Math.sin(t * 0.08 + k * 0.7)}`).join(" ")}
        stroke={K.cyan}
        strokeWidth={3}
        fill="none"
        opacity={0.7}
      />
      {/* Satellite */}
      <g transform={`translate(${w * 0.5} ${h * 0.06})`}>
        <rect x={-26} y={-16} width={52} height={32} rx={6} fill={K.steelHi} />
        <rect x={-110} y={-10} width={70} height={20} fill={K.cyanDim} />
        <rect x={40} y={-10} width={70} height={20} fill={K.cyanDim} />
      </g>
      {[-0.28, -0.1, 0.1, 0.28].map((dx, i) => {
        const x2 = w * (0.5 + dx * 1.5);
        const len = surface - h * 0.06;
        const into = 30;
        return (
          <g key={i} opacity={beams}>
            <line x1={w * 0.5} y1={h * 0.06} x2={x2} y2={surface} stroke={K.cyan} strokeWidth={3} strokeDasharray="10 8" strokeDashoffset={-t * 2} />
            <line x1={x2} y1={surface} x2={x2 + (x2 - w * 0.5) * (into / len)} y2={surface + into} stroke={K.cyan} strokeWidth={3} opacity={0.35} />
            <T x={x2} y={surface + 62} size={26} color={K.amber} anchor="middle" weight={700}>
              ✕
            </T>
          </g>
        );
      })}
    </g>
  );
};

// ---------- Top-down navigation: dead reckoning + uncertainty + fixes ----------
export const NavMap: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  path: number;
  cone: number;
  fix: number;
  fixKind: "none" | "gps" | "seafloor";
  t: number;
  size?: number;
  // Clip drawing to the map frame (Shorts); the long-form v1 render predates this.
  clip?: boolean;
}> = ({ x, y, w, h, path, cone, fix, fixKind, t, size = 26, clip = false }) => {
  const pts = Array.from({ length: 9 }, (_, i) => [w * (0.08 + i * 0.105), h * (0.62 - 0.22 * Math.sin(i * 0.7))] as const);
  const n = Math.max(1, Math.floor(path * (pts.length - 1)));
  const frac = path * (pts.length - 1) - n + 1;
  const head = (() => {
    const a = pts[Math.min(n - 1, pts.length - 2)];
    const b = pts[Math.min(n, pts.length - 1)];
    const f = clamp(frac);
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f] as const;
  })();
  const coneR = 14 + 120 * cone * (1 - fix * 0.88);
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={`e2nav${x}${y}`}>
        <rect width={w} height={h} rx={20} />
      </clipPath>
      <rect width={w} height={h} rx={20} fill="#06111F" stroke={K.line} strokeWidth={3} />
      <g clipPath={clip ? `url(#e2nav${x}${y})` : undefined}>
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`g${i}`} x1={0} y1={(h * (i + 1)) / 8} x2={w} y2={(h * (i + 1)) / 8} stroke={K.line} strokeWidth={1} opacity={0.5} />
      ))}
      {/* Seafloor contour (used for the seafloor-matching example) */}
      <path
        d={Array.from({ length: 30 }, (_, k) => `${k ? "L" : "M"}${(k * w) / 29} ${h * 0.86 + 18 * Math.sin(k * 0.55) + 10 * Math.sin(k * 1.3)}`).join(" ")}
        stroke={K.steel}
        strokeWidth={3}
        fill="none"
        opacity={fixKind === "seafloor" ? 1 : 0.35}
      />
      {fixKind === "seafloor" ? (
        <path
          d={Array.from({ length: 30 }, (_, k) => `${k ? "L" : "M"}${(k * w) / 29 + (1 - fix) * 60} ${h * 0.86 + 18 * Math.sin(k * 0.55) + 10 * Math.sin(k * 1.3)}`).join(" ")}
          stroke={K.cyan}
          strokeWidth={3}
          fill="none"
          strokeDasharray="8 6"
        />
      ) : null}
      <path
        d={pts
          .slice(0, n + 1)
          .map((p, i) => `${i ? "L" : "M"}${i === n ? head[0] : p[0]} ${i === n ? head[1] : p[1]}`)
          .join(" ")}
        stroke={K.cyan}
        strokeWidth={5}
        fill="none"
        filter="url(#e2glow)"
      />
      <ellipse cx={head[0]} cy={head[1]} rx={coneR * 1.3} ry={coneR} fill={K.amber} fillOpacity={0.14} stroke={K.amber} strokeWidth={3} strokeDasharray="10 8" opacity={cone > 0 ? 1 : 0} />
      <circle cx={head[0]} cy={head[1]} r={12} fill={K.ivory} />
      </g>
      {fixKind === "gps" && fix > 0 ? (
        <line x1={head[0]} y1={head[1]} x2={head[0]} y2={-40} stroke={K.cyan} strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-t * 2} opacity={fix} />
      ) : null}
      <T x={20} y={h - 18} size={size * 0.8} color={K.muted}>
        Uncertainty grows
      </T>
    </g>
  );
};

// Gyro and accelerometer glyphs.
export const InertialGlyphs: React.FC<{ x: number; y: number; t: number; on: number; size?: number }> = ({ x, y, t, on, size = 28 }) => (
  <g transform={`translate(${x} ${y})`} opacity={on}>
    <g>
      <circle r={52} fill="none" stroke={K.cyan} strokeWidth={4} />
      <ellipse rx={52} ry={18} fill="none" stroke={K.cyan} strokeWidth={3} transform={`rotate(${t * 3})`} />
      <ellipse rx={18} ry={52} fill="none" stroke={K.cyanDim} strokeWidth={3} transform={`rotate(${t * 2})`} />
      <T x={0} y={92} size={size} color={K.ivory} anchor="middle">
        gyroscope: turns
      </T>
    </g>
    <g transform="translate(0 220)">
      <rect x={-60} y={-30} width={120} height={60} rx={10} fill="none" stroke={K.cyan} strokeWidth={4} />
      <circle cx={20 * Math.sin(t * 0.15)} cy={0} r={16} fill={K.cyan} />
      <T x={0} y={72} size={size} color={K.ivory} anchor="middle">
        accelerometer: pushes
      </T>
    </g>
  </g>
);

// ---------- Sound in water ----------
export const SoundRings: React.FC<{ x: number; y: number; w: number; t: number; low: number; high: number; size?: number; labelX?: number; labelY?: number }> = ({
  x,
  y,
  w,
  t,
  low,
  high,
  size = 28,
  labelX = w * 0.62,
  labelY = -w * 0.38,
}) => (
  <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2, 3, 4].map((i) => {
      const r = ((t * 4 + i * (w / 5)) % w) + 10;
      const fade = 1 - r / w;
      return <circle key={`l${i}`} r={r} fill="none" stroke={K.amber} strokeWidth={10} opacity={low * (0.25 + 0.6 * fade)} />;
    })}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const r = ((t * 4 + i * 40) % 280) + 6;
      const fade = Math.max(0, 1 - r / 220);
      return <circle key={`h${i}`} r={r} fill="none" stroke={K.cyan} strokeWidth={3} opacity={high * fade} />;
    })}
    <circle r={14} fill={K.ivory} />
    <T x={labelX} y={labelY} size={size} color={K.amber} weight={700} opacity={low}>
      low frequency: travels far
    </T>
    <T x={labelX} y={labelY + size * 1.4} size={size} color={K.cyan} weight={700} opacity={high}>
      high frequency: fades sooner
    </T>
  </g>
);

export const CoatingSection: React.FC<{ x: number; y: number; s?: number; t: number; ping: number; noise: number }> = ({ x, y, s = 1, t, ping, noise }) => {
  const echoX = 140 + 360 * clamp(ping * 2 - 1);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Hull wall with an outer coating (left = inside, right = water) */}
      <rect x={-60} y={-260} width={60} height={520} fill={K.steel} />
      <rect x={0} y={-260} width={70} height={520} fill="#1B2A22" stroke={K.green} strokeWidth={3} opacity={0.9} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={35} cy={-235 + i * 43} r={9} fill="#0E1712" />
      ))}
      <T x={35} y={300} size={26} color={K.green} anchor="middle" weight={700}>
        coating
      </T>
      <T x={-30} y={300} size={22} color={K.muted} anchor="end">
        hull
      </T>
      {/* Incoming sonar ping and weaker echo */}
      <g opacity={ping > 0 ? 1 : 0}>
        {ping < 0.5 ? (
          <path d={`M${540 - 440 * clamp(ping * 2)} -230 Q${500 - 440 * clamp(ping * 2)} -140 ${540 - 440 * clamp(ping * 2)} -50`} stroke={K.cyan} strokeWidth={9} fill="none" />
        ) : null}
        {ping >= 0.5 ? (
          <path d={`M${echoX} -210 Q${echoX + 34} -140 ${echoX} -70`} stroke={K.cyan} strokeWidth={3} fill="none" opacity={0.45} />
        ) : null}
        {ping >= 0.5 ? (
          <T x={echoX + 60} y={-30} size={22} color={K.muted}>
            weaker echo
          </T>
        ) : null}
        <T x={560} y={-180} size={28} color={K.ivory} anchor="end" weight={700}>
          Anechoic: weaker echo
        </T>
      </g>
      {/* Machinery vibration from inside, damped before radiating */}
      <g opacity={noise}>
        {[0, 1, 2].map((i) => {
          const px = -400 + ((t * 3 + i * 120) % 360);
          return <path key={i} d={`M${px} 120 q15 -30 30 0 q15 30 30 0`} stroke={K.amber} strokeWidth={5} fill="none" opacity={px < -60 ? 1 : 0} />;
        })}
        <path d={`M80 140 q15 -8 30 0 q15 8 30 0`} stroke={K.amber} strokeWidth={2} fill="none" opacity={0.4} />
        <T x={560} y={210} size={28} color={K.ivory} anchor="end" weight={700}>
          Decoupling: less radiated noise
        </T>
      </g>
    </g>
  );
};

// Length plate drawn below a submarine silhouette whose hull spans [-w/2, w/2];
// y is the top of the plate (just under the hull).
export const LengthCompare: React.FC<{ x: number; y: number; w: number; p: number; size?: number }> = ({ x, y, w, p, size = 30 }) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <path d={`M${-w / 2} 0 V30 M${w / 2} 0 V30 M${-w / 2} 15 H${w / 2}`} stroke={K.ivory} strokeWidth={3} fill="none" />
    <T x={0} y={68} size={size} color={K.ivory} anchor="middle" weight={700}>
      377 ft — US Virginia-class (US Navy)
    </T>
    <rect x={-w / 2} y={110} width={w} height={110} fill="#0F2A1A" stroke={K.green} strokeWidth={3} />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={-w / 2 + (w * i) / 10} y1={110} x2={-w / 2 + (w * i) / 10} y2={220} stroke={K.green} strokeWidth={2} opacity={0.5} />
    ))}
    <T x={0} y={265} size={size * 0.85} color={K.green} anchor="middle">
      ≈ a football field (approx.)
    </T>
  </g>
);

// ---------- Radio through seawater ----------
export const CommsColumn: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  t: number;
  hf: number;
  vlf: number;
  antenna: number;
  elf: number;
  reply: number;
  size?: number;
  // Horizontal positions (fractions of w) and label layout; defaults are the long-form v1 layout.
  vlfX?: number;
  elfX?: number;
  stackedElfLabel?: boolean;
  shoreLabelY?: number;
}> = ({ x, y, w, h, t, hf, vlf, antenna, elf, reply, size = 26, vlfX = 0.48, elfX = 0.7, stackedElfLabel = false, shoreLabelY = -160 }) => {
  const surface = h * 0.22;
  const vlfBand = h * 0.12;
  const subY = h * 0.62 - antenna * h * 0.18 - reply * h * 0.2;
  const wave = (amp: number, wl: number, x0: number, y0: number, y1: number, ph: number) =>
    Array.from({ length: 60 }, (_, k) => {
      const yy = y0 + ((y1 - y0) * k) / 59;
      return `${k ? "L" : "M"}${x0 + amp * Math.sin((yy / wl) * Math.PI * 2 - ph)} ${yy}`;
    }).join(" ");
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={surface} width={w} height={h - surface} fill="url(#e2water)" />
      <rect x={0} y={surface} width={w} height={vlfBand} fill={K.cyan} opacity={0.1 * vlf} />
      <line x1={0} y1={surface} x2={w} y2={surface} stroke={K.cyan} strokeWidth={3} />
      {/* Shore antenna */}
      <g transform={`translate(${w * 0.08} ${surface})`}>
        <path d="M0 0 L20 -140 L40 0 M8 -50 L32 -50 M13 -95 L27 -95" stroke={K.steelHi} strokeWidth={4} fill="none" />
        <T x={20} y={shoreLabelY} size={size * 0.8} color={K.muted} anchor="middle">
          shore transmitter
        </T>
      </g>
      {/* Higher frequency: dies at the surface */}
      <path d={wave(14, 26, w * 0.28, surface - 120, surface + 18, t * 0.4)} stroke={K.ivory} strokeWidth={3} fill="none" opacity={hf} />
      <T x={w * 0.28} y={surface - 140} size={size * 0.85} color={K.ivory} anchor="middle" opacity={hf}>
        higher frequency
      </T>
      {/* VLF: shallow band */}
      <path d={wave(22, 80, w * vlfX, surface - 120, surface + vlfBand, t * 0.25)} stroke={K.cyan} strokeWidth={4} fill="none" opacity={vlf} />
      <T x={w * vlfX} y={surface - 140} size={size * 0.85} color={K.cyan} anchor="middle" weight={700} opacity={vlf}>
        VLF
      </T>
      <T x={w * 0.98} y={surface + vlfBand * 0.62} size={size * 0.8} color={K.cyan} anchor="end" opacity={vlf}>
        tens of feet (US Navy, 2001)
      </T>
      {/* ELF: deeper, historical */}
      <path d={wave(30, 220, w * elfX, surface - 120, surface + (h - surface) * 0.75 * elf, t * 0.12)} stroke={K.amber} strokeWidth={5} fill="none" opacity={elf} />
      <T x={w * elfX} y={surface - 140} size={size * 0.85} color={K.amber} anchor="middle" weight={700} opacity={elf}>
        ELF ≈ 76 Hz
      </T>
      {stackedElfLabel ? (
        <>
          <T x={w * 0.98} y={surface + (h - surface) * 0.55} size={size * 0.8} color={K.amber} anchor="end" weight={700} opacity={elf}>
            hundreds of feet
          </T>
          <T x={w * 0.98} y={surface + (h - surface) * 0.55 + size} size={size * 0.8} color={K.amber} anchor="end" opacity={elf}>
            one-way, slow
          </T>
        </>
      ) : (
        <T x={w * 0.98} y={surface + (h - surface) * 0.62} size={size * 0.8} color={K.amber} anchor="end" opacity={elf}>
          hundreds of feet · one-way, slow
        </T>
      )}
      <T x={w * 0.98} y={surface + (h - surface) * 0.62 + size} size={size * 0.7} color={K.muted} anchor="end" opacity={elf}>
        US system, shut down 2004
      </T>
      {/* Submarine (simple capsule) with antenna rising into the VLF band */}
      <g transform={`translate(${w * 0.42} ${subY})`}>
        <rect x={-150} y={-24} width={300} height={48} rx={24} fill="url(#e2hull)" stroke={K.steelHi} strokeWidth={3} />
        <rect x={-50} y={-50} width={50} height={28} rx={6} fill="url(#e2hull)" stroke={K.steelHi} strokeWidth={3} />
        <line x1={-25} y1={-50} x2={-25} y2={-50 - antenna * Math.max(0, subY - surface - vlfBand * 0.4)} stroke={K.cyan} strokeWidth={3} />
        {antenna > 0.9 ? <circle cx={-25} cy={-50 - (subY - surface - vlfBand * 0.4)} r={8} fill={K.cyan} filter="url(#e2glow)" /> : null}
      </g>
      {/* Reply via satellite near the surface */}
      <g opacity={reply}>
        <line x1={w * 0.42 - 25} y1={subY - 60} x2={w * 0.9} y2={-40} stroke={K.cyan} strokeWidth={3} strokeDasharray="10 8" strokeDashoffset={t * 2} />
        <rect x={w * 0.9 - 20} y={-60} width={40} height={26} rx={5} fill={K.steelHi} />
        <T x={w * 0.9} y={-76} size={size * 0.8} color={K.cyan} anchor="middle">
          satellite
        </T>
      </g>
    </g>
  );
};

// ---------- Two-loop reactor plant (schematic) ----------
export const ReactorLoops: React.FC<{ x: number; y: number; s?: number; t: number; primary: number; secondary: number; turbine: number; size?: number }> = ({
  x,
  y,
  s = 1,
  t,
  primary,
  secondary,
  turbine,
  size = 28,
}) => {
  const loopDots = (x0: number, y0: number, x1: number, y1: number, color: string, on: number, speed: number, seed: number) => {
    const per = 2 * (x1 - x0) + 2 * (y1 - y0);
    return Array.from({ length: 8 }, (_, i) => {
      const d = (t * speed + i * (per / 8) + seed) % per;
      const top = x1 - x0;
      const side = y1 - y0;
      let px: number;
      let py: number;
      if (d < top) {
        px = x0 + d;
        py = y0;
      } else if (d < top + side) {
        px = x1;
        py = y0 + d - top;
      } else if (d < 2 * top + side) {
        px = x1 - (d - top - side);
        py = y1;
      } else {
        px = x0;
        py = y1 - (d - 2 * top - side);
      }
      return <circle key={i} cx={px} cy={py} r={8} fill={color} opacity={on} />;
    });
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Primary loop (sealed, amber) */}
      <rect x={-560} y={-150} width={400} height={300} rx={30} fill="none" stroke={K.amber} strokeWidth={8} pathLength={1} strokeDasharray={`${primary} 2`} />
      {primary > 0.95 ? loopDots(-560, -150, -160, 150, K.amber, 1, 4, 0) : null}
      <rect x={-520} y={-80} width={150} height={160} rx={16} fill={K.amberDim} stroke={K.amber} strokeWidth={4} opacity={primary} filter="url(#e2glow)" />
      <T x={-445} y={8} size={size} color={K.ivory} anchor="middle" weight={700} opacity={primary}>
        core
      </T>
      <T x={-360} y={-176} size={size} color={K.amber} anchor="middle" weight={700} opacity={primary}>
        Primary loop (sealed)
      </T>
      {/* Heat exchanger / steam generator */}
      <rect x={-200} y={-110} width={110} height={220} rx={14} fill={K.panel} stroke={K.ivory} strokeWidth={4} opacity={Math.max(primary, secondary)} />
      <T x={-145} y={200} size={size * 0.8} color={K.ivory} anchor="middle" opacity={secondary}>
        steam generator
      </T>
      <line x1={-145} y1={110} x2={-145} y2={176} stroke={K.ivory} strokeWidth={2} opacity={0.6 * secondary} />
      {/* Secondary loop (cyan → steam) */}
      <rect x={-130} y={-150} width={520} height={300} rx={30} fill="none" stroke={K.cyan} strokeWidth={8} pathLength={1} strokeDasharray={`${secondary} 2`} />
      {secondary > 0.95 ? loopDots(-130, -150, 390, 150, K.cyan, 1, 5, 40) : null}
      <T x={130} y={-176} size={size} color={K.cyan} anchor="middle" weight={700} opacity={secondary}>
        Secondary loop → steam
      </T>
      <T x={130} y={250} size={size * 0.8} color={K.muted} anchor="middle" opacity={secondary}>
        the two waters never mix
      </T>
      {/* Turbine */}
      <g transform="translate(390 0)" opacity={turbine}>
        <circle r={90} fill={K.panel} stroke={K.cyan} strokeWidth={5} />
        <g transform={`rotate(${t * 9})`}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <rect key={a} x={10} y={-8} width={70} height={16} rx={6} fill={K.cyan} transform={`rotate(${a})`} />
          ))}
        </g>
        <T x={110} y={0} size={size} color={K.ivory} weight={700}>
          turbines
        </T>
        <T x={110} y={size * 1.1} size={size * 0.75} color={K.muted}>
          make electricity
        </T>
        <T x={110} y={size * 2} size={size * 0.75} color={K.muted}>
          + help drive the boat
        </T>
      </g>
      <Tag x={-560} y={290} text="Schematic" size={size * 0.75} />
    </g>
  );
};

// ---------- Endurance limits: food, maintenance, crew ----------
export const ClockPanel: React.FC<{ x: number; y: number; s?: number; food: number; maint: number; crew: number; t: number; size?: number; subs?: boolean }> = ({
  x,
  y,
  s = 1,
  food,
  maint,
  crew,
  t,
  size = 30,
  subs = true,
}) => {
  const ringR = 110;
  const at = clamp(maint * 1.6);
  const port = clamp(maint * 1.6 - 1);
  const atSea = (77 / 112) * at;
  const inPort = (35 / 112) * port;
  const arc = (from: number, to: number) => {
    const a0 = from * Math.PI * 2 - Math.PI / 2;
    const a1 = to * Math.PI * 2 - Math.PI / 2;
    const large = to - from > 0.5 ? 1 : 0;
    return `M${ringR * Math.cos(a0)} ${ringR * Math.sin(a0)} A${ringR} ${ringR} 0 ${large} 1 ${ringR * Math.cos(a1)} ${ringR * Math.sin(a1)}`;
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Food stores */}
      <g transform="translate(-460 0)" opacity={food > 0 ? 1 : 0}>
        <rect x={-70} y={-150} width={140} height={300} rx={16} fill={K.panel} stroke={K.line} strokeWidth={3} />
        <rect x={-58} y={-138 + 276 * (1 - Math.max(0.12, 1 - food * 0.85))} width={116} height={276 * Math.max(0.12, 1 - food * 0.85)} rx={10} fill={K.amber} opacity={0.85} />
        <T x={0} y={200} size={size} color={K.ivory} anchor="middle" weight={700}>
          Food stores
        </T>
        <T x={0} y={200 + size * 1.1} size={size * 0.72} color={K.muted} anchor="middle" opacity={subs ? 1 : 0}>
          loaded before departure
        </T>
      </g>
      {/* Maintenance cycle ring */}
      <g opacity={maint > 0 ? 1 : 0}>
        <circle r={ringR} fill="none" stroke={K.line} strokeWidth={22} />
        {at > 0 ? <path d={arc(0, Math.max(0.001, atSea))} stroke={K.cyan} strokeWidth={22} fill="none" /> : null}
        {port > 0 ? <path d={arc(77 / 112, 77 / 112 + Math.max(0.001, inPort))} stroke={K.amber} strokeWidth={22} fill="none" /> : null}
        <T x={0} y={-6} size={size * 1.2} color={K.ivory} anchor="middle" weight={700}>
          {port > 0.5 ? "35" : String(Math.round(77 * at))}
        </T>
        <T x={0} y={size} size={size * 0.7} color={K.muted} anchor="middle">
          {port > 0.5 ? "days in port" : "days at sea"}
        </T>
        <T x={0} y={200} size={size} color={K.ivory} anchor="middle" weight={700}>
          Maintenance
        </T>
        <T x={0} y={200 + size * 1.1} size={size * 0.72} color={K.muted} anchor="middle" opacity={subs ? 1 : 0}>
          US ballistic-missile subs, average
        </T>
      </g>
      {/* Crew: two alternating crews */}
      <g transform="translate(460 0)" opacity={crew > 0 ? 1 : 0}>
        {["Blue", "Gold"].map((c, i) => {
          const active = Math.floor(t / 45) % 2 === i;
          return (
            <g key={c} transform={`translate(0 ${-80 + i * 120})`}>
              <rect x={-110} y={-45} width={220} height={90} rx={14} fill={K.panel} stroke={c === "Blue" ? K.cyan : K.amber} strokeWidth={active ? 5 : 2} opacity={active ? 1 : 0.5} />
              <T x={0} y={12} size={size} color={K.ivory} anchor="middle" weight={700}>
                {`${c} crew`}
              </T>
            </g>
          );
        })}
        <T x={0} y={200} size={size} color={K.ivory} anchor="middle" weight={700}>
          Crew
        </T>
        <T x={0} y={200 + size * 1.1} size={size * 0.72} color={K.muted} anchor="middle" opacity={subs ? 1 : 0}>
          two crews take turns
        </T>
      </g>
    </g>
  );
};
