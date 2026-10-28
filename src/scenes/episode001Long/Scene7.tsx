// Scene 7 · Payoff (S7-01 … S7-03): one continuous push-in on a kitchen oven,
// X-ray layers that recap the mechanism, then the candy-bar callback.
import React from "react";
import { TextReveal } from "../../components/TextReveal";
import { SignalPath } from "../../components/SignalPath";
import { longShot } from "../../data/episode001Long";
import { CoatPocket } from "./Scene1";
import { C, CandyBar, INK_2, Molecule, OvenFront, SceneProps, Stage, heatColor, lerp, progress, twist, useShotTime, wobble } from "./shared";

// The push-in spans all of Scene 7 (absolute frames).
const usePush = (absFrame: number) => {
  const a = longShot("S7-01").startFrame;
  const b = longShot("S7-03").startFrame + 60;
  return lerp(1, 1.15, Math.max(0, Math.min(1, (absFrame - a) / (b - a))));
};

const Counter = () => <rect x={0} y={800} width={1920} height={280} fill={INK_2} />;

// X-ray content inside the oven window (window local coords ~ -400..170, -220..220 for w=1000).
const XRay: React.FC<{ f: number; glow: number; lattice: number; map: number }> = ({ f, glow, lattice, map }) => (
  <g>
    <rect x={40} y={-200} width={110} height={70} rx={10} fill={C.signalTeal} opacity={0.15 + 0.6 * glow} />
    <g opacity={lattice * 0.6}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SignalPath key={i} points={[[-430, -170 + i * 64], [170, -170 + i * 64]]} progress={1} stroke={C.signalTeal} width={3} amplitude={8} wavelength={90} phase={f * 0.25 + i} />
      ))}
    </g>
    <g opacity={map}>
      <ellipse cx={-130} cy={150} rx={250} ry={44} fill="none" stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={4} />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2 + f * 0.02;
        const h = 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(i * 2.3));
        return <circle key={i} cx={-130 + Math.cos(a) * 150} cy={130 + Math.sin(a) * 26} r={34} fill={heatColor(h)} opacity={0.85} filter="url(#soft)" />;
      })}
    </g>
  </g>
);

export const S7Start: React.FC<SceneProps> = ({ shot }) => {
  const { f } = useShotTime(shot);
  const push = usePush(shot.startFrame + f);
  const settle = progress(f, 0, 40);
  return (
    <Stage>
      <g transform={`translate(960 540) scale(${push}) translate(-960 -540)`}>
        <Counter />
        <OvenFront x={960} y={520} w={1000} inside={<XRay f={f} glow={0} lattice={0} map={0} />} />
        <g opacity={1 - settle}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${700 + i * 120} 260 Q${720 + i * 120} 200 ${700 + i * 120} 140`} fill="none" stroke={C.signalTeal} strokeWidth={5} strokeDasharray="14 12" />
          ))}
        </g>
      </g>
    </Stage>
  );
};

export const S7XRay: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const push = usePush(shot.startFrame + f);
  const glow = progress(f, beat(0), 20);
  const lattice = progress(f, beat(1), 30);
  const inset = progress(f, beat(2), 24);
  const map = progress(f, beat(4), 30);
  const warm = progress(f, beat(2) + 40, 80);
  return (
    <Stage
      overlay={<TextReveal text="Waves → molecules → heat" start={beat(3)} top={930} color={C.warmIvory} fontSize={52} stagger={4} />}
    >
      <g transform={`translate(960 540) scale(${push}) translate(-960 -540)`}>
        <Counter />
        <OvenFront x={960} y={520} w={1000} inside={<XRay f={f} glow={glow} lattice={lattice} map={map} />} />
      </g>
      <g opacity={inset} transform="translate(250 260)">
        <circle r={190} fill={INK_2} stroke={C.signalTeal} strokeWidth={5} />
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i / 7) * Math.PI * 2;
          const r = i === 0 ? 0 : 110;
          return (
            <Molecule
              key={i}
              x={Math.cos(a) * r + 10 * wobble(f * 2, i)}
              y={Math.sin(a) * r + 10 * wobble(f * 2, i + 9)}
              angle={twist(f, i, 1) + 40 * warm * wobble(f * 2.5, i) + i * 50}
              s={0.55}
              color={heatColor(0.7 * warm)}
            />
          );
        })}
      </g>
    </Stage>
  );
};

export const S7Callback: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const push = usePush(shot.startFrame + f);
  const fadeLayers = progress(f, 0, 30);
  const dissolve = progress(f, beat(1), 45);
  const card = progress(f, beat(2), 30);
  const fadeOut = progress(f, length - 24, 24);
  return (
    <Stage
      overlay={
        <div style={{ position: "absolute", inset: 0, opacity: card * (1 - fadeOut) }}>
          <TextReveal text="How does a microwave actually heat food?" start={beat(2)} top={300} color={C.warmIvory} fontSize={76} stagger={3} />
        </div>
      }
    >
      <g opacity={(1 - dissolve) * (1 - card)}>
        <g transform={`translate(960 540) scale(${push}) translate(-960 -540)`}>
          <Counter />
          <OvenFront x={960} y={520} w={1000} timer="0:00" inside={<XRay f={f} glow={1 - fadeLayers} lattice={1 - fadeLayers} map={1 - fadeLayers} />} />
        </g>
      </g>
      <g opacity={dissolve * (1 - card)}>
        <CoatPocket>
          <CandyBar x={720} y={528} w={220} sag={1} rotate={-3} />
        </CoatPocket>
      </g>
      <rect x={0} y={0} width={1920} height={1080} fill="#000" opacity={fadeOut} />
    </Stage>
  );
};
