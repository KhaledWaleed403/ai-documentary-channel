// Scene 1 · The melted pocket (S1-01 … S1-03).
import React from "react";
import { CameraFrame } from "../../components/CameraFrame";
import { TextReveal } from "../../components/TextReveal";
import { easeOut } from "../../animations/timing";
import { C, CandyBar, INK_2, INK_3, LINE, MagnetronBlock, Ripples, SceneProps, Silhouette, Stage, lerp, progress, useShotTime } from "./shared";

// Lab-coat panel with a pocket, in blueprint line art.
export const CoatPocket: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <g>
    <path d="M360 -40 L1560 -40 L1640 1120 L280 1120 Z" fill={INK_2} stroke={LINE} strokeWidth={4} />
    <path d="M960 -40 L960 1120" stroke={LINE} strokeWidth={4} strokeDasharray="10 14" />
    {[200, 420, 640, 860].map((y) => (
      <circle key={y} cx={1000} cy={y} r={14} fill="none" stroke={LINE} strokeWidth={4} />
    ))}
    {children}
    {/* pocket front drawn over the bar so the bar sits inside it */}
    <path d="M560 560 L880 560 L870 900 Q720 940 570 900 Z" fill={INK_3} stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={5} />
    <path d="M560 600 L880 600" stroke={C.warmIvory} strokeOpacity={0.35} strokeWidth={3} strokeDasharray="8 10" />
  </g>
);

const Hand: React.FC<{ x: number; y: number; opacity: number }> = ({ x, y, opacity }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <path d="M-60 -420 L-40 -40 Q-40 10 10 14 L60 10 Q90 0 86 -40 L80 -420 Z" fill="#33425C" stroke={C.warmIvory} strokeOpacity={0.6} strokeWidth={4} />
    <path d="M-40 -60 Q-70 -20 -50 20" stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={4} fill="none" />
  </g>
);

export const S1Pocket: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const fadeUp = progress(f, 0, 24);
  const handIn = progress(f, beat(1), 40);
  const lift = progress(f, beat(1) + 40, beat(2) - beat(1) - 30, easeOut);
  const sag = progress(f, beat(2) - 10, 40);
  const scale = lerp(1.0, 1.12, f / length);
  const barY = lerp(780, 528, lift);
  return (
    <Stage grid>
      <g opacity={fadeUp}>
        <g transform={`translate(960 540) scale(${scale}) translate(-960 -540)`}>
          <CoatPocket>
            {/* hand behind the bar; it lets go once the bar is out, so the bar stays visible */}
            <Hand x={740} y={lerp(160, barY - 20, handIn)} opacity={handIn * (1 - progress(f, beat(2) - 20, 20))} />
            <CandyBar x={720} y={barY} w={220} sag={sag} rotate={lerp(0, -3, lift)} />
          </CoatPocket>
        </g>
      </g>
    </Stage>
  );
};

export const S1Magnetron: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const pull = progress(f, 0, 45);
  const glow = progress(f, beat(1), 20);
  const rip = Math.max(0, f - beat(2));
  return (
    <CameraFrame scale={lerp(1.12, 1, pull)} originX={760} originY={600}>
      <Stage grid>
        {/* bench */}
        <rect x={1080} y={720} width={760} height={26} rx={8} fill={INK_3} stroke={LINE} strokeWidth={4} />
        <path d="M1120 746 L1120 1000 M1800 746 L1800 1000" stroke={LINE} strokeWidth={6} />
        <path d="M1320 720 L1320 640 L1520 640 L1520 720" fill="none" stroke={LINE} strokeWidth={5} />
        <Ripples x={1420} y={560} t={rip} maxR={900} count={6} speed={5} opacity={0.85} />
        <MagnetronBlock x={1420} y={560} w={300} h={170} glow={glow} />
        <Silhouette x={760} y={720} s={1.1} />
        <CandyBar x={826} y={596} w={84} sag={0.9} rotate={-8} />
      </Stage>
    </CameraFrame>
  );
};

const RadarIcon = () => (
  <g fill="none" stroke={C.warmIvory} strokeWidth={6} strokeLinecap="round">
    <path d="M-70 40 Q0 -90 70 40 Z" />
    <path d="M0 0 L60 -60 M0 40 L0 90 M-40 90 L40 90" />
  </g>
);
const OvenIcon = () => (
  <g fill="none" stroke={C.warmIvory} strokeWidth={6}>
    <rect x={-95} y={-60} width={190} height={120} rx={14} />
    <rect x={-80} y={-44} width={110} height={88} rx={8} />
    <path d="M52 -40 L76 -40 M52 -16 L76 -16 M52 8 L76 8" strokeLinecap="round" />
  </g>
);
const PlateIcon = () => (
  <g>
    <ellipse cx={0} cy={0} rx={100} ry={44} fill="none" stroke={C.warmIvory} strokeWidth={6} />
    <path d="M-62 -4 A64 26 0 0 1 0 -26 L0 22 A64 26 0 0 1 -62 -4 Z" fill={C.energyOrange} />
    <path d="M0 -26 A64 26 0 0 1 62 -4 A64 26 0 0 1 0 22 Z" fill={C.mistBlue} />
  </g>
);

export const S1Questions: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const icons = [beat(0), beat(1), beat(2)].map((b) => progress(f, b, 18, easeOut));
  const out = 1 - progress(f, beat(3), 14);
  const under = progress(f, beat(4) - 6, 30);
  const push = lerp(1, 1.02, progress(f, beat(3), 90));
  return (
    <Stage
      grid
      overlay={
        <div style={{ position: "absolute", inset: 0, transform: `scale(${push})` }}>
          <TextReveal text="How does a microwave actually heat food?" start={beat(3)} top={410} color={C.warmIvory} fontSize={92} stagger={3} />
        </div>
      }
    >
      <g opacity={out}>
        {[RadarIcon, OvenIcon, PlateIcon].map((Icon, i) => (
          <g key={i} transform={`translate(${560 + i * 400} ${520 + (1 - icons[i]) * 30})`} opacity={icons[i]}>
            <Icon />
            {i < 2 ? <path d="M150 0 L230 0 M210 -16 L232 0 L210 16" stroke={C.signalTeal} strokeWidth={5} fill="none" opacity={icons[i + 1]} /> : null}
          </g>
        ))}
      </g>
      <path
        d={`M${960 - 560 * under} 670 Q960 ${670 + 18 * Math.sin(f * 0.1)} ${960 + 560 * under} 670`}
        stroke={C.signalTeal}
        strokeWidth={6}
        fill="none"
        opacity={under}
        strokeLinecap="round"
      />
    </Stage>
  );
};
