// Short · StandingTime (ST01 … ST07): what happens after the beep. One
// recurring image, a thick mound of food in cross-section, so only the heat
// moves. Waves appear only before the oven stops; afterwards heat travels as
// orange arrows (conduction), never as new teal waves.
import React from "react";
import { SignalPath } from "../../components/SignalPath";
import { easeOut, lerp, progress } from "../../animations/timing";
import { Thermometer } from "../episode001/shared";
import { OvenFront, heatColor } from "../episode001Long/shared";
import { C, Chip, Clock, INK_2, INK_3, LINE, ShortSceneProps, T, VStage, W, WaveIcon, useShotTime } from "./shared";

// Thick food on a plate in cross-section: outer band heat, core heat (0..1).
const Section: React.FC<{ outer: number; core: number; x?: number; y?: number; s?: number }> = ({ outer, core, x = 540, y = 1000, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) translate(-540 -1000)`}>
    <rect x={120} y={1180} width={840} height={50} rx={22} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={5} />
    <path d="M180 1180 Q220 640 540 620 Q860 640 900 1180 Z" fill={heatColor(outer)} stroke={C.warmIvory} strokeWidth={6} />
    <path d="M330 1176 Q360 830 540 816 Q720 830 750 1176 Z" fill={heatColor(core)} filter="url(#soft)" />
  </g>
);

const Arrows: React.FC<{ p: number; f: number; x?: number; y?: number; s?: number }> = ({ p, f, x = 540, y = 1000, s = 1 }) => (
  <g opacity={p} transform={`translate(${x} ${y}) scale(${s}) translate(-540 -1000)`}>
    {[
      [250, 1060, 400, 1030],
      [330, 800, 450, 900],
      [540, 650, 540, 820],
      [750, 800, 630, 900],
      [830, 1060, 680, 1030],
    ].map(([x1, y1, x2, y2], i) => {
      const a = Math.atan2(y2 - y1, x2 - x1);
      return (
        <g key={i}>
          <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={C.discoveryGold} strokeWidth={10} strokeLinecap="round" strokeDasharray="22 16" strokeDashoffset={-f * 2} />
          <path
            d={`M${x2 - 26 * Math.cos(a - 0.5)} ${y2 - 26 * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - 26 * Math.cos(a + 0.5)} ${y2 - 26 * Math.sin(a + 0.5)}`}
            stroke={C.discoveryGold}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    })}
  </g>
);

const Display: React.FC<{ x: number; y: number; text: string; opacity?: number }> = ({ x, y, text, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect x={-120} y={-56} width={240} height={96} rx={16} fill="#0B111C" stroke={LINE} strokeWidth={4} />
    <T x={0} y={14} size={56} color={C.signalTeal}>
      {text}
    </T>
  </g>
);

export const ST01Beep: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const secs = Math.max(0, 3 - Math.floor((f / Math.max(1, beat("end"))) * 3));
  const ended = f >= beat("end");
  const flash = ended ? 0.6 + 0.4 * Math.cos((f - beat("end")) * 0.5) : 1;
  const climb = progress(f, beat("end"), 120);
  return (
    <VStage>
      <OvenFront x={540} y={560} w={900} timer={ended ? "0:00" : `0:0${secs}`} />
      <rect x={540 + 900 * 0.24} y={560 - 252 + 504 * 0.12} width={900 * 0.18} height={504 * 0.16} rx={10} fill={C.signalTeal} opacity={ended ? 0.25 * flash : 0} filter="url(#soft)" />
      <rect x={0} y={1250} width={W} height={670} fill={INK_2} stroke={LINE} strokeWidth={4} />
      <ellipse cx={540} cy={1235} rx={380} ry={70} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={5} />
      <path d="M260 1230 Q300 980 540 965 Q780 980 820 1230 Z" fill={heatColor(0.55)} stroke={C.inkNavy} strokeWidth={5} />
      {/* probe thermometer still climbing */}
      <path d="M600 1080 L700 940" stroke={C.warmIvory} strokeWidth={8} strokeLinecap="round" />
      <Thermometer x={760} y={880} h={220} level={lerp(0.35, 0.55, climb)} outline={C.warmIvory} fill={C.energyOrange} empty={INK_3} />
      <Chip x={W / 2} y={1440} text="done?" p={progress(f, beat("isnt"), 14, easeOut)} color={C.discoveryGold} size={60} />
    </VStage>
  );
};

export const ST02OutsideHot: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const waves = progress(f, beat("waves"), 20) * (1 - progress(f, beat("stop"), 10));
  const outer = progress(f, beat("waves"), 40);
  return (
    <VStage>
      <T x={W / 2} y={260} size={52} color={C.mistBlue} opacity={progress(f, 0, 14)}>
        thick food · cross-section
      </T>
      <Section outer={0.1 + 0.6 * outer} core={0.04} />
      {[700, 880, 1060].map((y, i) => (
        <g key={y} opacity={waves}>
          <SignalPath points={[[0, y], [300, y]]} progress={1} stroke={C.signalTeal} width={5} amplitude={10} wavelength={50} phase={f * 0.4 + i} opacity={0.75} />
          <SignalPath points={[[1080, y], [780, y]]} progress={1} stroke={C.signalTeal} width={5} amplitude={10} wavelength={50} phase={f * 0.4 + i} opacity={0.75} />
        </g>
      ))}
      <Chip x={W / 2} y={470} text="outside: hot" p={progress(f, beat("labels"), 14, easeOut)} color={C.energyOrange} size={54} />
      <path d="M540 1300 L540 1100" stroke={C.mistBlue} strokeWidth={5} strokeDasharray="10 10" opacity={progress(f, beat("middle"), 14)} />
      <Chip x={W / 2} y={1400} text="middle: still cool" p={progress(f, beat("middle"), 14, easeOut)} color={C.mistBlue} size={54} />
    </VStage>
  );
};

export const ST03FlowsIn: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const arrows = progress(f, beat("arrows"), 20);
  const core = progress(f, beat("arrows"), 140);
  const off = progress(f, beat("off"), 14, easeOut);
  return (
    <VStage>
      <Section outer={0.7 - 0.08 * core} core={0.04 + 0.3 * core} />
      <Arrows p={arrows} f={f} />
      <g opacity={off}>
        <WaveIcon x={W / 2} y={330} s={0.9} off={off} />
        <T x={W / 2} y={470} size={52} color={C.warmIvory}>
          microwaves: off
        </T>
      </g>
      <Chip x={W / 2} y={1400} text="heat flows inward" p={progress(f, beat("arrows") + 6, 14, easeOut)} color={C.discoveryGold} size={54} />
    </VStage>
  );
};

export const ST04Standing: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const chip = progress(f, beat("chip"), 14, easeOut);
  const clock = progress(f, beat("clock"), 14);
  const climb = progress(f, beat("climb"), 40);
  const core = 0.34 + 0.14 * progress(f, 0, 200);
  return (
    <VStage>
      <Chip x={W / 2} y={270} text="STANDING TIME" p={chip} color={C.discoveryGold} size={64} />
      <Clock x={300} y={500} r={90} t={Math.max(0, f - beat("clock")) * 2} opacity={clock} />
      <Display x={780} y={500} text="0:00" opacity={clock} />
      <T x={780} y={600} size={40} color={C.mistBlue} opacity={clock}>
        oven off
      </T>
      <Section outer={0.62} core={core} y={1060} s={0.9} />
      <Arrows p={0.6} f={f} y={1060} s={0.9} />
      <path d="M540 1060 L540 860" stroke={C.warmIvory} strokeWidth={8} strokeLinecap="round" />
      <Thermometer x={540} y={760} h={220} level={lerp(0.4, 0.7, climb)} outline={C.warmIvory} fill={C.energyOrange} empty={INK_3} />
      <Chip x={W / 2} y={1420} text="+ several degrees" p={progress(f, beat("climb") + 8, 14, easeOut)} color={C.energyOrange} size={56} />
    </VStage>
  );
};

const Bar: React.FC<{ x: number; level: number; label: string; color: string }> = ({ x, level, label, color }) => (
  <g>
    <rect x={x - 80} y={600} width={160} height={600} rx={30} fill={INK_3} stroke={LINE} strokeWidth={5} />
    <rect x={x - 64} y={1184 - 568 * level} width={128} height={568 * level} rx={22} fill={color} />
    <T x={x} y={1290} size={54} color={C.warmIvory}>
      {label}
    </T>
  </g>
);

export const ST05SameHeat: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const notMore = progress(f, beat("notMore"), 14, easeOut);
  const bars = progress(f, beat("bars"), 14, easeOut);
  const move = progress(f, beat("giveUp"), 50);
  return (
    <VStage>
      <g opacity={notMore}>
        <WaveIcon x={W / 2} y={300} s={0.8} off={notMore} />
        <T x={W / 2} y={430} size={48} color={C.mistBlue}>
          no extra heating
        </T>
      </g>
      <g opacity={bars} transform={`translate(0 ${(1 - bars) * 40})`}>
        <Bar x={300} level={lerp(0.86, 0.72, move)} label="outside" color={heatColor(lerp(0.9, 0.75, move))} />
        <Bar x={780} level={lerp(0.3, 0.6, move)} label="middle" color={heatColor(lerp(0.15, 0.6, move))} />
        <path d="M410 900 L660 900 M630 870 L664 900 L630 930" stroke={C.discoveryGold} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={move > 0 ? 1 : 0.4} />
        <T x={540} y={860} size={42} color={C.discoveryGold}>
          heat
        </T>
      </g>
      <Chip x={W / 2} y={1420} text="same heat, spreading out" p={progress(f, beat("bars") + 8, 14, easeOut)} color={C.discoveryGold} size={52} />
    </VStage>
  );
};

export const ST06StandCheck: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const c1 = progress(f, beat("card1"), 16, easeOut);
  const c2 = progress(f, beat("card2"), 16, easeOut);
  const probe = progress(f, beat("probe"), 18, easeOut);
  return (
    <VStage>
      <g opacity={c1} transform={`translate(0 ${(1 - c1) * 30})`}>
        <rect x={90} y={200} width={900} height={400} rx={30} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={5} />
        <T x={150} y={300} size={58} anchor="start" color={C.discoveryGold}>
          1 · stand ≥ 3 min
        </T>
        <Clock x={540} y={460} r={100} t={Math.max(0, f - beat("card1")) * 3} />
      </g>
      <g opacity={c2} transform={`translate(0 ${(1 - c2) * 30})`}>
        <rect x={90} y={660} width={900} height={780} rx={30} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={5} />
        <T x={150} y={760} size={52} anchor="start" color={C.signalTeal}>
          2 · check with a
        </T>
        <T x={150} y={830} size={52} anchor="start" color={C.signalTeal}>
          food thermometer
        </T>
        <Section outer={0.65} core={0.6} x={690} y={1180} s={0.6} />
        <g transform={`translate(0 ${lerp(-180, 0, probe)})`} opacity={probe}>
          <path d="M690 1190 L690 1000" stroke={C.warmIvory} strokeWidth={8} strokeLinecap="round" />
          <Thermometer x={690} y={930} h={150} level={0.7} outline={C.warmIvory} fill={C.energyOrange} empty={INK_3} />
        </g>
      </g>
    </VStage>
  );
};

export const ST07Finish: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const waves = progress(f, beat("waves"), 14, easeOut);
  const heat = progress(f, beat("heat"), 50);
  const done = progress(f, beat("done"), 14, easeOut);
  return (
    <VStage>
      <Display x={W / 2} y={300} text="0:00" />
      <Chip x={W / 2} y={470} text="waves: done ✓" p={waves} color={C.signalTeal} size={56} />
      <Section outer={lerp(0.66, 0.62, heat)} core={lerp(0.45, 0.6, heat)} y={1000} s={0.85} />
      <Arrows p={0.7 * (1 - done)} f={f} s={0.85} />
      <Chip x={W / 2} y={1400} text="heat: done ✓" p={done} color={C.discoveryGold} size={56} />
    </VStage>
  );
};

export const standingTimeScenes: Record<string, React.FC<ShortSceneProps>> = {
  ST01: ST01Beep,
  ST02: ST02OutsideHot,
  ST03: ST03FlowsIn,
  ST04: ST04Standing,
  ST05: ST05SameHeat,
  ST06: ST06StandCheck,
  ST07: ST07Finish,
};
