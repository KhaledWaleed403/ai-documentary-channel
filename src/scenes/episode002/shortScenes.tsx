// Episode 002 Shorts (9:16, 1080×1920). Each Short reuses the long-form
// mechanism panels, laid out mobile-first: diagrams sit between y ≈ 360 and
// y ≈ 1330 so burned-in captions (block bottom at y 1520) never cover them.
import React from "react";
import { easeOut } from "../../animations/timing";
import type { ShortName } from "../../data/episode002";
import { Fact, Gauge, K, Stage, SubCutaway, T, Tag, pr } from "./kit";
import {
  CoatingSection,
  ClockPanel,
  CommsColumn,
  DepthRuler,
  Electrolyser,
  FramedTube,
  GpsSurface,
  Hatch,
  HullSection,
  InertialGlyphs,
  LengthCompare,
  NavMap,
  Scrubber,
  SoundRings,
} from "./panels";

export const SW = 1080;
export const SH = 1920;

export type ShortSceneProps = { t: number; dur: number; beats: number[] };

const win = (t: number, a: number, b: number, f = 10) => Math.min(pr(t, a, f), 1 - pr(t, b - f, f));

const VStage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stage w={SW} h={SH}>
    {children}
  </Stage>
);

// ---------- Short 1: The Other Gas a Submarine Has to Fight ----------
const OtherGas: React.FC<ShortSceneProps> = ({ t, beats }) => {
  const gauges = Math.max(win(t, beats[0] + 70, beats[2] + 6), pr(t, beats[3], 12));
  return (
    <VStage>
      <g opacity={1 - pr(t, beats[0] + 60, 15)}>
        <Hatch x={540} y={760} r={230} close={pr(t, 4, 45, easeOut)} seal={pr(t, 45, 12)} />
      </g>
      <Tag x={540} y={1240} text="145 crew — US Virginia-class" size={30} anchor="middle" color={K.ivory} opacity={win(t, 12, beats[1])} />
      <g opacity={gauges}>
        <Gauge x={370} y={520} h={560} w={90} value={0.8 - 0.15 * pr(t, beats[0] + 70, 200)} color={K.cyan} label="O₂ used up" size={38} />
        <Gauge
          x={710}
          y={520}
          h={560}
          w={90}
          value={t > beats[3] ? 0.34 : 0.1 + 0.45 * pr(t, beats[0] + 70, beats[2] - beats[0] - 70)}
          color={K.amber}
          label="CO₂ builds up"
          band={t > beats[3] ? [0.24, 0.44] : undefined}
          size={38}
        />
        <T x={540} y={480} size={32} color={K.muted} anchor="middle" opacity={pr(t, beats[0] + 90, 12)}>
          two separate problems
        </T>
      </g>
      <g opacity={win(t, beats[2], beats[3] + 6)}>
        <Scrubber
          x={540}
          y={880}
          s={0.88}
          ts={1.35}
          t={t}
          absorb={pr(t, beats[2] + 10, 90)}
          heat={pr(t, beats[2] + 130, 60)}
          vent={pr(t, beats[2] + 170, 60)}
        />
      </g>
      <g opacity={pr(t, beats[3] + 20, 12) * (1 - pr(t, beats[4], 12))}>
        <Fact x={540} y={1250} text="avg 3,500–4,100 ppm" source="US nuclear subs · data reported 2003 (NRC 2007)" anchor="middle" size={44} />
      </g>
    </VStage>
  );
};

// ---------- Short 2: No GPS ----------
const NoGps: React.FC<ShortSceneProps> = ({ t, beats, dur }) => {
  const fixMid = beats[4] + Math.round((beats[5] - beats[4]) * 0.5);
  return (
    <VStage>
      <g opacity={win(t, 0, beats[2] + 6)}>
        <GpsSurface x={40} y={380} w={1000} h={900} beams={pr(t, 6, 20)} t={t} />
        <rect x={400} y={1020} width={280} height={50} rx={25} fill="url(#e2hull)" stroke={K.steelHi} strokeWidth={3} />
      </g>
      <g opacity={win(t, beats[2], beats[3] + 6)}>
        <InertialGlyphs x={540} y={560} t={t} on={pr(t, beats[2] + 10, 15)} size={34} />
        <T x={540} y={1060} size={42} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, beats[2] + 60, 12)}>
          measure motion, add it up
        </T>
      </g>
      <g opacity={pr(t, beats[3], 12)}>
        <NavMap
          x={60}
          y={400}
          w={960}
          h={820}
          t={t}
          size={30}
          clip
          path={pr(t, beats[3] - 30, dur - beats[3] - 30)}
          cone={pr(t, beats[3] + 60, 90)}
          fix={t < fixMid ? pr(t, beats[4] + 50, 30) : pr(t, fixMid + 15, 30)}
          fixKind={t < beats[4] ? "none" : t < fixMid ? "gps" : "seafloor"}
        />
        <T x={540} y={1290} size={36} color={K.cyan} anchor="middle" weight={700} opacity={pr(t, beats[4], 12)}>
          {t < fixMid ? "Fix: GPS near the surface" : "Fix: match the seafloor"}
        </T>
      </g>
    </VStage>
  );
};

// ---------- Short 3: Messages ----------
const Messages: React.FC<ShortSceneProps> = ({ t, beats }) => (
  <VStage>
    <CommsColumn
      x={30}
      y={560}
      w={1020}
      h={780}
      t={t}
      size={34}
      vlfX={0.45}
      elfX={0.6}
      stackedElfLabel
      shoreLabelY={-210}
      hf={pr(t, 6, 20)}
      vlf={pr(t, beats[1], 25)}
      antenna={pr(t, beats[2] + 20, 50)}
      elf={pr(t, beats[3], 50)}
      reply={0}
    />
  </VStage>
);

// ---------- Short 4: Oxygen ----------
const Oxygen: React.FC<ShortSceneProps> = ({ t, beats }) => (
  <VStage>
    <g opacity={1 - pr(t, beats[3], 12)}>
      <Electrolyser x={540} y={900} s={0.95} ts={1.35} t={t} split={pr(t, beats[1] + 30, 50)} o2={pr(t, beats[2], 30)} h2={pr(t, beats[2] + 70, 30)} />
    </g>
    <g opacity={pr(t, beats[3], 12)}>
      <Gauge x={540} y={480} h={620} w={120} value={0.3 + 0.38 * pr(t, beats[3], 60)} color={K.cyan} label="O₂" band={[0.62, 0.74]} size={44} />
      <T x={540} y={440} size={34} color={K.muted} anchor="middle">
        kept near normal air
      </T>
    </g>
  </VStage>
);

// ---------- Short 5: Pressure hull ----------
const PressureHull: React.FC<ShortSceneProps> = ({ t, beats }) => (
  <VStage>
    <rect x={90} y={400} width={240} height={760} rx={20} fill="url(#e2water)" opacity={0.85} />
    <DepthRuler x={210} y={430} h={680} depth={pr(t, 6, beats[1] - 6)} ticks={6} size={28} />
    <HullSection x={720} y={700} r={140} arrows={pr(t, 30, 30)} frames={pr(t, beats[1] + 20, 30)} t={t} />
    <FramedTube x={540} y={1250} w={880} h={110} frames={pr(t, beats[1] + 40, 70)} />
    <T x={720} y={420} size={30} color={K.ivory} anchor="middle" weight={700}>
      +1 atm ≈ every 10 m (33 ft)
    </T>
    <T x={720} y={456} size={22} color={K.muted} anchor="middle">
      NOAA
    </T>
  </VStage>
);

// ---------- Short 7: Stealth ----------
const Stealth: React.FC<ShortSceneProps> = ({ t, beats }) => (
  <VStage>
    <g opacity={win(t, 0, beats[1] + 6)}>
      <SubCutaway x={540} y={600} w={960} labels={0} tag={1} />
      <LengthCompare x={540} y={670} w={960} p={pr(t, 20, 20)} size={38} />
    </g>
    <g opacity={win(t, beats[1], beats[2] + 6)}>
      <rect x={0} y={360} width={SW} height={1000} fill="url(#e2water)" opacity={0.5} />
      <SoundRings x={540} y={900} w={520} t={t} low={pr(t, beats[1], 15)} high={pr(t, beats[1] + 20, 15)} size={36} labelX={-480} labelY={-440} />
    </g>
    <g opacity={pr(t, beats[2], 12)}>
      <CoatingSection x={480} y={860} s={0.8} t={t} ping={pr(t, beats[2] + 30, 90)} noise={pr(t, beats[2] + 130, 15)} />
      <T x={540} y={1280} size={40} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, beats[3], 12)}>
        Harder to hear, harder to find
      </T>
    </g>
  </VStage>
);

// ---------- Short 8: Endurance limits ----------
const LIT_ALL = { scrubber: 1, electrolyser: 1, cleaners: 1, analyser: 1, nav: 1, sonar: 1, reactor: 1, turbine: 1 };
const Limits: React.FC<ShortSceneProps> = ({ t, beats }) => (
  <VStage>
    <g opacity={win(t, 0, beats[1] + 6)}>
      <SubCutaway x={540} y={760} w={980} lit={LIT_ALL} air={1} flow={t} bus={pr(t, 30, 40)} />
      <Fact x={540} y={1080} text="1,000,000+ mi core endurance" source="NNSA" anchor="middle" size={42} opacity={pr(t, beats[0] + 90, 12)} />
    </g>
    <g opacity={pr(t, beats[1], 12)}>
      <ClockPanel x={540} y={820} s={0.82} t={t} food={pr(t, beats[1] + 60, 150)} maint={pr(t, beats[2] + 20, 200)} crew={pr(t, beats[2] + 200, 15)} size={40} subs={false} />
      <Fact x={540} y={1250} text="Almost never resupplied at sea" source="NRC, 1996" anchor="middle" size={40} opacity={win(t, beats[1] + 20, beats[2] + 4)} />
      <Fact x={540} y={1250} text="avg 77 days at sea / 35 in port" source="US ballistic-missile subs · US Navy" anchor="middle" size={40} opacity={win(t, beats[2] + 20, beats[3] + 4)} />
      <T x={540} y={1260} size={42} color={K.ivory} anchor="middle" weight={700} opacity={pr(t, beats[3], 12)}>
        Food · maintenance · crew · mission
      </T>
    </g>
  </VStage>
);

export const SHORT_SCENES: Record<ShortName, React.FC<ShortSceneProps>> = {
  SubmarineOtherGas: OtherGas,
  SubmarineNoGPS: NoGps,
  SubmarineMessages: Messages,
  SubmarineOxygen: Oxygen,
  SubmarinePressureHull: PressureHull,
  SubmarineStealth: Stealth,
  SubmarineEnduranceLimits: Limits,
};
