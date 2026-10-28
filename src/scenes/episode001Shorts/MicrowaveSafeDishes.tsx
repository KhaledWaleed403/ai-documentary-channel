// Short · MicrowaveSafeDishes (DS01 … DS07): why a dish gets hot, and what
// "microwave-safe" means. Two causes are kept visually distinct: heat flowing
// in from the food (orange arrows) vs. the dish absorbing waves itself (teal
// fading into a glowing dish). No material is shown as always safe or unsafe.
import React from "react";
import { SignalPath } from "../../components/SignalPath";
import { easeOut, lerp, progress } from "../../animations/timing";
import { Thermometer } from "../episode001/shared";
import { heatColor } from "../episode001Long/shared";
import { C, Chip, Cross, INK_2, INK_3, LINE, ShortSceneProps, T, Tick, VStage, W, WaveIcon, useShotTime } from "./shared";

const Counter = () => <rect x={0} y={1250} width={W} height={670} fill={INK_2} stroke={LINE} strokeWidth={4} />;

// Plate with a mound of food, side view, centred at (x, y) = plate top.
const PlateWithFood: React.FC<{ x: number; y: number; rim: number; food: number; s?: number }> = ({ x, y, rim, food, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={14} rx={390} ry={84} fill={heatColor(0.08 + rim * 0.62)} stroke={C.inkNavy} strokeWidth={6} />
    <ellipse cx={0} cy={4} rx={300} ry={58} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={4} />
    <path d="M-230 8 Q-120 -190 0 -200 Q120 -190 230 8 Z" fill={heatColor(food)} stroke={C.inkNavy} strokeWidth={5} />
  </g>
);

export const DS01Scorching: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const slide = progress(f, 0, beat("land") + 6, easeOut);
  const touch = progress(f, beat("touch"), 8, easeOut);
  const recoil = progress(f, beat("touch") + 8, 12, easeOut);
  const text = progress(f, beat("text"), 16, easeOut);
  return (
    <VStage>
      <Counter />
      <PlateWithFood x={lerp(-500, 540, slide)} y={1220} rim={touch} food={0.3} />
      {/* hand reaching for the rim, then snapping back */}
      <g transform={`translate(${lerp(1100, 860, touch) + recoil * 160} ${lerp(1500, 1230, touch) + recoil * 160}) rotate(-35)`} opacity={progress(f, beat("touch") - 12, 10)}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-70 + i * 36} y={-120 + Math.abs(i - 1.5) * 14} width={32} height={110} rx={16} fill="#3B4C68" stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={4} />
        ))}
        <rect x={-78} y={-30} width={160} height={150} rx={40} fill="#3B4C68" stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={4} />
        <rect x={-40} y={110} width={90} height={260} rx={30} fill="#3B4C68" stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={4} />
      </g>
      <g opacity={recoil}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${820 + i * 34} 1130 l14 -40`} stroke={C.discoveryGold} strokeWidth={8} strokeLinecap="round" />
        ))}
      </g>
      <g opacity={text} transform={`translate(0 ${(1 - text) * 30})`}>
        <T x={W / 2} y={420} size={84} weight={800}>
          Why is the
        </T>
        <T x={W / 2} y={530} size={110} weight={900} color={C.energyOrange}>
          PLATE hot?
        </T>
      </g>
    </VStage>
  );
};

export const DS02FromFood: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const card = progress(f, beat("card"), 16, easeOut);
  const waves = progress(f, beat("card") + 6, 30);
  const food = progress(f, beat("food"), 30);
  const arrows = progress(f, beat("arrows"), 24);
  const plate = progress(f, beat("arrows") + 10, 50);
  const dome = "M300 1150 Q360 860 540 840 Q720 860 780 1150 Z";
  return (
    <VStage>
      <Chip x={W / 2} y={280} text="1 · heat from the food" p={card} color={C.energyOrange} size={52} />
      {/* plate slab: warms only where the food sits on it */}
      <rect x={180} y={1150} width={720} height={60} rx={24} fill={heatColor(0.06)} stroke={C.inkNavy} strokeWidth={5} />
      <rect x={300} y={1150} width={480} height={60} fill={C.energyOrange} opacity={plate * 0.7} filter="url(#soft)" />
      <rect x={180} y={1150} width={720} height={60} rx={24} fill="none" stroke={C.inkNavy} strokeWidth={5} />
      <path d={dome} fill={heatColor(0.08 + 0.62 * food)} stroke={C.warmIvory} strokeWidth={6} />
      {/* waves pass straight through the food region and the plate */}
      {[400, 540, 680].map((x, i) => (
        <SignalPath key={x} points={[[x, 480], [x, 1420]]} progress={waves} stroke={C.signalTeal} width={5} amplitude={12} wavelength={60} phase={f * 0.35 + i} opacity={0.55} />
      ))}
      <g opacity={arrows}>
        {[400, 540, 680].map((x) => (
          <path key={x} d={`M${x + 30} 1060 L${x + 30} 1140 M${x + 12} 1118 L${x + 30} 1142 L${x + 48} 1118`} stroke={C.energyOrange} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
      <T x={W / 2} y={1320} size={48} color={C.energyOrange} opacity={arrows}>
        hot food heats the plate
      </T>
      <Chip x={W / 2} y={1440} text="waves pass through" p={progress(f, beat("through"), 14)} color={C.signalTeal} size={46} />
    </VStage>
  );
};

// Empty bowl, side view.
const Bowl: React.FC<{ x: number; y: number; heat: number; w?: number }> = ({ x, y, heat, w = 240 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={w * 0.7} fill={C.energyOrange} opacity={heat * 0.35} filter="url(#soft)" />
    <path d={`M${-w / 2} 0 Q${-w / 2} ${w * 0.5} ${-w * 0.16} ${w * 0.5} L${w * 0.16} ${w * 0.5} Q${w / 2} ${w * 0.5} ${w / 2} 0 Z`} fill={heatColor(0.04 + heat * 0.8)} stroke={C.inkNavy} strokeWidth={5} />
    <ellipse cx={0} cy={0} rx={w / 2} ry={w * 0.1} fill={heatColor(heat * 0.7)} stroke={C.inkNavy} strokeWidth={4} />
  </g>
);

export const DS03DishAbsorbs: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const card = progress(f, beat("card"), 16, easeOut);
  const waves = progress(f, beat("waves"), 30);
  const most = progress(f, beat("most"), 16, easeOut);
  const some = progress(f, beat("some"), 30);
  return (
    <VStage>
      <Chip x={W / 2} y={280} text="2 · the dish absorbs energy" p={card} color={C.signalTeal} size={50} />
      <T x={W / 2} y={470} size={46} color={C.mistBlue} opacity={card}>
        empty ceramic dishes · no food
      </T>
      {[700, 820, 940].map((y, i) => (
        <SignalPath key={y} points={[[60, y], [1020, y]]} progress={waves} stroke={C.signalTeal} width={4} amplitude={12} wavelength={60} phase={f * 0.35 + i} opacity={0.5} />
      ))}
      <Bowl x={210} y={1000} heat={0} />
      <Bowl x={540} y={1000} heat={0} />
      <Bowl x={870} y={1000} heat={some} />
      <Tick x={210} y={1260} p={most} />
      <Tick x={540} y={1260} p={most} />
      <T x={375} y={1380} size={54} color={C.mistBlue} opacity={most}>
        most: barely warm
      </T>
      <T x={870} y={1270} size={54} color={C.energyOrange} opacity={some}>
        some:
      </T>
      <T x={870} y={1340} size={54} color={C.energyOrange} opacity={some}>
        very hot
      </T>
    </VStage>
  );
};

const Tile: React.FC<{ x: number; label: string; p: number; children: React.ReactNode }> = ({ x, label, p, children }) => (
  <g transform={`translate(${x} ${(1 - p) * 40})`} opacity={p}>
    <rect x={-130} y={420} width={260} height={300} rx={26} fill={INK_2} stroke={LINE} strokeWidth={5} />
    <g transform="translate(0 545)">{children}</g>
    <T x={0} y={690} size={44} color={C.warmIvory}>
      {label}
    </T>
    <circle cx={98} cy={450} r={34} fill={C.discoveryGold} />
    <T x={98} y={468} size={50} color={C.inkNavy} weight={900}>
      ?
    </T>
  </g>
);

const ROWS = ["material", "glaze", "metal trim", "intended use"];

export const DS04NotTheWord: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const tiles = ["ceramic", "glass", "plastic"].map((id) => progress(f, beat(id), 14, easeOut));
  const list = progress(f, beat("list"), 16);
  const row = (i: number) => progress(f, beat("list") + 8 + i * Math.max(6, (beat("use") - beat("list")) / 3), 12, easeOut);
  return (
    <VStage>
      <T x={W / 2} y={300} size={58} weight={800} opacity={tiles[0]}>
        The word doesn&apos;t settle it
      </T>
      <Tile x={250} label="ceramic" p={tiles[0]}>
        <path d="M-60 -60 L60 -60 L52 60 L-52 60 Z" fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={4} />
        <path d="M60 -36 Q100 -30 92 10 Q86 40 56 40" fill="none" stroke={C.warmIvory} strokeWidth={10} />
      </Tile>
      <Tile x={540} label="glass" p={tiles[1]}>
        <path d="M-50 -66 L50 -66 L42 64 L-42 64 Z" fill={C.mistBlue} fillOpacity={0.25} stroke={C.mistBlue} strokeWidth={5} />
        <path d="M-30 -40 L-26 40" stroke={C.warmIvory} strokeOpacity={0.6} strokeWidth={5} strokeLinecap="round" />
      </Tile>
      <Tile x={830} label="plastic" p={tiles[2]}>
        <rect x={-74} y={-40} width={148} height={100} rx={14} fill="#9FC7D6" stroke={C.inkNavy} strokeWidth={4} />
        <rect x={-82} y={-62} width={164} height={26} rx={10} fill="#7FB0C3" stroke={C.inkNavy} strokeWidth={4} />
      </Tile>
      <T x={W / 2} y={880} size={54} color={C.discoveryGold} opacity={list}>
        What matters:
      </T>
      {ROWS.map((text, i) => (
        <g key={text} opacity={row(i)} transform={`translate(${(1 - row(i)) * -30} 0)`}>
          <circle cx={290} cy={990 + i * 110 - 18} r={16} fill={C.signalTeal} />
          <T x={340} y={990 + i * 110} size={60} anchor="start">
            {text}
          </T>
        </g>
      ))}
    </VStage>
  );
};

// Generic plastic tub, front view, centred at (x, y).
const Tub: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-160 -90 L160 -90 L140 130 L-140 130 Z" fill="#9FC7D6" stroke={C.inkNavy} strokeWidth={5} />
    <rect x={-176} y={-130} width={352} height={48} rx={16} fill="#7FB0C3" stroke={C.inkNavy} strokeWidth={5} />
  </g>
);

export const DS05Label: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const enter = progress(f, 0, 14);
  const stamp = progress(f, beat("stamp"), 8, easeOut);
  const tested = progress(f, beat("tested"), 16);
  const tub = progress(f, beat("tub"), 16, easeOut);
  const neq = progress(f, beat("neq"), 16);
  const shift = progress(f, beat("tub") - 6, 20);
  return (
    <VStage>
      <g transform={`translate(${lerp(540, 300, shift)} 0)`} opacity={enter}>
        <Tub x={0} y={860} />
        <g transform={`translate(0 880) scale(${lerp(1.8, 1, stamp)})`} opacity={stamp}>
          <rect x={-90} y={-64} width={180} height={128} rx={18} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={5} />
          <WaveIcon x={0} y={0} s={0.85} />
        </g>
        <T x={0} y={1090} size={46} color={C.signalTeal} opacity={stamp}>
          labeled
        </T>
      </g>
      <Chip x={W / 2} y={300} text="microwave-safe" p={stamp} color={C.signalTeal} size={56} />
      <T x={W / 2} y={460} size={50} color={C.warmIvory} opacity={tested}>
        plastic: tested to FDA standards
      </T>
      <g opacity={tub} transform={`translate(${(1 - tub) * 120} 0)`}>
        <Tub x={790} y={880} s={0.85} />
        <T x={790} y={1090} size={46} color={C.mistBlue}>
          no label
        </T>
      </g>
      <Chip x={W / 2} y={1300} text="didn't melt ≠ passed" p={neq} color={C.discoveryGold} size={58} />
    </VStage>
  );
};

export const DS06WaterCup: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const setup = progress(f, beat("setup"), 16, easeOut);
  const timer = progress(f, beat("timer"), Math.max(30, beat("hot") - beat("timer") - 6), (x) => x);
  const hot = progress(f, beat("hot"), 16, easeOut);
  const cool = progress(f, beat("cool"), 16, easeOut);
  const guarantee = progress(f, beat("guarantee"), 16);
  return (
    <VStage>
      <T x={W / 2} y={260} size={52} weight={800} opacity={setup}>
        No label? A quick check
      </T>
      <g opacity={setup}>
        <rect x={120} y={340} width={840} height={620} rx={28} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.6} strokeWidth={6} />
        {[0, 1, 2].map((i) => (
          <SignalPath key={i} points={[[150, 520 + i * 90], [930, 520 + i * 90]]} progress={progress(f, beat("timer"), 24)} stroke={C.signalTeal} width={4} amplitude={10} wavelength={60} phase={f * 0.35 + i} opacity={0.45 * (1 - hot * 0.6)} />
        ))}
        <Bowl x={370} y={770} heat={0} w={240} />
        <T x={370} y={700} size={80} color={C.discoveryGold} weight={900} opacity={1 - hot}>
          ?
        </T>
        <rect x={640} y={680} width={170} height={210} rx={14} fill={heatColor(0.6 * timer)} fillOpacity={0.85} stroke={C.warmIvory} strokeWidth={5} />
        <path d="M810 720 Q870 730 852 800 Q842 840 810 840" fill="none" stroke={C.warmIvory} strokeWidth={6} />
        <T x={725} y={660} size={40} color={C.mistBlue}>
          water
        </T>
        <rect x={180} y={380} width={720} height={22} rx={11} fill={INK_3} stroke={LINE} strokeWidth={3} />
        <rect x={180} y={380} width={720 * timer} height={22} rx={11} fill={C.signalTeal} />
        <T x={W / 2} y={460} size={42} color={C.warmIvory}>
          empty dish + cup of water · 1 min
        </T>
      </g>
      <g opacity={hot} transform={`translate(${(1 - hot) * -40} 0)`}>
        <Bowl x={200} y={1090} heat={1} w={150} />
        <Cross x={330} y={1120} p={hot} r={34} />
        <T x={390} y={1138} size={50} anchor="start" color={C.energyOrange}>
          dish hot → keep it out
        </T>
      </g>
      <g opacity={cool} transform={`translate(${(1 - cool) * -40} 0)`}>
        <Bowl x={200} y={1290} heat={0} w={150} />
        <circle cx={330} cy={1320} r={34} fill="none" stroke={C.signalTeal} strokeWidth={6} strokeDasharray="10 8" />
        <T x={390} y={1338} size={50} anchor="start" color={C.mistBlue}>
          dish cool → good sign
        </T>
      </g>
      <T x={390} y={1420} size={50} anchor="start" color={C.discoveryGold} weight={800} opacity={guarantee}>
        not a guarantee
      </T>
    </VStage>
  );
};

export const DS07Hottest: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const enter = progress(f, 0, 16);
  const label = progress(f, beat("label"), 14, easeOut);
  const maker = progress(f, beat("maker"), 14, easeOut);
  const therm = progress(f, beat("therm"), 30);
  return (
    <VStage>
      <Chip x={W / 2} y={280} text="✓ check the label" p={label} color={C.signalTeal} size={52} />
      <Chip x={W / 2} y={400} text="✓ follow the maker's instructions" p={maker} color={C.signalTeal} size={46} />
      <g opacity={enter}>
        <Counter />
        <PlateWithFood x={540} y={1220} rim={0.2} food={0.95} />
        <g opacity={progress(f, 0, 30)}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${470 + i * 70} 960 q-24 -50 0 -100 t0 -100`} fill="none" stroke={C.warmIvory} strokeOpacity={0.35} strokeWidth={6} strokeDasharray="14 12" strokeDashoffset={-f * 1.5} />
          ))}
        </g>
      </g>
      <g opacity={therm}>
        <Thermometer x={300} y={800} h={240} level={lerp(0.3, 0.92, therm)} outline={C.warmIvory} fill={C.discoveryGold} empty={INK_3} />
        <T x={300} y={620} size={46} color={C.discoveryGold}>
          food
        </T>
        <Thermometer x={800} y={1020} h={200} level={lerp(0.2, 0.42, therm)} outline={C.warmIvory} fill={C.energyOrange} empty={INK_3} />
        <T x={800} y={880} size={46} color={C.energyOrange}>
          plate
        </T>
      </g>
    </VStage>
  );
};

export const dishesScenes: Record<string, React.FC<ShortSceneProps>> = {
  DS01: DS01Scorching,
  DS02: DS02FromFood,
  DS03: DS03DishAbsorbs,
  DS04: DS04NotTheWord,
  DS05: DS05Label,
  DS06: DS06WaterCup,
  DS07: DS07Hottest,
};
