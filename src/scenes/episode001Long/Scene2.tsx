// Scene 2 · Popcorn, an egg and a box (S2-01 … S2-06).
import React from "react";
import { interpolate } from "remotion";
import { easeOut } from "../../animations/timing";
import { SignalPath } from "../../components/SignalPath";
import { StepDiagram } from "../../components/StepDiagram";
import { C, CandyBar, INK_2, INK_3, LINE, MagnetronBlock, Ripples, SceneProps, Stage, Stamp, Txt, heatColor, lerp, progress, useShotTime } from "./shared";

const SchoolIcon = () => (
  <g fill="none" stroke={C.warmIvory} strokeWidth={5} strokeLinejoin="round">
    <path d="M-60 60 L-60 -10 L0 -60 L60 -10 L60 60 Z" />
    <rect x={-18} y={14} width={36} height={46} />
  </g>
);
const RadioKeyIcon = () => (
  <g fill="none" stroke={C.warmIvory} strokeWidth={5} strokeLinecap="round">
    <rect x={-70} y={30} width={140} height={26} rx={6} />
    <path d="M-40 30 L30 -10 L60 -10" />
    <circle cx={60} cy={-10} r={14} />
    <path d="M-10 -50 Q10 -70 30 -50 M-24 -64 Q10 -96 44 -64" stroke={C.signalTeal} />
  </g>
);
const BooksIcon = () => (
  <g fill="none" stroke={C.warmIvory} strokeWidth={5}>
    <rect x={-70} y={20} width={140} height={34} rx={4} />
    <rect x={-60} y={-16} width={124} height={34} rx={4} />
    <rect x={-50} y={-52} width={110} height={34} rx={4} />
  </g>
);

export const S2Biography: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const reveal = [beat(1), beat(2), beat(3)].map((b) => progress(f, b, 18));
  const conv = progress(f, beat(4), 18);
  // Conveyor speeds up: travelled distance grows quadratically.
  const ct = Math.max(0, f - beat(4));
  const travel = 0.9 * ct * ct * 0.05 + ct * 2;
  const count = Math.round(interpolate(f, [beat(4), Math.min(length - 10, beat(4) + 60)], [0, 2600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const pan = lerp(80, -80, f / length);
  return (
    <Stage grid>
      <g transform={`translate(${pan} 0)`}>
        <path d={`M300 400 L${300 + 1320 * progress(f, beat(0), 30)} 400`} stroke={LINE} strokeWidth={4} />
        <StepDiagram
          x={440}
          y={400}
          spacing={520}
          reveal={reveal}
          steps={[
            { label: "left school at ~12", icon: <SchoolIcon /> },
            { label: "Navy radio", icon: <RadioKeyIcon /> },
            { label: "self-taught", icon: <BooksIcon /> },
          ]}
        />
      </g>
      <g opacity={conv}>
        <rect x={120} y={760} width={1680} height={20} rx={10} fill={INK_3} stroke={LINE} strokeWidth={4} />
        {Array.from({ length: 12 }).map((_, i) => {
          const x = ((i * 190 + travel) % 2280) - 180;
          return <MagnetronBlock key={i} x={x} y={705} w={120} h={80} glow={0.5} label={false} />;
        })}
        <Txt x={960} y={900} size={64} color={C.discoveryGold} weight={700}>
          {count.toLocaleString("en-US")} magnetrons / day
        </Txt>
        <Txt x={960} y={950} size={28} color={C.mistBlue} opacity={0.8}>
          wartime radar production
        </Txt>
      </g>
    </Stage>
  );
};

// Lab bench used by S2-02 … S2-04.
const Bench: React.FC<{ children?: React.ReactNode; rip?: number }> = ({ children, rip = 0 }) => (
  <g>
    <rect x={160} y={760} width={1600} height={30} rx={10} fill={INK_3} stroke={LINE} strokeWidth={4} />
    <path d="M220 790 L220 1080 M1700 790 L1700 1080" stroke={LINE} strokeWidth={8} />
    <Ripples x={480} y={600} t={rip} maxR={900} count={6} speed={5} opacity={rip > 0 ? 0.8 : 0} />
    <MagnetronBlock x={480} y={600} w={300} h={180} glow={rip > 0 ? 0.8 : 0.3} />
    <CandyBar x={1560} y={735} w={130} sag={0.9} />
    {children}
  </g>
);

const Dish: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-130 -30 Q-120 30 0 30 Q120 30 130 -30 Z" fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={5} />
    <ellipse cx={0} cy={-30} rx={130} ry={18} fill="#D9D2C2" stroke={C.inkNavy} strokeWidth={4} />
  </g>
);

export const S2Testing: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const set = progress(f, beat(0), 22, easeOut);
  return (
    <Stage grid>
      <Bench>
        <g transform={`translate(0 ${lerp(-260, 0, set)})`} opacity={set}>
          <Dish x={1050} y={730} />
          <path d={`M1050 ${560} L1050 ${700}`} stroke="#33425C" strokeWidth={60} strokeLinecap="round" opacity={1 - progress(f, beat(0) + 22, 14)} />
        </g>
      </Bench>
    </Stage>
  );
};

const KERNELS = [
  [-70, -38], [-30, -44], [10, -40], [50, -46], [86, -36], [-50, -30], [30, -30], [-10, -34],
] as const;

export const S2Popcorn: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const rip = Math.max(0, f - beat(0) + 60);
  const push = lerp(1, 1.03, f / length);
  return (
    <Stage grid>
      <g transform={`translate(1050 700) scale(${push}) translate(-1050 -700)`}>
        <Bench rip={rip}>
          <Dish x={1050} y={730} />
          {KERNELS.map(([dx, dy], i) => {
            const popAt = beat(1) + [0, 4, 9, 13, 19, 26, 32, 40][i];
            const p = progress(f, popAt, 6, easeOut);
            const jump = p > 0 ? -60 * Math.sin(Math.min(1, (f - popAt) / 14) * Math.PI) : 0;
            return (
              <g key={i} transform={`translate(${1050 + dx} ${700 + dy + jump})`}>
                {p < 1 ? <ellipse cx={0} cy={0} rx={12} ry={9} fill="#D9A441" opacity={1 - p} /> : null}
                <g opacity={p} transform={`scale(${0.4 + 0.6 * p})`}>
                  {[0, 72, 144, 216, 288].map((a) => (
                    <circle key={a} cx={14 * Math.cos((a * Math.PI) / 180)} cy={14 * Math.sin((a * Math.PI) / 180)} r={15} fill={C.warmIvory} />
                  ))}
                </g>
              </g>
            );
          })}
        </Bench>
      </g>
    </Stage>
  );
};

export const S2Egg: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const wob = Math.sin((f - beat(0)) * 0.9) * 6 * (progress(f, beat(0), 4) - progress(f, beat(0) + 12, 4)) + Math.sin((f - beat(1)) * 0.9) * 8 * (progress(f, beat(1), 4) - progress(f, beat(1) + 12, 4));
  const burst = progress(f, beat(2), 5, easeOut);
  const bump = f >= beat(2) && f < beat(2) + 2 ? 1.02 : 1;
  return (
    <Stage grid>
      <g transform={`translate(1050 680) scale(${bump}) translate(-1050 -680)`}>
        <Bench rip={f + 200}>
          <Dish x={1050} y={730} />
          {burst < 1 ? (
            <g transform={`translate(1050 640) rotate(${wob})`} opacity={1 - burst}>
              <ellipse cx={0} cy={0} rx={52} ry={68} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={4} />
            </g>
          ) : null}
          <g opacity={burst} transform="translate(1050 640)">
            {Array.from({ length: 14 }).map((_, i) => {
              const a = (i / 14) * Math.PI * 2;
              const r = 60 + 110 * burst + 30 * Math.sin(i * 3.3);
              return <ellipse key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r * 0.75} rx={18 + 8 * Math.sin(i)} ry={12} fill={i % 3 === 0 ? C.discoveryGold : C.warmIvory} transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * r} ${Math.sin(a) * r * 0.75})`} />;
            })}
            <circle cx={0} cy={0} r={46 * burst} fill={C.discoveryGold} opacity={0.9} />
          </g>
        </Bench>
      </g>
    </Stage>
  );
};

export const S2Concentrate: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const left = Math.max(0, f - beat(0));
  const funnel = progress(f, beat(1), 30);
  const fill = progress(f, beat(2), 50);
  const warm = progress(f, beat(3), 30);
  // reflecting paths inside the chamber (x 1180..1700, y 380..760)
  const bounces: [number, number][][] = [
    [[1140, 570], [1360, 380], [1580, 760], [1700, 560], [1480, 380]],
    [[1140, 570], [1300, 760], [1520, 380], [1700, 700], [1420, 760]],
    [[1140, 570], [1460, 380], [1700, 450], [1560, 760], [1260, 600]],
  ];
  return (
    <Stage grid>
      <line x1={960} y1={160} x2={960} y2={920} stroke={LINE} strokeWidth={3} strokeDasharray="8 12" />
      {/* left: open space */}
      <Ripples x={320} y={570} t={left} maxR={760} count={6} speed={5} opacity={0.85} />
      <MagnetronBlock x={320} y={570} w={200} h={130} glow={0.8} label={false} />
      <Txt x={480} y={960} size={44} color={C.mistBlue}>
        spread out
      </Txt>
      {/* right: concentrated in a chamber */}
      <g opacity={funnel}>
        <MagnetronBlock x={1080} y={570} w={150} h={110} glow={0.8} label={false} />
        <rect x={1180} y={380} width={520} height={380} rx={16} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.8} strokeWidth={8} />
        <rect x={1180} y={380} width={520} height={380} rx={16} fill={C.signalTeal} opacity={0.18 * fill} />
        {bounces.map((pts, i) => (
          <SignalPath key={i} points={pts} progress={progress(f, beat(2) + i * 8, 40)} stroke={C.signalTeal} width={5} amplitude={10} wavelength={44} phase={f * 0.3} opacity={0.85} />
        ))}
        <ellipse cx={1440} cy={700} rx={110} ry={42} fill={heatColor(warm * 0.75)} stroke={C.inkNavy} strokeWidth={4} />
        <Txt x={1440} y={960} size={44} color={C.discoveryGold}>
          concentrated
        </Txt>
      </g>
    </Stage>
  );
};

// Original patent-style schematic (not a reproduction of the patent's own figure).
const PatentPage: React.FC<{ stampP: number }> = ({ stampP }) => (
  <g>
    <rect x={-360} y={-250} width={720} height={500} rx={6} fill={C.warmIvory} />
    <Txt x={0} y={-196} size={24} color={C.inkNavy} weight={700}>
      P. L. SPENCER · METHOD OF TREATING FOODSTUFFS
    </Txt>
    <Txt x={0} y={-160} size={24} color={C.inkNavy} weight={500}>
      U.S. Patent 2,495,429 · schematic illustration
    </Txt>
    <g fill="none" stroke={C.inkNavy} strokeWidth={3}>
      <rect x={-300} y={-110} width={150} height={100} />
      <path d="M-150 -60 L-40 -60 L-40 -20 L60 -20" />
      <rect x={60} y={-60} width={220} height={150} />
      <path d="M60 60 L280 60" strokeDasharray="6 6" />
      <ellipse cx={170} cy={40} rx={50} ry={18} />
      <path d="M-260 30 L-190 30 M-225 -10 L-225 70" />
    </g>
    <Txt x={-225} y={120} size={20} color={C.inkNavy} weight={500}>
      source
    </Txt>
    <Txt x={170} y={130} size={20} color={C.inkNavy} weight={500}>
      food in a restricted region
    </Txt>
    <g transform="translate(170 196) scale(0.5)">
      <Stamp x={0} y={0} text="Filed Oct. 8, 1945" p={stampP} color="#B04A2A" rotate={-4} />
    </g>
  </g>
);

export const S2Patent: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const slide = progress(f, beat(0), 26, easeOut);
  const stampP = progress(f, beat(1), 8, easeOut);
  const longP = progress(f, beat(2), 40);
  const shortP = progress(f, beat(3), 30);
  const push = lerp(1, 1.06, progress(f, beat(2), length - beat(2)));
  return (
    <Stage grid>
      <g transform={`translate(${lerp(1600, 960, slide)} 300) scale(0.9)`}>
        <PatentPage stampP={stampP} />
      </g>
      <g transform={`translate(960 830) scale(${push}) translate(-960 -830)`}>
        <path
          d={Array.from({ length: 61 }, (_, i) => `${i === 0 ? "M" : "L"}${60 + i * 30} ${760 - 50 * Math.sin((i / 60) * Math.PI * 2 * 1.2)}`).join(" ")}
          pathLength={1}
          strokeDasharray={`${longP} 2`}
          fill="none"
          stroke={C.mistBlue}
          strokeWidth={5}
          opacity={0.8}
        />
        <Txt x={960} y={700} size={34} color={C.mistBlue} opacity={longP}>
          earlier: much longer waves
        </Txt>
        <g opacity={shortP}>
          <SignalPath points={[[700, 900], [960, 900]]} progress={shortP} stroke={C.signalTeal} width={7} amplitude={34} wavelength={260} phase={Math.PI / 2} />
          <path d="M700 960 L960 960 M700 945 L700 975 M960 945 L960 975" stroke={C.warmIvory} strokeWidth={4} />
          <Txt x={830} y={1010} size={34} color={C.warmIvory}>
            ~10 cm
          </Txt>
          <path d="M1080 900 C1060 840 1180 830 1250 850 C1330 870 1340 950 1260 965 C1180 980 1100 960 1080 900 Z" fill="#B99A6B" stroke={C.warmIvory} strokeWidth={4} />
          <Txt x={1210} y={1030} size={28} color={C.mistBlue}>
            about food-sized
          </Txt>
        </g>
      </g>
    </Stage>
  );
};
