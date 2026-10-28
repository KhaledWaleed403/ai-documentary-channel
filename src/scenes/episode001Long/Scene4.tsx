// Scene 4 · Press Start (S4-01 … S4-07): the heating mechanism.
import React from "react";
import { CameraFrame } from "../../components/CameraFrame";
import { SignalPath } from "../../components/SignalPath";
import { easeOut } from "../../animations/timing";
import { Thermometer, bowlSectionPath } from "../episode001/shared";
import {
  C,
  FieldArrows,
  INK_2,
  INK_3,
  LINE,
  MagnetronBlock,
  Molecule,
  SceneProps,
  SoupBowl,
  Stage,
  Stamp,
  Txt,
  heatColor,
  lerp,
  progress,
  twist,
  useShotTime,
  wobble,
} from "./shared";

// Oven cutaway in 3/4-free side view: cavity x 360..1240, y 240..840.
export const OvenCutaway: React.FC<{ glow: number; children?: React.ReactNode; bowlHeat?: number; finger?: number; press?: number }> = ({
  glow,
  children,
  bowlHeat = 0,
  finger = 0,
  press = 0,
}) => (
  <g>
    <rect x={300} y={180} width={1320} height={720} rx={36} fill="none" stroke={C.warmIvory} strokeOpacity={0.4} strokeWidth={5} strokeDasharray="18 14" />
    <rect x={360} y={240} width={880} height={600} rx={14} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.85} strokeWidth={7} />
    {/* waveguide channel from the magnetron into the cavity roof */}
    <path d="M1420 330 L1290 330 L1290 240" fill="none" stroke={LINE} strokeWidth={34} strokeLinejoin="round" />
    <MagnetronBlock x={1460} y={330} w={170} h={120} glow={glow} />
    {/* turntable + bowl */}
    <ellipse cx={800} cy={800} rx={330} ry={40} fill={INK_3} stroke={LINE} strokeWidth={5} />
    <SoupBowl x={800} y={690} w={360} soup={heatColor(bowlHeat)} />
    {children}
    {/* keypad */}
    <rect x={1330} y={520} width={220} height={300} rx={18} fill={INK_3} stroke={LINE} strokeWidth={4} />
    {Array.from({ length: 6 }).map((_, i) => (
      <rect key={i} x={1360 + (i % 3) * 56} y={560 + Math.floor(i / 3) * 56} width={40} height={36} rx={6} fill={LINE} />
    ))}
    <rect x={1360} y={700} width={160} height={70} rx={12} fill={press > 0 ? C.signalTeal : LINE} opacity={0.6 + 0.4 * press} />
    <Txt x={1440} y={746} size={32} color={C.inkNavy} weight={800}>
      START
    </Txt>
    <g opacity={finger} transform={`translate(1460 ${lerp(880, 790, press)})`}>
      <path d="M-26 0 Q-26 -40 0 -40 Q26 -40 26 0 L26 200 L-26 200 Z" fill="#33425C" stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={4} />
    </g>
  </g>
);

const BOUNCES: [number, number][][] = [
  [[1290, 250], [980, 830], [600, 250], [370, 640], [700, 830], [1230, 380]],
  [[1290, 250], [1230, 520], [760, 250], [370, 470], [520, 830], [1100, 250]],
  [[1290, 250], [860, 640], [370, 300], [560, 250], [1230, 760], [900, 830]],
  [[1290, 250], [1080, 830], [370, 820], [460, 250], [1230, 600], [700, 250]],
];

export const S4Fill: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const press = progress(f, 2, 6) - progress(f, 10, 6) * 0.5;
  const glow = progress(f, beat(1), 14);
  const lattice = progress(f, beat(4) - 30, 50);
  return (
    <Stage grid>
      <OvenCutaway glow={glow} finger={1 - progress(f, 30, 20)} press={press}>
        <g opacity={lattice * 0.5}>
          {Array.from({ length: 9 }).map((_, i) => (
            <SignalPath key={`h${i}`} points={[[370, 270 + i * 66], [1230, 270 + i * 66]]} progress={1} stroke={C.signalTeal} width={3} amplitude={10} wavelength={120} phase={f * 0.2 + i} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <SignalPath key={`v${i}`} points={[[400 + i * 74, 250], [400 + i * 74, 830]]} progress={1} stroke={C.signalTeal} width={3} amplitude={10} wavelength={120} phase={f * 0.2 + i * 1.3} />
          ))}
        </g>
        {BOUNCES.map((pts, i) => {
          const start = i === 0 ? beat(2) : beat(3) + (i - 1) * 14;
          return (
            <SignalPath key={i} points={pts} progress={progress(f, start, 70)} stroke={C.signalTeal} width={6} amplitude={12} wavelength={48} phase={f * 0.35} opacity={0.9 - 0.4 * lattice} />
          );
        })}
      </OvenCutaway>
    </Stage>
  );
};

export const S4Field: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const zoom = progress(f, beat(0), 36);
  const mag = progress(f, beat(1), 20) - progress(f, beat(1) + 70, 30);
  const arrows = progress(f, beat(2) - 10, 20);
  const swing = f >= beat(2) ? Math.sin(((f - beat(2)) / 30) * Math.PI * 2) : 1;
  return (
    <Stage
      grid
    >
      <g opacity={1 - zoom * 0.25}>
        <path
          d={Array.from({ length: 97 }, (_, i) => {
            const x = 60 + i * 18.75;
            return `${i === 0 ? "M" : "L"}${x} ${560 - lerp(30, 150, zoom) * Math.sin(((x - 60) / lerp(240, 1800, zoom)) * Math.PI * 2)}`;
          }).join(" ")}
          fill="none"
          stroke={C.signalTeal}
          strokeWidth={8}
          opacity={1 - arrows * 0.6}
        />
      </g>
      <g opacity={mag * 0.6}>
        <path d="M200 560 Q600 760 960 560 T1720 560" fill="none" stroke={C.mistBlue} strokeWidth={4} strokeDasharray="10 12" transform="translate(0 0)" />
        <Txt x={1500} y={760} size={34} color={C.mistBlue}>
          magnetic field
        </Txt>
      </g>
      <FieldArrows x0={300} x1={1620} y={560} n={8} field={arrows * swing} opacity={arrows} len={130} />
      <Txt x={960} y={420} size={48} color={C.signalTeal} opacity={arrows}>
        electric field
      </Txt>
    </Stage>
  );
};

export const S4Molecule: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const mol = progress(f, beat(1), 20, easeOut);
  const labels = progress(f, beat(2), 16);
  const go = progress(f, beat(3), 20);
  const field = Math.sin((f / 30) * Math.PI * 2);
  // Lags behind the field and only turns part of the way.
  const angle = go * 34 * Math.sin((f / 30) * Math.PI * 2 - 1.1);
  return (
    <Stage
      grid
    >
      <FieldArrows x0={420} x1={1500} y={240} n={6} field={field} len={110} opacity={0.9} />
      <g opacity={mol}>
        <Molecule x={900} y={640} angle={angle} s={2.6} labels={labels} />
      </g>
      <Txt x={960} y={1000} size={30} color={C.mistBlue} opacity={go * 0.85} italic>
        twists part-way, lagging behind each flip · slowed down
      </Txt>
    </Stage>
  );
};

const DANCERS = Array.from({ length: 63 }, (_, i) => ({ x: 360 + (i % 9) * 150, y: 260 + Math.floor(i / 9) * 92, seed: i }));

export const S4Analogy: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const frame = progress(f, beat(0), 20);
  const beatOn = f >= beat(1);
  const dir = Math.sin((f / 18) * Math.PI) >= 0 ? 1 : -1;
  const chaos = progress(f, beat(2), 80);
  const warm = progress(f, beat(3), 60);
  return (
    <Stage grid>
      <g opacity={frame}>
        <rect x={192} y={108} width={1536} height={864} rx={48} fill={heatColor(warm * 0.65)} opacity={0.12} stroke={C.mistBlue} strokeWidth={5} strokeDasharray="22 16" />
        {beatOn ? (
          <g transform={`translate(960 170)`}>
            <path d={dir > 0 ? "M-60 0 L60 0 M30 -24 L60 0 L30 24" : "M60 0 L-60 0 M-30 -24 L-60 0 L-30 24"} stroke={C.signalTeal} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
        ) : null}
        {DANCERS.map(({ x, y, seed }) => {
          const dist = Math.hypot(x - 960, y - 540) / 700;
          const local = Math.max(0, Math.min(1, chaos * 1.6 - dist * 0.6));
          const jx = local * 26 * wobble(f * 2.2, seed);
          const jy = local * 22 * wobble(f * 2.2, seed + 40);
          const tryTurn = beatOn ? dir * 25 * (1 - local) : 0;
          const facing = tryTurn + local * 120 * wobble(f * 1.6, seed + 9);
          return (
            <g key={seed} transform={`translate(${x + jx} ${y + jy}) rotate(${facing})`}>
              <circle r={30} fill="none" stroke={C.warmIvory} strokeWidth={4} strokeDasharray="5 4" />
              <path d="M0 -30 L0 -46" stroke={C.warmIvory} strokeWidth={4} />
            </g>
          );
        })}
      </g>
    </Stage>
  );
};

const CLUSTER = Array.from({ length: 20 }, (_, i) => ({ x: 560 + (i % 5) * 170 + (Math.floor(i / 5) % 2) * 85, y: 300 + Math.floor(i / 5) * 150, i }));

export const S4Real: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const appear = progress(f, beat(0), 20);
  const ghost = progress(f, beat(1), 14) * (1 - progress(f, beat(2), 20));
  const cross = progress(f, beat(1) + 20, 10);
  const drive = progress(f, beat(2), 20);
  const random = progress(f, beat(3), 60);
  const warm = progress(f, beat(4), 50);
  return (
    <Stage grid>
      <g opacity={appear}>
        {/* faint hydrogen-bond links */}
        {CLUSTER.slice(0, 15).map((m, k) => (
          <path key={k} d={`M${m.x} ${m.y} L${CLUSTER[k + 5].x} ${CLUSTER[k + 5].y}`} stroke={C.mistBlue} strokeOpacity={0.15} strokeWidth={3} strokeDasharray="4 8" />
        ))}
        {CLUSTER.map(({ x, y, i }) => {
          const ordered = twist(f, i, drive);
          const jiggle = 55 * wobble(f * 2.5, i + 3);
          const angle = lerp(ordered, jiggle, random) + i * 37;
          const jx = random * 14 * wobble(f * 3, i);
          const jy = random * 14 * wobble(f * 3, i + 20);
          return <Molecule key={i} x={x + jx} y={y + jy} angle={angle} s={0.72} color={heatColor(warm * 0.75)} />;
        })}
      </g>
      <g opacity={ghost} transform="translate(1600 320)">
        <g opacity={0.6}>
          <Molecule x={0} y={0} angle={(f * 24) % 360} s={0.9} />
        </g>
        <Txt x={0} y={150} size={30} color={C.mistBlue}>
          propeller spin?
        </Txt>
        <path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke={C.energyOrange} strokeWidth={12} strokeLinecap="round" opacity={cross} />
      </g>
      <g opacity={warm}>
        <Thermometer x={1640} y={640} h={300} level={0.2 + 0.6 * warm} outline={C.warmIvory} fill={C.energyOrange} empty={INK_3} />
        <Txt x={960} y={1010} size={34} color={C.mistBlue}>
          dielectric heating
        </Txt>
      </g>
    </Stage>
  );
};

const ToolIcon = () => (
  <g fill="none" stroke={C.warmIvory} strokeWidth={8} strokeLinecap="round">
    <path d="M-30 -110 L-30 0 Q-30 40 0 40 Q30 40 30 0 L30 -110 M0 40 L0 120" />
  </g>
);

export const S4Myth: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const card = progress(f, beat(0), 16);
  const stamp = progress(f, beat(1), 7, easeOut);
  const dial = progress(f, beat(2), 24);
  const others = progress(f, beat(3), 24);
  return (
    <Stage grid>
      <g opacity={card} transform="translate(560 380)">
        <rect x={-300} y={-230} width={600} height={430} rx={24} fill={INK_2} stroke={LINE} strokeWidth={5} />
        <ToolIcon />
        <Txt x={0} y={170} size={44} color={C.warmIvory}>
          tuned to water?
        </Txt>
        <Stamp x={0} y={-20} text="NO" p={stamp} />
      </g>
      <g opacity={dial} transform="translate(0 0)">
        <rect x={1000} y={300} width={760} height={90} rx={14} fill={INK_2} stroke={LINE} strokeWidth={4} />
        {Array.from({ length: 31 }).map((_, i) => (
          <path key={i} d={`M${1020 + i * 24} 380 L${1020 + i * 24} ${i % 5 === 0 ? 330 : 350}`} stroke={LINE} strokeWidth={3} />
        ))}
        {[1060, 1180, 1520, 1640].map((x) => (
          <rect key={x} x={x} y={312} width={60} height={22} rx={6} fill={LINE} />
        ))}
        <rect x={1330} y={306} width={90} height={78} rx={8} fill={C.signalTeal} opacity={0.35} stroke={C.signalTeal} strokeWidth={4} />
        <Txt x={1375} y={460} size={38} color={C.signalTeal}>
          ovens · 2.45 GHz
        </Txt>
        <Txt x={1380} y={510} size={28} color={C.mistBlue}>
          a frequency set aside for ovens
        </Txt>
      </g>
      <g transform="translate(1380 760)">
        <Molecule x={-170} y={0} angle={-20} s={0.9} color={heatColor(0.4)} />
        <g opacity={others}>
          {[
            [40, -40],
            [190, 30],
            [320, -50],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r={70} fill={C.energyOrange} opacity={0.12} />
              <path d="M-40 0 L-20 -30 L20 -30 L40 0 L20 30 L-20 30 Z" fill="none" stroke={C.warmIvory} strokeWidth={4} />
              <circle cx={40} cy={0} r={10} fill={C.warmIvory} />
            </g>
          ))}
          <Txt x={60} y={170} size={30} color={C.mistBlue}>
            other molecules absorb some too
          </Txt>
        </g>
      </g>
    </Stage>
  );
};

export const S4Section: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const stamp = progress(f, beat(0) + 20, 7, easeOut);
  const waves = progress(f, beat(1), 60);
  const band = progress(f, beat(2), 50);
  const core = progress(f, beat(3), 160);
  const outline = bowlSectionPath(960, 400, 960, 470);
  const inner = bowlSectionPath(960, 470, 560, 300);
  const sources: [number, number][][] = [
    [[80, 560], [560, 560]],
    [[1840, 560], [1360, 560]],
    [[760, 120], [800, 470]],
    [[1180, 120], [1130, 470]],
  ];
  return (
    <CameraFrame scale={lerp(1, 1.04, core)} originX={960} originY={620}>
      <Stage grid>
        <defs>
          <clipPath id="bowlClip">
            <path d={outline} />
          </clipPath>
        </defs>
        <g clipPath="url(#bowlClip)">
          <rect x={0} y={380} width={1920} height={600} fill={C.mistBlue} />
          <path d={outline} fill={heatColor(0.62)} opacity={band} />
          <path d={inner} fill={heatColor(0.45 * core)} filter="url(#soft)" opacity={1} />
          {sources.map((pts, i) => (
            <SignalPath key={`in${i}`} points={[pts[1], [pts[1][0] + (pts[1][0] - pts[0][0]) * 0.35, pts[1][1] + (pts[1][1] - pts[0][1]) * 0.35]]} progress={waves} stroke={C.signalTeal} width={6} amplitude={10} wavelength={40} phase={f * 0.35} opacity={0.7 * (1 - band * 0.5)} />
          ))}
        </g>
        <path d={outline} fill="none" stroke={C.warmIvory} strokeWidth={8} />
        {sources.map((pts, i) => (
          <SignalPath key={i} points={pts} progress={waves} stroke={C.signalTeal} width={6} amplitude={12} wavelength={44} phase={f * 0.35} />
        ))}
        <Txt x={960} y={940} size={30} color={C.mistBlue} opacity={core * 0.9}>
          the middle warms as heat spreads in from the outer layers
        </Txt>
        <g transform="translate(300 220)">
          <Txt x={0} y={0} size={52} color={C.warmIvory} opacity={progress(f, beat(0), 14)}>
            Inside-out?
          </Txt>
          <Stamp x={0} y={110} text="NO" p={stamp} />
        </g>
      </Stage>
    </CameraFrame>
  );
};
