// Short · SuperheatedWater (SW01 … SW06): water past boiling that doesn't
// boil. One recurring image, a still glass of water beside a thermometer with a
// gold 100 °C line, so the only change is the reading (and, once, the burst).
import React from "react";
import { SignalPath } from "../../components/SignalPath";
import { easeOut, lerp, progress, wobble } from "../../animations/timing";
import { Thermometer } from "../episode001/shared";
import { C, Chip, INK_2, INK_3, LINE, ShortSceneProps, T, VStage, W, useShotTime } from "./shared";

const BOIL = 0.68;

// Tall glass of water; `tremble` ripples the surface, `y` is the cup centre.
const Glass: React.FC<{ x?: number; y?: number; s?: number; tremble?: number; f?: number }> = ({ x = 400, y = 1000, s = 1, tremble = 0, f = 0 }) => {
  const surf = Array.from({ length: 17 }, (_, i) => {
    const px = -150 + i * (300 / 16);
    return `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${(-230 + tremble * 10 * Math.sin(f * 1.1 + i * 1.3)).toFixed(1)}`;
  }).join(" ");
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`${surf} L138 250 L-138 250 Z`} fill={C.mistBlue} fillOpacity={0.32} />
      <path d={surf} fill="none" stroke={C.mistBlue} strokeWidth={5} />
      <path d="M-170 -290 L170 -290 L150 270 Q0 290 -150 270 Z" fill="none" stroke={C.warmIvory} strokeWidth={7} strokeLinejoin="round" />
      <path d="M-120 -250 L-108 230" stroke={C.warmIvory} strokeOpacity={0.35} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

// Thermometer with a marked boiling line; level 0..1.
const BoilMeter: React.FC<{ x?: number; y?: number; h?: number; level: number }> = ({ x = 840, y = 960, h = 520, level }) => {
  const tubeLen = h - h * 0.15 * 0.6;
  const lineY = y + h / 2 - tubeLen * BOIL;
  return (
    <g>
      <Thermometer x={x} y={y} h={h} level={level} outline={C.warmIvory} fill={level > BOIL ? C.discoveryGold : C.energyOrange} empty={INK_3} />
      <path d={`M${x - 70} ${lineY} L${x + 70} ${lineY}`} stroke={C.discoveryGold} strokeWidth={6} strokeDasharray="12 8" />
      <T x={x - 78} y={lineY + 14} size={42} color={C.discoveryGold} anchor="end">
        100 °C
      </T>
    </g>
  );
};

export const SW01Hotter: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const cup = progress(f, beat("cup"), 16, easeOut);
  const rise = progress(f, beat("rise"), 40);
  return (
    <VStage>
      <g opacity={cup} transform={`translate(0 ${(1 - cup) * 40})`}>
        <rect x={0} y={1270} width={W} height={650} fill={INK_2} stroke={LINE} strokeWidth={4} />
        <Glass />
        <BoilMeter level={lerp(0.35, 0.8, rise)} />
      </g>
      <T x={W / 2} y={330} size={72} weight={800} opacity={rise}>
        Hotter than boiling…
      </T>
      <Chip x={W / 2} y={1440} text="…and no bubbles" p={progress(f, beat("still"), 14, easeOut)} color={C.mistBlue} size={54} />
    </VStage>
  );
};

// Bubbles growing on impurity specks inside a magnified view.
const SPECKS = [
  { x: 380, y: 1110, s: 0 },
  { x: 610, y: 1180, s: 1 },
  { x: 720, y: 980, s: 2 },
  { x: 450, y: 900, s: 3 },
  { x: 560, y: 1020, s: 4 },
];

export const SW02Nucleation: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const lens = progress(f, beat("zoom"), 20, easeOut);
  const specks = progress(f, beat("specks"), 16);
  const grow = Math.max(0, f - beat("specks"));
  return (
    <VStage>
      <defs>
        <clipPath id="swLens">
          <circle cx={540} cy={980} r={380} />
        </clipPath>
      </defs>
      <g opacity={lens} transform={`translate(540 980) scale(${lerp(0.6, 1, lens)}) translate(-540 -980)`}>
        <circle cx={540} cy={980} r={380} fill="#1E3A4C" stroke={C.warmIvory} strokeWidth={8} />
        <g clipPath="url(#swLens)">
          {SPECKS.map(({ x, y, s }) => {
            const cycle = (grow * 1.2 + s * 23) % 70;
            const r = Math.min(34, cycle * 0.8);
            const rise = Math.max(0, cycle - 42) * 9;
            return (
              <g key={s} opacity={specks}>
                <circle cx={x + 4 * wobble(f, s)} cy={y} r={9} fill="#8A7E66" />
                <circle cx={x} cy={y - r - rise} r={r} fill="none" stroke={C.warmIvory} strokeWidth={5} opacity={grow > 0 ? 0.9 : 0} />
              </g>
            );
          })}
        </g>
      </g>
      <Chip x={W / 2} y={300} text="bubbles start at tiny impurities" p={specks} color={C.warmIvory} size={44} />
      <T x={W / 2} y={1440} size={44} color={C.mistBlue} opacity={lens}>
        ordinary boiling · magnified
      </T>
    </VStage>
  );
};

export const SW03CleanCup: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const enter = progress(f, beat("oven"), 16);
  const heat = progress(f, beat("clean"), Math.max(40, beat("calm") - beat("clean")));
  return (
    <VStage>
      <g opacity={enter}>
        <rect x={100} y={420} width={880} height={900} rx={30} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.6} strokeWidth={6} />
        <T x={140} y={490} size={40} color={C.mistBlue} anchor="start">
          inside the microwave
        </T>
        {[620, 820, 1020].map((y, i) => (
          <SignalPath key={y} points={[[120, y], [960, y]]} progress={progress(f, beat("oven"), 30)} stroke={C.signalTeal} width={4} amplitude={10} wavelength={60} phase={f * 0.35 + i} opacity={0.4} />
        ))}
        <Glass x={360} y={960} s={0.82} />
        <BoilMeter x={820} y={900} h={440} level={lerp(0.5, 0.86, heat)} />
      </g>
      <Chip x={W / 2} y={300} text="plain water · very clean cup" p={progress(f, beat("clean"), 14, easeOut)} color={C.mistBlue} size={48} />
      <Chip x={W / 2} y={1430} text="past 100 °C · still calm" p={progress(f, beat("past"), 14, easeOut)} color={C.discoveryGold} size={52} />
    </VStage>
  );
};

export const SW04Erupt: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const lift = progress(f, beat("lift"), 14, easeOut);
  const spoon = progress(f, beat("spoon"), 14, easeOut);
  const burst = progress(f, beat("burst"), 8, easeOut);
  const tremble = progress(f, beat("lift"), 10) * (1 - burst);
  const lifted = lerp(0, -30, lift) * (1 - burst * 0.4);
  return (
    <VStage>
      <rect x={0} y={1270} width={W} height={650} fill={INK_2} stroke={LINE} strokeWidth={4} />
      <g transform={`translate(0 ${lifted})`}>
        <Glass x={540} y={1000} tremble={tremble} f={f} />
        {/* hand under the cup's side */}
        <g opacity={lift} transform="translate(700 1010)">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-26} y={-70 + i * 40} width={90} height={34} rx={17} fill="#3B4C68" stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={4} />
          ))}
          <rect x={40} y={-80} width={150} height={190} rx={50} fill="#3B4C68" stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={4} />
          <rect x={110} y={90} width={100} height={260} rx={34} fill="#3B4C68" stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={4} />
        </g>
      </g>
      <g opacity={spoon * (1 - burst)} transform={`translate(${lerp(820, 600, spoon)} ${lerp(500, 640, spoon)}) rotate(-25)`}>
        <rect x={-180} y={-8} width={180} height={16} rx={8} fill={C.warmIvory} />
        <ellipse cx={30} cy={0} rx={46} ry={26} fill={C.warmIvory} />
        <ellipse cx={30} cy={-6} rx={34} ry={14} fill="#6B4A2E" />
      </g>
      <g opacity={burst}>
        {Array.from({ length: 22 }).map((_, i) => {
          const a = -Math.PI / 2 + (i / 21 - 0.5) * 2.4;
          const r = 60 + 340 * burst * (0.55 + 0.45 * Math.sin(i * 2.1) ** 2);
          return <ellipse key={i} cx={540 + Math.cos(a) * r} cy={760 + Math.sin(a) * r} rx={20} ry={28} fill={C.mistBlue} opacity={0.9} />;
        })}
        <ellipse cx={540} cy={760} rx={160 * burst} ry={70 * burst} fill={C.mistBlue} opacity={0.5} />
      </g>
      <Chip x={W / 2} y={300} text="a small disturbance" p={progress(f, beat("lift") - 8, 14, easeOut) * (1 - burst)} color={C.warmIvory} size={52} />
      <Chip x={W / 2} y={1440} text="can scald" p={progress(f, beat("warn"), 14, easeOut)} color={C.energyOrange} size={60} />
    </VStage>
  );
};

export const SW05Avoid: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const c1 = progress(f, beat("card1"), 16, easeOut);
  const c2 = progress(f, beat("card2"), 16, easeOut);
  const before = progress(f, beat("before"), 14, easeOut);
  const timer = Math.min(0.62, progress(f, beat("card1"), 50) * 0.62);
  const tip = progress(f, beat("before") + 4, 24);
  return (
    <VStage>
      <g opacity={c1} transform={`translate(0 ${(1 - c1) * 30})`}>
        <rect x={90} y={200} width={900} height={500} rx={30} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={5} />
        <T x={140} y={300} size={52} anchor="start" color={C.signalTeal}>
          1 · don&apos;t overheat it
        </T>
        <T x={140} y={370} size={42} anchor="start" color={C.mistBlue}>
          follow the recommended time
        </T>
        <rect x={160} y={500} width={760} height={34} rx={17} fill={INK_3} stroke={LINE} strokeWidth={3} />
        <rect x={160} y={500} width={760 * timer} height={34} rx={17} fill={C.signalTeal} />
        <path d={`M${160 + 760 * 0.62} 470 L${160 + 760 * 0.62} 564`} stroke={C.discoveryGold} strokeWidth={6} />
        <T x={160 + 760 * 0.62} y={630} size={40} color={C.discoveryGold}>
          stop here
        </T>
      </g>
      <g opacity={c2} transform={`translate(0 ${(1 - c2) * 30})`}>
        <rect x={90} y={760} width={900} height={680} rx={30} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={5} />
        <T x={140} y={860} size={52} anchor="start" color={C.signalTeal}>
          2 · add coffee or sugar
        </T>
        <T x={140} y={950} size={64} anchor="start" color={C.discoveryGold} weight={900} opacity={before}>
          BEFORE heating
        </T>
        <Glass x={420} y={1220} s={0.55} />
        <g transform={`translate(560 1020) rotate(${lerp(0, 35, tip)})`}>
          <rect x={0} y={-8} width={180} height={16} rx={8} fill={C.warmIvory} />
          <ellipse cx={-30} cy={0} rx={46} ry={26} fill={C.warmIvory} />
          <ellipse cx={-30} cy={-6} rx={34} ry={14} fill="#6B4A2E" opacity={1 - tip} />
        </g>
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={500 + (i % 3) * 12 - 12} cy={lerp(1030, 1110, Math.min(1, tip * 1.5 - i * 0.06))} r={6} fill="#6B4A2E" opacity={tip > 0.05 ? 1 - progress(f, beat("before") + 40, 10) : 0} />
        ))}
        <T x={760} y={1250} size={42} color={C.mistBlue} opacity={before}>
          cold water
        </T>
      </g>
    </VStage>
  );
};

export const SW06Calm: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const push = lerp(1, 1.08, progress(f, 0, length, (x) => x));
  return (
    <VStage>
      <g transform={`translate(540 1000) scale(${push}) translate(-540 -1000)`} opacity={progress(f, 0, 14)}>
        <rect x={-100} y={1270} width={1280} height={700} fill={INK_2} stroke={LINE} strokeWidth={4} />
        <Glass />
        <BoilMeter level={0.8} />
      </g>
      <Chip x={W / 2} y={330} text="calm ≠ below boiling" p={progress(f, beat("text"), 16, easeOut)} color={C.discoveryGold} size={60} />
    </VStage>
  );
};

export const superheatedScenes: Record<string, React.FC<ShortSceneProps>> = {
  SW01: SW01Hotter,
  SW02: SW02Nucleation,
  SW03: SW03CleanCup,
  SW04: SW04Erupt,
  SW05: SW05Avoid,
  SW06: SW06Calm,
};
