// Episode 002 long-form scenes (16:9, 1920×1080). One component per script
// scene; `beats` are the local start frames of the scene's narration shots, so
// every visual change is pinned to the line that motivates it.
import React from "react";
import { easeOut } from "../../animations/timing";
import { Checklist, F, Fact, K, Stage, SubCutaway, T, Tag, checkRows, pr, type RowState } from "./kit";
import {
  AirHud,
  Cleaners,
  ClockPanel,
  CommsColumn,
  CoatingSection,
  DepthRuler,
  Electrolyser,
  FramedTube,
  GpsSurface,
  Hatch,
  HullSection,
  InertialGlyphs,
  LengthCompare,
  NavMap,
  ReactorLoops,
  Scrubber,
  SoundRings,
} from "./panels";
import { Gauge } from "./kit";

export const W = 1920;
export const H = 1080;

export type LongSceneProps = { t: number; dur: number; beats: number[]; ends: number[] };

// Opacity window: fades in at `a`, out at `b` (local frames).
const win = (t: number, a: number, b: number, f = 12) => Math.min(pr(t, a, f), 1 - pr(t, b - f, f));

// Slow push-in across the whole scene.
const Drift: React.FC<{ t: number; dur: number; amount?: number; ox?: number; oy?: number; children: React.ReactNode }> = ({
  t,
  dur,
  amount = 0.035,
  ox = W / 2,
  oy = H / 2,
  children,
}) => {
  const s = 1 + amount * pr(t, 0, dur);
  return <g transform={`translate(${ox} ${oy}) scale(${s}) translate(${-ox} ${-oy})`}>{children}</g>;
};

const HUD: React.FC<{ active: number; t: number; extra?: { label: string; state: RowState }[]; all?: boolean }> = ({ active, t, extra, all }) => (
  <Checklist x={76} y={120} rows={checkRows(active, extra, all)} scale={0.78} opacity={pr(t, 0, 15)} />
);

const Caption: React.FC<{ text: string; sub?: string; opacity: number; y?: number }> = ({ text, sub, opacity, y = 1000 }) => (
  <Fact x={W / 2} y={y} text={text} source={sub} opacity={opacity} anchor="middle" size={36} />
);

// ---------- Scene 1: the hatch closes ----------
export const S01: React.FC<LongSceneProps> = ({ t, dur, beats }) => {
  const close = pr(t, 6, 55, easeOut);
  const seal = pr(t, 55, 14);
  const toSub = pr(t, 120, 30);
  return (
    <Stage w={W} h={H}>
      <g opacity={1 - toSub}>
        <g transform={`translate(960 540) scale(${1 + 0.18 * pr(t, 0, 120)}) translate(-960 -540)`}>
          <Hatch x={960} y={540} r={250} close={close} seal={seal} />
        </g>
      </g>
      <g opacity={toSub}>
        <rect x={0} y={250} width={W} height={H - 250} fill="url(#e2water)" opacity={0.9} />
        <line x1={0} y1={250} x2={W} y2={250} stroke={K.cyan} strokeWidth={3} opacity={0.6} />
        <SubCutaway x={960} y={250 + 300 * toSub} w={1500} breath={pr(t, 150, dur - 160)} flow={t} labels={0} tag={toSub} />
        <g opacity={pr(t, beats[1], 15)}>
          <T x={1650} y={980} size={30} color={K.muted} anchor="end" weight={700} spacing={2}>
            WEEKS · MONTHS
          </T>
        </g>
      </g>
      <Tag x={80} y={1000} text="145 crew — US Virginia-class" size={26} opacity={win(t, 30, beats[1] + 30)} color={K.ivory} />
    </Stage>
  );
};

// ---------- Scene 2: a sealed world ----------
export const S02: React.FC<LongSceneProps> = ({ t, dur, beats }) => (
  <Stage w={W} h={H}>
    <Drift t={t} dur={dur}>
      <SubCutaway x={1060} y={560} w={1500} air={pr(t, beats[1] + 10, 50)} flow={t} breath={0.2} labels={0} />
      <g opacity={pr(t, beats[1] + 60, 15)}>
        <path d="M1060 330 L1060 470" stroke={K.amber} strokeWidth={6} />
        <T x={1060} y={318} size={28} color={K.amber} anchor="middle" weight={700}>
          outside air ✕
        </T>
      </g>
    </Drift>
    <HUD active={-1} t={t} />
    <Caption text="Many navies use diesel-electric submarines — they work very differently" sub="This video follows a nuclear-powered submarine" opacity={win(t, 30, beats[1])} />
    <Caption text="Closed-loop air while submerged" opacity={win(t, beats[1] + 20, beats[2])} />
    <Caption text="Avg. 77 days at sea per patrol" sub="US ballistic-missile submarines (US Navy)" opacity={win(t, beats[2] + 10, dur)} />
  </Stage>
);

// ---------- Scene 3: the squeeze ----------
export const S03: React.FC<LongSceneProps> = ({ t, dur, beats }) => {
  const depth = pr(t, 20, beats[1] - 20);
  return (
    <Stage w={W} h={H}>
      <rect x={380} y={180} width={260} height={780} fill="url(#e2water)" opacity={0.8} rx={20} />
      <DepthRuler x={510} y={210} h={700} depth={depth} ticks={7} />
      <HullSection x={1250} y={470} r={160} arrows={pr(t, 60, 40)} frames={pr(t, beats[1] + 20, 40)} t={t} />
      <FramedTube x={1250} y={860} w={760} h={120} frames={pr(t, beats[1] + 40, 90)} />
      <HUD active={0} t={t} />
      <Fact x={1250} y={170} text="+1 atm ≈ every 10 m (33 ft) of seawater" source="NOAA" anchor="middle" opacity={win(t, 30, dur)} />
    </Stage>
  );
};

// ---------- Scene 4: two air problems ----------
export const S04: React.FC<LongSceneProps> = ({ t, beats }) => {
  const gaugesOn = Math.max(win(t, 10, beats[3] + 10), pr(t, beats[4], 15));
  const o2 = 0.82 - 0.22 * pr(t, 20, beats[3]);
  const co2 = beats[4] < t ? 0.34 : 0.1 + 0.5 * pr(t, 20, beats[3]);
  const scrub = win(t, beats[3], beats[4] + 6);
  const sl = t - beats[3];
  const sd = beats[4] - beats[3];
  return (
    <Stage w={W} h={H}>
      <g opacity={gaugesOn}>
        <Gauge x={780} y={210} h={520} value={o2} color={K.cyan} label="O₂ used up" />
        <Gauge x={1140} y={210} h={520} value={co2} color={K.amber} label="CO₂ builds up" band={beats[4] < t ? [0.24, 0.44] : undefined} />
        <T x={960} y={190} size={30} color={K.muted} anchor="middle" opacity={pr(t, beats[1], 15)}>
          two separate tracks
        </T>
      </g>
      {/* Heavier-than-air inset + qualitative effects */}
      <g opacity={win(t, beats[2], beats[3])}>
        <rect x={1340} y={260} width={320} height={260} rx={14} fill={K.panel} stroke={K.line} strokeWidth={3} />
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={1370 + (i % 7) * 42} cy={430 + 40 * pr(t, beats[2], 60) + Math.floor(i / 7) * 34} r={9} fill={K.amber} opacity={0.8} />
        ))}
        <T x={1500} y={555} size={24} color={K.muted} anchor="middle">
          enclosed space
        </T>
        <T x={1360} y={620} size={28} color={K.ivory}>
          higher: breathlessness, headaches
        </T>
        <T x={1360} y={665} size={28} color={K.amber}>
          extreme: unconsciousness
        </T>
      </g>
      <g opacity={scrub}>
        <Scrubber x={980} y={560} s={1.15} t={t} absorb={pr(sl, 20, sd * 0.35)} heat={pr(sl, sd * 0.45, sd * 0.25)} vent={pr(sl, sd * 0.62, sd * 0.25)} />
        <Tag x={1880} y={1050} text="Amine scrubber · classic design" anchor="end" size={24} />
      </g>
      <HUD active={1} t={t} />
      <Caption text="Oxygen used up ≠ CO₂ building up" sub="two problems, two machines" opacity={win(t, beats[1], beats[2])} />
      <g opacity={pr(t, beats[4] + 10, 15)}>
        <Fact x={1340} y={420} text="Measured avg: 3,500–4,100 ppm" source="US nuclear subs · data reported 2003 (NRC 2007)" size={36} />
        <Fact x={1340} y={560} text="Outdoor air ≈ 400 ppm" source="older reference value" size={30} color={K.muted} />
        <Fact x={1340} y={690} text="Navy guidance sets exposure ceilings" size={28} color={K.muted} />
      </g>
    </Stage>
  );
};

// ---------- Scene 5: splitting water for air ----------
export const S05: React.FC<LongSceneProps> = ({ t, beats }) => (
  <Stage w={W} h={H}>
    <Electrolyser x={900} y={620} s={1} t={t} split={pr(t, beats[0] + 120, 60)} o2={pr(t, beats[1], 40)} h2={pr(t, beats[1] + 90, 40)} />
    <g opacity={pr(t, beats[2], 15)}>
      <Gauge x={1700} y={300} h={420} value={0.2 + 0.5 * pr(t, beats[2], 60)} color={K.cyan} label="O₂" band={[0.62, 0.74]} />
      <T x={1700} y={270} size={24} color={K.muted} anchor="middle">
        kept near normal air
      </T>
    </g>
    <g opacity={pr(t, beats[2] + 200, 15)}>
      <rect x={1180} y={860} width={60} height={90} rx={10} fill={K.panel} stroke={K.amber} strokeWidth={3} />
      <T x={1260} y={915} size={26} color={K.ivory}>
        Oxygen candle — traditional backup
      </T>
    </g>
    <HUD active={1} t={t} />
  </Stage>
);

// ---------- Scene 6: the invisible cleaners ----------
const SOURCES = ["cooking", "batteries", "machinery", "the crew"];
export const S06: React.FC<LongSceneProps> = ({ t, beats }) => (
  <Stage w={W} h={H}>
    <g opacity={win(t, 0, beats[1] + 10)}>
      {SOURCES.map((s, i) => (
        <g key={s} opacity={pr(t, 30 + i * 25, 15)}>
          <rect x={420 + i * 290} y={430} width={240} height={110} rx={16} fill={K.panel} stroke={K.line} strokeWidth={3} />
          <T x={540 + i * 290} y={498} size={32} color={K.ivory} anchor="middle" weight={700}>
            {s}
          </T>
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={500 + i * 290 + k * 40} cy={400 - ((t * 1.5 + k * 30 + i * 13) % 120)} r={8} fill={K.muted} opacity={0.6} />
          ))}
        </g>
      ))}
      <T x={960} y={640} size={30} color={K.muted} anchor="middle">
        all release other gases
      </T>
    </g>
    <g opacity={win(t, beats[1], beats[2] + 10)}>
      <Cleaners x={1000} y={540} s={1.05} t={t} burner={pr(t, beats[1], 20)} filter={pr(t, beats[1] + 90, 20)} />
    </g>
    <g opacity={pr(t, beats[2], 15)}>
      <AirHud x={1000} y={480} s={1.05} t={t} tiles={pr(t, beats[2] + 10, 150)} climate={pr(t, beats[3] + 20, 20)} />
    </g>
    <HUD active={2} t={t} />
  </Stage>
);

// ---------- Scene 7: lost without GPS ----------
export const S07: React.FC<LongSceneProps> = ({ t, beats, dur }) => {
  const fixStart = beats[3] + 40;
  const fixMid = beats[3] + Math.round((dur - beats[3]) * 0.5);
  return (
    <Stage w={W} h={H}>
      <g opacity={win(t, 0, beats[1] + 10)}>
        <GpsSurface x={160} y={90} w={1600} h={900} beams={pr(t, 20, 30)} t={t} />
        <g transform="translate(960 760)">
          <rect x={-170} y={-26} width={340} height={52} rx={26} fill="url(#e2hull)" stroke={K.steelHi} strokeWidth={3} />
        </g>
        <T x={960} y={1040} size={30} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, 120, 15)}>
          GPS is radio — seawater soaks it up
        </T>
      </g>
      <g opacity={pr(t, beats[1], 15)}>
        <InertialGlyphs x={250} y={400} t={t} on={pr(t, beats[1] + 20, 20)} size={26} />
        <NavMap
          x={720}
          y={170}
          w={1100}
          h={760}
          t={t}
          path={pr(t, beats[1] + 40, dur - beats[1] - 80)}
          cone={pr(t, beats[2], 120)}
          fix={t < fixMid ? pr(t, fixStart, 40) : pr(t, fixMid + 20, 40)}
          fixKind={t < beats[3] ? "none" : t < fixMid ? "gps" : "seafloor"}
          size={26}
        />
        <T x={250} y={790} size={30} color={K.ivory} anchor="middle" weight={700}>
          measure motion,
        </T>
        <T x={250} y={830} size={30} color={K.ivory} anchor="middle" weight={700}>
          add it up
        </T>
        <g opacity={pr(t, beats[3], 15)}>
          <T x={250} y={920} size={28} color={K.cyan} anchor="middle" weight={700}>
            {t < fixMid ? "Fix: GPS near the surface" : "Fix: match the seafloor"}
          </T>
          <T x={250} y={958} size={22} color={K.muted} anchor="middle">
            examples · methods vary
          </T>
        </g>
      </g>
      <HUD active={3} t={t} />
    </Stage>
  );
};

// ---------- Scene 8: hiding in a sea of sound ----------
export const S08: React.FC<LongSceneProps> = ({ t, beats }) => (
  <Stage w={W} h={H}>
    <g opacity={win(t, 0, beats[1] + 10)}>
      <SubCutaway x={1060} y={360} w={1100} labels={0} tag={1} />
      <LengthCompare x={1060} y={440} w={1100} p={pr(t, 60, 30)} />
    </g>
    <g opacity={win(t, beats[1], beats[2] + 10)}>
      <rect x={0} y={0} width={W} height={H} fill="url(#e2water)" opacity={0.5} />
      <SoundRings x={760} y={560} w={980} t={t} low={pr(t, beats[1], 20)} high={pr(t, beats[1] + 30, 20)} />
    </g>
    <g opacity={pr(t, beats[2], 15)}>
      <CoatingSection x={980} y={560} s={1.25} t={t} ping={pr(t, beats[2] + 50, 120)} noise={pr(t, beats[2] + 160, 20)} />
      <T x={980} y={160} size={30} color={K.muted} anchor="middle">
        hull cross-section
      </T>
      <T x={980} y={1030} size={34} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, beats[3], 15)}>
        Not silent — harder to hear, harder to find
      </T>
    </g>
    <HUD active={4} t={t} />
  </Stage>
);

// ---------- Scene 9: a message through the sea ----------
export const S09: React.FC<LongSceneProps> = ({ t, beats }) => (
  <Stage w={W} h={H}>
    <CommsColumn
      x={420}
      y={180}
      w={1420}
      h={860}
      t={t}
      size={28}
      hf={pr(t, 30, 30)}
      vlf={pr(t, beats[1], 30)}
      antenna={pr(t, beats[1] + 150, 60)}
      elf={pr(t, beats[2], 60)}
      reply={pr(t, beats[3], 40)}
    />
    <HUD active={5} t={t} />
  </Stage>
);

// ---------- Scene 10: the hidden heart ----------
export const S10: React.FC<LongSceneProps> = ({ t, beats }) => {
  const lit = {
    scrubber: pr(t, 30, 15),
    electrolyser: pr(t, 60, 15),
    cleaners: pr(t, 90, 15),
    analyser: pr(t, 110, 15),
    nav: pr(t, 140, 15),
    sonar: pr(t, 170, 15),
    reactor: pr(t, 240, 20),
    turbine: pr(t, 240, 20),
  };
  return (
    <Stage w={W} h={H}>
      <g opacity={win(t, 0, beats[1] + 10)}>
        <SubCutaway x={1060} y={600} w={1500} lit={lit} labels={1} bus={pr(t, 280, 60)} air={1} flow={t} />
        <T x={1060} y={980} size={32} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, 200, 15)}>
          every machine runs on electricity
        </T>
      </g>
      <g opacity={pr(t, beats[1], 15)}>
        <ReactorLoops x={1080} y={500} s={1.05} t={t} primary={pr(t, beats[1] + 10, 50)} secondary={pr(t, beats[1] + 90, 50)} turbine={pr(t, beats[1] + 200, 30)} />
      </g>
      <g opacity={pr(t, beats[2], 15)}>
        <Fact x={1080} y={960} text="Core endurance: ~62,000 mi (first sub core) → 1,000,000+ mi today" source="NNSA" anchor="middle" size={32} />
      </g>
      <HUD active={6} t={t} extra={[{ label: "Power", state: t > 240 ? 2 : 1 }]} />
    </Stage>
  );
};

// ---------- Scene 11: the clock they can't engineer away ----------
export const S11: React.FC<LongSceneProps> = ({ t, beats }) => (
  <Stage w={W} h={H}>
    <ClockPanel x={1080} y={500} s={1.05} t={t} food={pr(t, beats[0] + 200, 240)} maint={pr(t, beats[1] + 30, 260)} crew={pr(t, beats[1] + 250, 20)} size={30} />
    <Fact x={1080} y={910} text="Almost never resupplied at sea" source="NRC, 1996" anchor="middle" size={32} opacity={win(t, beats[0] + 150, beats[1] + 5)} />
    <Fact x={1080} y={910} text="US ballistic-missile subs: avg 77 days at sea / 35 in port · two crews" source="US Navy" anchor="middle" size={32} opacity={win(t, beats[1] + 20, beats[2] + 5)} />
    <T x={1080} y={930} size={40} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, beats[2], 15)}>
      Food · maintenance · crew · mission
    </T>
    <HUD active={6} t={t} all extra={[{ label: "Power", state: 2 }]} />
  </Stage>
);

// ---------- Scene 12: the chain ----------
const CHAIN = ["scrubber", "electrolyser", "cleaners", "analyser", "nav", "sonar", "reactor", "turbine"] as const;
export const S12: React.FC<LongSceneProps> = ({ t, dur, ends }) => {
  const lit = Object.fromEntries(CHAIN.map((s, i) => [s, pr(t, 20 + i * 40, 20)]));
  const titleAt = ends[0] + 10;
  return (
    <Stage w={W} h={H}>
      <g opacity={1 - pr(t, titleAt, 30)}>
        <Drift t={t} dur={dur} amount={-0.06}>
          <SubCutaway x={960} y={560} w={1600} lit={lit} labels={0.8} air={1} flow={t} bus={pr(t, 360, 60)} />
        </Drift>
      </g>
      <g opacity={pr(t, titleAt + 20, 30)}>
        <text x={960} y={510} fontFamily={F} fontSize={64} fontWeight={700} fill={K.ivory} textAnchor="middle">
          The Hidden Machines That Keep
        </text>
        <text x={960} y={595} fontFamily={F} fontSize={64} fontWeight={700} fill={K.ivory} textAnchor="middle">
          a Submarine Crew Alive
        </text>
        <line x1={760} y1={650} x2={1160} y2={650} stroke={K.cyan} strokeWidth={4} filter="url(#e2glow)" />
        <text x={960} y={720} fontFamily={F} fontSize={34} fontWeight={600} fill={K.muted} textAnchor="middle" letterSpacing={6}>
          LUMINEXPLAIN
        </text>
      </g>
    </Stage>
  );
};

export const LONG_SCENES: Record<number, React.FC<LongSceneProps>> = {
  1: S01,
  2: S02,
  3: S03,
  4: S04,
  5: S05,
  6: S06,
  7: S07,
  8: S08,
  9: S09,
  10: S10,
  11: S11,
  12: S12,
};
