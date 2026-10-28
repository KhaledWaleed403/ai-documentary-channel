// Short · CandyBarDiscovery (CB01 … CB06): the melted candy bar to the patent.
// History look: blueprint line art on navy, ivory only for the patent page.
import React from "react";
import { SignalPath } from "../../components/SignalPath";
import { easeOut, lerp, progress } from "../../animations/timing";
import { CandyBar, MagnetronBlock, OvenFront, Ripples, Silhouette, heatColor } from "../episode001Long/shared";
import { C, Chip, INK_2, INK_3, LINE, ShortSceneProps, T, VStage, W, useShotTime } from "./shared";

// Lab-coat panel with a pocket; the bar sits between the coat and the pocket front.
const Pocket: React.FC<{ barY: number; sag: number; warm?: number }> = ({ barY, sag, warm = 0 }) => (
  <g>
    <path d="M60 -40 L1020 -40 L1080 1960 L0 1960 Z" fill={INK_2} stroke={LINE} strokeWidth={4} />
    <path d="M880 -40 L900 1960" stroke={LINE} strokeWidth={4} strokeDasharray="10 14" />
    {[260, 620, 980, 1340, 1700].map((y) => (
      <circle key={y} cx={940} cy={y} r={16} fill="none" stroke={LINE} strokeWidth={4} />
    ))}
    <circle cx={540} cy={barY} r={200} fill={C.discoveryGold} opacity={warm * 0.12} filter="url(#soft)" />
    <CandyBar x={540} y={barY} w={400} sag={sag} rotate={-3} />
    <path d="M260 900 L820 900 L800 1420 Q540 1480 280 1420 Z" fill={INK_3} stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={6} />
    <path d="M260 950 L820 950" stroke={C.warmIvory} strokeOpacity={0.35} strokeWidth={4} strokeDasharray="10 12" />
  </g>
);

export const CB01Pocket: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const up = progress(f, beat("bar"), 30, easeOut);
  const sag = progress(f, beat("sag"), 30);
  const unseen = progress(f, beat("unseen"), 20);
  const push = lerp(1, 1.1, f / length);
  return (
    <VStage grid={false}>
      <g opacity={progress(f, 0, 12)}>
        <g transform={`translate(540 1000) scale(${push}) translate(-540 -1000)`}>
          <Pocket barY={lerp(1080, 850, up)} sag={sag} warm={sag} />
        </g>
      </g>
      {/* invisible waves arriving from off-screen: no source shown yet */}
      <Ripples x={1500} y={700} t={Math.max(0, f - beat("unseen")) + 60} maxR={1300} count={7} speed={7} opacity={0.55 * unseen} />
      <Chip x={W / 2} y={260} text="1940s" p={progress(f, beat("bar") + 10, 16)} color={C.warmIvory} />
      <g opacity={unseen} transform={`translate(540 ${560 - unseen * 20})`}>
        <T x={0} y={0} size={180} weight={900} color={C.discoveryGold}>
          ?
        </T>
      </g>
    </VStage>
  );
};

export const CB02Magnetron: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const pull = progress(f, 0, 50);
  const glow = progress(f, beat("glow"), 20);
  const melt = progress(f, beat("melt"), 30);
  const rip = Math.max(0, f - beat("glow"));
  return (
    <VStage>
      {/* pull back from the pocket to the whole scene */}
      <g transform={`translate(470 1150) scale(${lerp(1.35, 1, pull)}) translate(-470 -1150)`}>
        {/* bench */}
        <rect x={560} y={860} width={460} height={24} rx={8} fill={INK_3} stroke={LINE} strokeWidth={4} />
        <path d="M600 884 L600 1180 M980 884 L980 1180" stroke={LINE} strokeWidth={6} />
        <Ripples x={780} y={700} t={rip} maxR={760} count={6} speed={5} opacity={0.8} />
        <MagnetronBlock x={780} y={700} w={320} h={190} glow={glow} label={false} />
        <T x={780} y={960} size={48} color={C.mistBlue} opacity={glow}>
          magnetron
        </T>
        <Silhouette x={330} y={1360} s={1.55} />
        <circle cx={460} cy={1160} r={90} fill={C.energyOrange} opacity={melt * 0.35} filter="url(#soft)" />
        <CandyBar x={460} y={1162} w={96} sag={0.2 + 0.8 * melt} rotate={-6} />
      </g>
      <Chip x={W / 2} y={260} text="Percy Spencer · Raytheon" p={progress(f, beat("name"), 16)} color={C.warmIvory} />
      <Chip x={W / 2} y={1440} text="invisible waves" p={progress(f, beat("melt") + 8, 14)} color={C.signalTeal} />
    </VStage>
  );
};

const TestCard: React.FC<{ y: number; title: string; p: number; id: string; children: React.ReactNode }> = ({ y, title, p, id, children }) => (
  <g opacity={p} transform={`translate(0 ${(1 - p) * 40})`}>
    <defs>
      <clipPath id={id}>
        <rect x={90} y={y} width={900} height={560} rx={30} />
      </clipPath>
    </defs>
    <rect x={90} y={y} width={900} height={560} rx={30} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={5} />
    <T x={140} y={y + 80} size={50} anchor="start" color={C.discoveryGold}>
      {title}
    </T>
    <g clipPath={`url(#${id})`}>{children}</g>
  </g>
);

const KERNELS = Array.from({ length: 7 }, (_, i) => ({ x: 600 + (i % 4) * 70 + (i > 3 ? 35 : 0), y: i > 3 ? 650 : 700, i }));

export const CB03Testing: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const c1 = progress(f, beat("card1"), 18, easeOut);
  const c2 = progress(f, beat("card2"), 18, easeOut);
  const pop = (i: number) => progress(f, beat("pop") + i * 3, 8, easeOut);
  const shake = progress(f, beat("card2") + 10, 20) * (1 - progress(f, beat("burst"), 2));
  const burst = progress(f, beat("burst"), 8, easeOut);
  return (
    <VStage>
      <T x={W / 2} y={250} size={60} weight={800} opacity={progress(f, 0, 16)}>
        Testing food on purpose
      </T>
      <TestCard y={330} title="TEST 1 · popcorn" p={c1} id="cbCard1">
        <Ripples x={250} y={640} t={Math.max(0, f - beat("card1"))} maxR={600} count={5} speed={6} opacity={0.6} clip="url(#cbCard1)" />
        <MagnetronBlock x={250} y={640} w={200} h={130} glow={0.8} label={false} />
        <rect x={560} y={730} width={360} height={22} rx={10} fill={INK_3} stroke={LINE} strokeWidth={4} />
        {KERNELS.map(({ x, y, i }) => {
          const p = pop(i);
          return (
            <g key={i} transform={`translate(${x} ${y - p * 40})`}>
              <ellipse rx={lerp(16, 38, p)} ry={lerp(20, 32, p)} fill={p > 0.3 ? C.warmIvory : C.discoveryGold} stroke={C.inkNavy} strokeWidth={3} />
              {p > 0.3 ? <circle cx={-14} cy={-10} r={18 * p} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={3} /> : null}
            </g>
          );
        })}
      </TestCard>
      <TestCard y={950} title="TEST 2 · egg" p={c2} id="cbCard2">
        <Ripples x={250} y={1260} t={Math.max(0, f - beat("card2"))} maxR={600} count={5} speed={6} opacity={0.6} clip="url(#cbCard2)" />
        <MagnetronBlock x={250} y={1260} w={200} h={130} glow={0.8} label={false} />
        <g transform={`translate(720 1290) rotate(${shake * 6 * Math.sin(f * 1.3)})`} opacity={1 - burst}>
          <ellipse rx={80} ry={104} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={4} />
        </g>
        <g opacity={burst}>
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const r = 40 + 170 * burst * (0.6 + 0.4 * Math.sin(i * 2.3) ** 2);
            return <ellipse key={i} cx={720 + Math.cos(a) * r} cy={1290 + Math.sin(a) * r} rx={26} ry={18} fill={i % 3 ? C.warmIvory : C.discoveryGold} transform={`rotate(${(a * 180) / Math.PI} ${720 + Math.cos(a) * r} ${1290 + Math.sin(a) * r})`} />;
          })}
          <circle cx={720} cy={1290} r={50 * burst} fill={C.discoveryGold} />
        </g>
      </TestCard>
    </VStage>
  );
};

export const CB04Concentrate: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const top = progress(f, beat("spread"), 18);
  const bottom = progress(f, beat("chamber"), 20);
  const fill = progress(f, beat("chamber") + 10, 50);
  const heat = progress(f, beat("heat"), 40);
  const path: [number, number][] = [
    [300, 1240],
    [820, 1120],
    [400, 1460],
    [820, 1300],
    [300, 1140],
    [740, 1460],
    [300, 1360],
  ];
  return (
    <VStage>
      <g opacity={top}>
        <T x={W / 2} y={300} size={60} color={C.mistBlue}>
          spread out
        </T>
        <Ripples x={540} y={620} t={Math.max(0, f - beat("spread"))} maxR={480} count={5} speed={5} opacity={0.55} />
        <circle cx={540} cy={620} r={22} fill={C.signalTeal} />
      </g>
      <path d="M120 900 L960 900" stroke={LINE} strokeWidth={4} strokeDasharray="12 14" opacity={bottom} />
      <g opacity={bottom}>
        <T x={W / 2} y={1030} size={60} color={C.signalTeal}>
          concentrated
        </T>
        <rect x={240} y={1100} width={600} height={380} rx={20} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={8} />
        <rect x={240} y={1100} width={600} height={380} rx={20} fill={C.signalTeal} opacity={fill * 0.16} />
        <SignalPath points={path} progress={fill} stroke={C.signalTeal} width={5} amplitude={9} wavelength={40} phase={f * 0.4} opacity={0.85} />
        <circle cx={240} cy={1240} r={20} fill={C.signalTeal} />
        <ellipse cx={560} cy={1400} rx={130} ry={44} fill={heatColor(0.05 + 0.85 * heat)} stroke={C.inkNavy} strokeWidth={4} />
      </g>
      <Chip x={W / 2} y={1600} text="food heats fast" p={progress(f, beat("heat") + 10, 14)} color={C.energyOrange} />
    </VStage>
  );
};

export const CB05Patent: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const page = progress(f, beat("page"), 24, easeOut);
  const stamp = progress(f, beat("stamp"), 8, easeOut);
  const ink = C.inkNavy;
  return (
    <VStage>
      <g transform={`translate(0 ${(1 - page) * 900}) rotate(${(1 - page) * 4} 540 900)`}>
        <rect x={150} y={260} width={780} height={1200} rx={8} fill={C.warmIvory} />
        <rect x={150} y={260} width={780} height={1200} rx={8} fill="none" stroke="#D6CDB5" strokeWidth={6} />
        <T x={540} y={380} size={64} color={ink} weight={800}>
          PATENT
        </T>
        <T x={540} y={444} size={40} color="#5B6475" weight={600}>
          cooking food with microwaves
        </T>
        {[520, 560, 600].map((y) => (
          <rect key={y} x={230} y={y} width={620} height={14} rx={7} fill="#D9D1BC" />
        ))}
        {/* original schematic: chamber, magnetron block, food */}
        <g fill="none" stroke={ink} strokeWidth={5}>
          <rect x={290} y={700} width={500} height={330} rx={10} />
          <rect x={300} y={600} width={170} height={100} rx={10} />
          <path d="M385 700 L385 760" />
          <ellipse cx={560} cy={960} rx={120} ry={38} />
          <path d="M330 1060 L750 1060" strokeDasharray="10 10" />
        </g>
        {[1110, 1150].map((y) => (
          <rect key={y} x={230} y={y} width={620} height={14} rx={7} fill="#D9D1BC" />
        ))}
      </g>
      <g transform={`translate(540 1300) rotate(-6) scale(${lerp(1.5, 1, stamp)})`} opacity={stamp}>
        <rect x={-330} y={-66} width={660} height={110} rx={12} fill="none" stroke={C.energyOrange} strokeWidth={8} />
        <T x={0} y={8} size={54} color={C.energyOrange} weight={800}>
          Filed Oct. 8, 1945
        </T>
      </g>
    </VStage>
  );
};

export const CB06Start: React.FC<ShortSceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const enter = progress(f, 0, 16);
  const xray = progress(f, beat("xray"), 24) * (1 - progress(f, beat("pocket"), 20));
  const approach = progress(f, beat("press") - 30, 22, easeOut);
  const press = progress(f, beat("press") - 6, 6, easeOut) - progress(f, beat("press") + 6, 10);
  const toPocket = progress(f, beat("pocket"), 30);
  const chip = progress(f, beat("pocket") + 30, 18);
  const w = 900;
  const h = w * 0.56;
  const lattice = (
    <g opacity={xray}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={C.signalTeal} opacity={0.08} />
      {Array.from({ length: 6 }).map((_, i) => (
        <SignalPath key={i} points={[[-430, -170 + i * 60], [200, -170 + i * 60]]} progress={1} stroke={C.signalTeal} width={4} amplitude={10} wavelength={50} phase={f * 0.35 + i} opacity={0.45} />
      ))}
      <ellipse cx={-120} cy={140} rx={170} ry={30} fill={heatColor(0.2 + 0.5 * xray)} opacity={0.9} />
    </g>
  );
  return (
    <VStage>
      <g opacity={enter * (1 - toPocket)}>
        <OvenFront x={540} y={820} w={w} inside={lattice} timer="1:30" />
        <g opacity={xray}>
          <T x={W / 2} y={440} size={48} color={C.mistBlue}>
            magnetron + metal box
          </T>
        </g>
        {/* finger pressing Start */}
        <rect x={540 + w * 0.25} y={820 - h / 2 + h * 0.7} width={w * 0.15} height={h * 0.09} rx={8} fill={C.signalTeal} opacity={press * 0.8} />
        <g transform={`translate(832 ${lerp(1320, 950, approach) + press * 10})`} opacity={approach * (1 - progress(f, beat("pocket") - 10, 10))}>
          <rect x={-34} y={0} width={68} height={300} rx={34} fill="#33425C" stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={4} />
          <path d="M-20 26 Q0 14 20 26" stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={4} fill="none" />
        </g>
      </g>
      <g opacity={toPocket}>
        <g transform={`translate(540 960) scale(${lerp(0.9, 1, toPocket)}) translate(-540 -960)`}>
          <Pocket barY={850} sag={1} warm={1} />
        </g>
      </g>
      <Chip x={W / 2} y={260} text="melted snack → every kitchen" p={chip} color={C.discoveryGold} size={48} />
    </VStage>
  );
};

export const candyBarScenes: Record<string, React.FC<ShortSceneProps>> = {
  CB01: CB01Pocket,
  CB02: CB02Magnetron,
  CB03: CB03Testing,
  CB04: CB04Concentrate,
  CB05: CB05Patent,
  CB06: CB06Start,
};
