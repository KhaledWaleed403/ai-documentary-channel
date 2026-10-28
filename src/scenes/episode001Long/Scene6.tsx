// Scene 6 · Hot plate, cold bite (S6-01 … S6-05): everyday surprises.
import React from "react";
import { SignalPath } from "../../components/SignalPath";
import { easeOut } from "../../animations/timing";
import { Thermometer } from "../episode001/shared";
import { C, INK_2, INK_3, LINE, Molecule, SceneProps, Stage, Tag, Txt, heatColor, lerp, progress, useShotTime, wobble } from "./shared";

const Table = () => <rect x={0} y={760} width={1920} height={320} fill={INK_2} stroke={LINE} strokeWidth={4} />;

const Plate: React.FC<{ rim: number }> = ({ rim }) => (
  <g>
    <ellipse cx={960} cy={740} rx={420} ry={90} fill={heatColor(0.15 + rim * 0.55)} stroke={C.inkNavy} strokeWidth={6} />
    <ellipse cx={960} cy={730} rx={330} ry={64} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={4} />
  </g>
);

export const S6Betrayal: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const lift = progress(f, beat(0), 30, easeOut);
  const touch = progress(f, beat(1), 10, easeOut);
  const recoil = progress(f, beat(1) + 10, 12, easeOut);
  return (
    <Stage>
      <Table />
      <Plate rim={1} />
      <path d="M720 730 Q960 560 1200 730 Z" fill={heatColor(0.55)} stroke={C.inkNavy} strokeWidth={4} />
      {/* fork lifting a bite with a probe thermometer reading cold */}
      <g transform={`translate(${lerp(980, 1060, lift)} ${lerp(680, 380, lift)})`}>
        <path d="M0 0 L160 -220" stroke={C.warmIvory} strokeWidth={10} strokeLinecap="round" />
        <circle cx={-6} cy={8} r={44} fill={C.mistBlue} stroke={C.inkNavy} strokeWidth={4} />
        <Thermometer x={-120} y={-60} h={170} level={0.15} outline={C.warmIvory} fill={C.mistBlue} empty={INK_3} />
        <Txt x={-180} y={-40} size={30} color={C.mistBlue} opacity={lift} anchor="end">
          cold
        </Txt>
      </g>
      {/* hand recoiling from the hot rim */}
      <g transform={`translate(${lerp(1700, 1340, touch) + recoil * 160} ${lerp(980, 760, touch) + recoil * 120})`} opacity={progress(f, beat(1) - 10, 10)}>
        <path d="M0 0 Q-60 -20 -80 -60 L-20 -80 Q40 -40 60 0 L120 200 L40 220 Z" fill="#33425C" stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={4} />
      </g>
      <Txt x={560} y={900} size={36} color={C.energyOrange} opacity={touch}>
        hot plate
      </Txt>
    </Stage>
  );
};

export const S6FoodPlate: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const outer = progress(f, beat(0), 30);
  const arrows = progress(f, beat(1), 30);
  const plate = progress(f, beat(2), 60);
  const stand = progress(f, beat(3), 140);
  const clock = Math.max(0, f - beat(3)) * 8;
  const dome = "M560 700 Q960 260 1360 700 Z";
  const core = "M760 690 Q960 450 1160 690 Z";
  return (
    <Stage grid>
      <rect x={420} y={700} width={1080} height={56} rx={22} fill={heatColor(0.1 + 0.5 * plate)} stroke={C.inkNavy} strokeWidth={5} />
      <path d={dome} fill={heatColor(0.15 + 0.5 * outer)} stroke={C.warmIvory} strokeWidth={6} />
      <path d={core} fill={heatColor(0.05 + 0.35 * stand)} filter="url(#soft)" />
      <g opacity={arrows}>
        {[
          [700, 560, 830, 620],
          [960, 400, 960, 540],
          [1220, 560, 1090, 620],
        ].map(([x1, y1, x2, y2], i) => (
          <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={C.energyOrange} strokeWidth={8} markerEnd="" strokeLinecap="round" />
        ))}
        {[700, 960, 1220].map((x) => (
          <path key={x} d={`M${x} 690 L${x} 740 M${x - 16} 722 L${x} 744 L${x + 16} 722`} stroke={C.energyOrange} strokeWidth={8} fill="none" strokeLinecap="round" />
        ))}
        <Txt x={300} y={500} size={34} color={C.energyOrange} anchor="start">
          heat spreads inward
        </Txt>
        <Txt x={1520} y={800} size={34} color={C.energyOrange} anchor="start">
          and into the plate
        </Txt>
      </g>
      <g opacity={progress(f, beat(3), 20)} transform="translate(1600 300)">
        <circle r={80} fill={INK_3} stroke={C.warmIvory} strokeWidth={6} />
        <path d={`M0 0 L${55 * Math.sin((clock * Math.PI) / 180)} ${-55 * Math.cos((clock * Math.PI) / 180)}`} stroke={C.discoveryGold} strokeWidth={8} strokeLinecap="round" />
        <Txt x={0} y={140} size={34} color={C.warmIvory}>
          standing time
        </Txt>
      </g>
    </Stage>
  );
};

const DishTest: React.FC<{ x: number; f: number; heatWater: number; heatDish: number; waves: number; label?: React.ReactNode; tick?: number }> = ({
  x,
  f,
  heatWater,
  heatDish,
  waves,
  label,
  tick = 0,
}) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-400} y={220} width={800} height={600} rx={26} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.6} strokeWidth={6} />
    {[0, 1, 2].map((i) => (
      <SignalPath key={i} points={[[-380, 420 + i * 90], [380, 420 + i * 90]]} progress={waves} stroke={C.signalTeal} width={4} amplitude={10} wavelength={60} phase={f * 0.35 + i} opacity={0.55} />
    ))}
    {/* empty dish */}
    <path d="M-330 700 Q-320 760 -170 760 Q-20 760 -10 700 Z" fill={heatColor(heatDish)} stroke={C.inkNavy} strokeWidth={5} />
    <ellipse cx={-170} cy={700} rx={160} ry={22} fill={heatColor(heatDish * 0.9)} stroke={C.inkNavy} strokeWidth={4} />
    {/* glass cup of water */}
    <rect x={90} y={560} width={170} height={200} rx={14} fill={heatColor(heatWater)} fillOpacity={0.8} stroke={C.warmIvory} strokeWidth={5} />
    <path d="M260 600 Q320 610 300 680 Q290 720 260 720" fill="none" stroke={C.warmIvory} strokeWidth={5} />
    {label}
    <g opacity={tick} transform="translate(300 300)">
      <circle r={40} fill={C.signalTeal} />
      <path d="M-18 0 L-4 16 L20 -14" stroke={C.inkNavy} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  </g>
);

export const S6DishTest: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const enter = progress(f, beat(0), 24, easeOut);
  const timer = progress(f, beat(1), length - beat(1) - 20, (x) => x);
  const leftWarm = progress(f, beat(2), 40);
  const rightGlow = progress(f, beat(3), 40);
  const waves = progress(f, beat(1), 30);
  const secs = Math.round(timer * 60);
  return (
    <Stage grid>
      <g opacity={enter}>
        <DishTest x={500} f={f} waves={waves} heatWater={0.6 * Math.max(leftWarm, rightGlow)} heatDish={0} tick={leftWarm} />
        <DishTest
          x={1420}
          f={f}
          waves={waves}
          heatWater={0.6 * Math.max(leftWarm, rightGlow)}
          heatDish={0.75 * rightGlow}
          label={<Tag x={-170} y={880} text="not microwave-safe" color={C.energyOrange} opacity={rightGlow} size={32} />}
        />
        <Txt x={500} y={900} size={34} color={C.mistBlue} opacity={leftWarm}>
          water hot, dish cool: fine
        </Txt>
        <g transform="translate(960 120)">
          <rect x={-420} y={-30} width={840} height={24} rx={12} fill={INK_3} stroke={LINE} strokeWidth={3} />
          <rect x={-420} y={-30} width={840 * timer} height={24} rx={12} fill={C.signalTeal} />
          <Txt x={0} y={50} size={40} color={C.warmIvory}>
            {`0:${String(secs).padStart(2, "0")}`.replace("0:60", "1:00")} / 1 min
          </Txt>
        </g>
      </g>
    </Stage>
  );
};

// Ice lattice: fixed positions/angles; molecules inside the thawed patch loosen.
const LATTICE = Array.from({ length: 77 }, (_, i) => ({ x: 380 + (i % 11) * 116 + (Math.floor(i / 11) % 2) * 58, y: 220 + Math.floor(i / 11) * 104, i }));
const PATCH = { x: 1020, y: 530, r: 210 };

export const S6Frozen: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const waves = progress(f, beat(0), 40);
  const thaw = progress(f, beat(1), 40);
  const step = progress(f, beat(2), 20) * 0.5 + progress(f, beat(2) + 45, 20) * 0.5;
  const loop = progress(f, beat(3), 20);
  return (
    <Stage grid>
      {[0, 1, 2, 3].map((i) => (
        <SignalPath key={i} points={[[60, 260 + i * 180], [1860, 260 + i * 180]]} progress={waves} stroke={C.signalTeal} width={4} amplitude={10} wavelength={60} phase={f * 0.35 + i} opacity={0.4} />
      ))}
      {LATTICE.map(({ x, y, i }) => {
        const inPatch = Math.hypot(x - PATCH.x, y - PATCH.y) < PATCH.r;
        const loose = inPatch ? thaw : 0;
        const jx = loose * 16 * wobble(f * 2.4, i);
        const jy = loose * 16 * wobble(f * 2.4, i + 30);
        const angle = (i % 2 ? 30 : -150) + loose * 70 * wobble(f * 2, i + 7);
        const color = inPatch ? heatColor(lerp(0.0, 0.55 + 0.45 * step, thaw)) : "#BFDCEB";
        return <Molecule key={i} x={x + jx} y={y + jy} angle={angle} s={0.5} color={color} />;
      })}
      <circle cx={PATCH.x} cy={PATCH.y} r={PATCH.r + 30} fill={C.energyOrange} opacity={thaw * (0.08 + 0.16 * step)} filter="url(#soft)" />
      <Txt x={300} y={160} size={34} color="#BFDCEB" anchor="start">
        ice: molecules locked in place
      </Txt>
      <g opacity={loop} transform="translate(960 1000)">
        <Txt x={0} y={0} size={40} color={C.discoveryGold}>
          thawed → absorbs more → heats faster ↺
        </Txt>
      </g>
    </Stage>
  );
};

export const S6Superheat: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const rise = progress(f, beat(0), 120);
  const tap = progress(f, beat(1), 6) - progress(f, beat(1) + 8, 6);
  const burst = progress(f, beat(2), 6, easeOut);
  const tag = progress(f, beat(3), 14);
  const steam = progress(f, beat(4), 30);
  return (
    <Stage grid>
      <rect x={0} y={820} width={1920} height={260} fill={INK_2} stroke={LINE} strokeWidth={4} />
      <g>
        <path d="M800 420 L1120 420 L1100 820 L820 820 Z" fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={6} />
        <path d="M1120 500 Q1220 510 1200 620 Q1190 700 1110 700" fill="none" stroke={C.warmIvory} strokeWidth={14} />
        <rect x={826} y={470} width={268} height={40} fill={heatColor(0.6 + 0.4 * rise)} />
      </g>
      <Thermometer x={1360} y={460} h={300} level={0.3 + 0.62 * rise} outline={C.warmIvory} fill={C.energyOrange} empty={INK_3} />
      <Txt x={1360} y={260} size={40} color={C.warmIvory} opacity={rise}>
        past 100 °C
      </Txt>
      <Txt x={960} y={380} size={30} color={C.mistBlue} opacity={rise * (1 - burst)}>
        no bubbles
      </Txt>
      <g transform={`translate(${lerp(620, 790, tap)} ${lerp(300, 440, tap)}) rotate(40)`} opacity={progress(f, beat(1) - 20, 10) * (1 - burst)}>
        <rect x={-10} y={-160} width={20} height={160} rx={8} fill={C.warmIvory} />
        <ellipse cx={0} cy={10} rx={26} ry={36} fill={C.warmIvory} />
      </g>
      <g opacity={burst * (1 - steam * 0.7)}>
        {Array.from({ length: 16 }).map((_, i) => {
          const a = -Math.PI / 2 + (i / 15 - 0.5) * 2.2;
          const r = 80 + 200 * burst * (0.6 + 0.4 * Math.sin(i * 2.1) ** 2);
          return <ellipse key={i} cx={960 + Math.cos(a) * r} cy={480 + Math.sin(a) * r} rx={18} ry={26} fill={C.mistBlue} opacity={0.9} />;
        })}
      </g>
      <Tag x={960} y={980} text="rare — but real" opacity={tag} color={C.discoveryGold} size={34} />
      <g opacity={steam}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${900 + i * 60} 400 Q${880 + i * 60} 300 ${920 + i * 60} 220 T${900 + i * 60} 60`} fill="none" stroke={C.signalTeal} strokeWidth={5} strokeDasharray="14 12" strokeDashoffset={-f * 2} opacity={0.7} />
        ))}
      </g>
    </Stage>
  );
};
