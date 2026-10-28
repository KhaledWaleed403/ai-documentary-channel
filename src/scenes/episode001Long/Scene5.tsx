// Scene 5 · The candy bar returns (S5-01 … S5-05): hot spots and the turntable.
import React from "react";
import { SignalPath } from "../../components/SignalPath";
import { easeOut } from "../../animations/timing";
import { longShot } from "../../data/episode001Long";
import { C, INK_2, INK_3, LINE, SceneProps, Stage, Tag, Txt, heatColor, lerp, progress, useShotTime, wobble } from "./shared";

const CX = 960;
const CY = 560;
const PLATE_R = 330;

// Simplified, mostly fixed map of stronger regions (top-down, oven floor).
const BLOBS = [
  { x: 660, y: 540, rx: 70, ry: 58 },
  { x: 900, y: 552, rx: 64, ry: 70 },
  { x: 1140, y: 536, rx: 72, ry: 60 },
  { x: 780, y: 330, rx: 80, ry: 56 },
  { x: 1080, y: 760, rx: 76, ry: 62 },
  { x: 1300, y: 360, rx: 66, ry: 74 },
  { x: 560, y: 780, rx: 70, ry: 60 },
  { x: 1420, y: 700, rx: 60, ry: 66 },
  { x: 980, y: 300, rx: 58, ry: 50 },
];

const brightness = (x: number, y: number) =>
  BLOBS.reduce((acc, b) => {
    const d = ((x - b.x) / b.rx) ** 2 + ((y - b.y) / b.ry) ** 2;
    return Math.max(acc, Math.exp(-d * 1.2));
  }, 0.04);

const FieldMap: React.FC<{ opacity: number; build?: number; t?: number }> = ({ opacity, build = 1, t = 0 }) => (
  <g opacity={opacity}>
    {BLOBS.map((b, i) => (
      <ellipse
        key={i}
        cx={b.x + 3 * wobble(t, i)}
        cy={b.y + 3 * wobble(t, i + 9)}
        rx={b.rx * 1.4 * Math.min(1, build * 1.5 - i * 0.06)}
        ry={b.ry * 1.4 * Math.min(1, build * 1.5 - i * 0.06)}
        fill={C.signalTeal}
        opacity={0.32}
        filter="url(#soft)"
      />
    ))}
  </g>
);

// Scaled down and shifted left so the side insets have their own space.
const OvenFloor: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <g transform="translate(760 560) scale(0.82) translate(-760 -560)">
    <rect x={300} y={130} width={1320} height={840} rx={30} fill={INK_2} stroke={C.warmIvory} strokeOpacity={0.6} strokeWidth={6} />
    {children}
  </g>
);

const Turntable: React.FC<{ angle: number; opacity?: number; children?: React.ReactNode }> = ({ angle, opacity = 1, children }) => (
  <g opacity={opacity} transform={`rotate(${angle} ${CX} ${CY})`}>
    <circle cx={CX} cy={CY} r={PLATE_R} fill={C.mistBlue} opacity={0.08} stroke={C.warmIvory} strokeOpacity={0.55} strokeWidth={5} />
    <path d={`M${CX} ${CY - PLATE_R + 12} L${CX} ${CY - PLATE_R + 44}`} stroke={C.warmIvory} strokeOpacity={0.5} strokeWidth={6} />
    {children}
  </g>
);

export const S5Intro: React.FC<SceneProps> = ({ shot }) => {
  const { f } = useShotTime(shot);
  const tilt = progress(f, 0, 30);
  return (
    <Stage grid>
      <g transform={`translate(0 ${CY}) scale(1 ${lerp(0.25, 1, tilt)}) translate(0 ${-CY})`} opacity={lerp(0.4, 1, tilt)}>
        <OvenFloor>
          <Turntable angle={0} />
        </OvenFloor>
      </g>
    </Stage>
  );
};

export const S5Pattern: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const trains = progress(f, beat(0), 50);
  const inset = progress(f, beat(1), 20);
  const build = progress(f, beat(2), 70);
  const tag = progress(f, beat(3), 16);
  const ph = f * 0.25;
  // inset: add (0..1) then cancel (1..2) cycle
  const cyc = ((f - beat(1)) / 120) % 2;
  const shift = cyc < 1 ? 0 : Math.PI;
  return (
    <Stage grid>
      <OvenFloor>
        <Turntable angle={0} opacity={0.6} />
        <FieldMap opacity={build} build={build} t={f * 0.2} />
        <g opacity={trains * (1 - build * 0.6)}>
          {[0, 1, 2].map((i) => (
            <SignalPath key={`a${i}`} points={[[320, 400 + i * 160], [1600, 400 + i * 160]]} progress={trains} stroke={C.signalTeal} width={4} amplitude={14} wavelength={120} phase={ph + i} />
          ))}
          {[0, 1, 2].map((i) => (
            <SignalPath key={`b${i}`} points={[[700 + i * 260, 150], [700 + i * 260, 950]]} progress={trains} stroke={C.signalTeal} width={4} amplitude={14} wavelength={120} phase={ph + i * 2} />
          ))}
        </g>
      </OvenFloor>
      <g opacity={inset} transform="translate(1690 320) scale(0.88)">
        <rect x={-230} y={-80} width={460} height={360} rx={18} fill={INK_3} stroke={LINE} strokeWidth={4} />
        {[0, 1].map((k) => {
          const pts = Array.from({ length: 41 }, (_, i) => {
            const x = -200 + i * 10;
            const y = 50 + 26 * Math.sin(i * 0.4 + (k === 1 ? shift : 0)) * 1;
            return `${i === 0 ? "M" : "L"}${x} ${y}`;
          }).join(" ");
          return <path key={k} d={pts} fill="none" stroke={C.mistBlue} strokeWidth={3} opacity={0.7} />;
        })}
        <path
          d={Array.from({ length: 41 }, (_, i) => `${i === 0 ? "M" : "L"}${-200 + i * 10} ${190 + (cyc < 1 ? 52 : 4) * Math.sin(i * 0.4)}`).join(" ")}
          fill="none"
          stroke={C.signalTeal}
          strokeWidth={6}
        />
        <Txt x={0} y={-30} size={28} color={C.warmIvory}>
          {cyc < 1 ? "waves add → stronger" : "waves cancel → weaker"}
        </Txt>
      </g>
      <Txt x={420} y={110} size={34} color={C.signalTeal} opacity={build}>
        stronger
      </Txt>
      <Txt x={620} y={110} size={34} color={C.mistBlue} opacity={build * 0.8}>
        · weaker
      </Txt>
      <Tag x={1660} y={1010} text="simplified" opacity={tag} />
    </Stage>
  );
};

// Chocolate patches melt where the bar crosses the three strong spots on its line.
const MELT_X = [660, 900, 1140];

export const S5Chocolate: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const lift = progress(f, beat(0), 24);
  const slide = progress(f, beat(1), 26, easeOut);
  const ruler = progress(f, beat(3), 20);
  const push = lerp(1, 1.08, progress(f, beat(2), length - beat(2)));
  return (
    <Stage grid>
      <g transform={`translate(${CX} ${CY}) scale(${push}) translate(${-CX} ${-CY})`}>
        <OvenFloor>
          <FieldMap opacity={0.9} t={f * 0.2} />
          <g transform={`translate(${lift * -40} ${lift * -700})`} opacity={1 - lift}>
            <Turntable angle={0} />
          </g>
          <g transform={`translate(${lerp(900, 0, slide)} 0)`} opacity={slide}>
            <rect x={540} y={500} width={720} height={92} rx={10} fill="#5A3A2A" stroke="#3B261B" strokeWidth={5} />
            {Array.from({ length: 7 }).map((_, i) => (
              <path key={i} d={`M${540 + (i + 1) * 90} 504 L${540 + (i + 1) * 90} 588`} stroke="#3B261B" strokeWidth={4} />
            ))}
            {MELT_X.map((x, i) => {
              const m = progress(f, beat(2) + i * 10, 50);
              return (
                <g key={x} opacity={m}>
                  <ellipse cx={x} cy={546} rx={58 * m} ry={44 * m} fill="#7B4E34" />
                  <ellipse cx={x - 14} cy={532} rx={22 * m} ry={10 * m} fill={C.warmIvory} opacity={0.55} />
                </g>
              );
            })}
          </g>
          <g opacity={ruler}>
            <path d="M660 650 L900 650 M660 630 L660 670 M900 630 L900 670" stroke={C.discoveryGold} strokeWidth={6} />
            <Txt x={780} y={720} size={44} color={C.discoveryGold}>
              ≈ 6 cm
            </Txt>
          </g>
        </OvenFloor>
      </g>
    </Stage>
  );
};

// --- turntable heating model shared by S5-04 and S5-05 -------------------
const CELLS = (() => {
  const out: { r: number; a: number }[] = [];
  for (let ring = 0; ring < 5; ring++) {
    const r = 30 + ring * 52;
    const n = ring === 0 ? 4 : 8 + ring * 6;
    for (let k = 0; k < n; k++) {
      out.push({ r, a: (k / n) * Math.PI * 2 + ring * 0.3 });
    }
  }
  return out;
})();
const TRACKED = CELLS.findIndex((c) => c.r === 30 + 3 * 52);
const DEG_PER_FRAME = 1.2;

// Rotation angle (deg) at absolute frame `af`, given the absolute start/stop frames.
const angleAt = (af: number, start: number, stop: number) => {
  if (af <= start) return 0;
  // Constant speed, then a short ease to a stop over 30 frames after `stop`.
  const run = Math.min(af, stop) - start;
  const coast = Math.max(0, Math.min(af - stop, 30));
  return (run + coast * (1 - coast / 60)) * DEG_PER_FRAME;
};

const heatAt = (af: number, start: number, stop: number) => {
  const heat = new Array(CELLS.length).fill(0);
  for (let k = start; k < Math.min(af, stop + 30); k += 2) {
    const ang = (angleAt(k, start, stop) * Math.PI) / 180;
    CELLS.forEach((c, i) => {
      const x = CX + c.r * Math.cos(c.a + ang);
      const y = CY + c.r * Math.sin(c.a + ang);
      heat[i] += brightness(x, y) * 0.0065;
    });
  }
  return heat;
};

const Bowl: React.FC<{ heat: number[]; ring?: number; even?: number; coolMarks?: number }> = ({ heat, ring = 0, even = 0, coolMarks = 0 }) => {
  const mean = heat.reduce((a, b) => a + b, 0) / heat.length;
  const order = heat.map((h, i) => ({ h, i })).sort((a, b) => a.h - b.h);
  const coolest = new Set(order.slice(0, 4).map((o) => o.i));
  return (
    <g>
      <circle cx={CX} cy={CY} r={300} fill={C.warmIvory} stroke={C.inkNavy} strokeWidth={6} />
      <circle cx={CX} cy={CY} r={272} fill={C.mistBlue} />
      {CELLS.map((c, i) => {
        const h = lerp(heat[i], mean, even);
        return <circle key={i} cx={CX + c.r * Math.cos(c.a)} cy={CY + c.r * Math.sin(c.a)} r={34} fill={heatColor(Math.min(1, h))} opacity={0.85} filter="url(#soft)" />;
      })}
      {CELLS.map((c, i) =>
        coolest.has(i) ? (
          <circle key={`c${i}`} cx={CX + c.r * Math.cos(c.a)} cy={CY + c.r * Math.sin(c.a)} r={30} fill="none" stroke={C.mistBlue} strokeWidth={5} opacity={coolMarks} />
        ) : null,
      )}
      {ring > 0 ? (
        <circle cx={CX + CELLS[TRACKED].r * Math.cos(CELLS[TRACKED].a)} cy={CY + CELLS[TRACKED].r * Math.sin(CELLS[TRACKED].a)} r={40} fill="none" stroke={C.discoveryGold} strokeWidth={7} opacity={ring} />
      ) : null}
    </g>
  );
};

const useTurntableClock = () => {
  const s4 = longShot("S5-04");
  const s5 = longShot("S5-05");
  const start = s4.visualTimeline[2].frame;
  const stop = s5.speechEndFrame - 40;
  return { start, stop };
};

export const S5Ride: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const af = shot.startFrame + f;
  const { start, stop } = useTurntableClock();
  const drop = progress(f, beat(0), 24, easeOut);
  const ring = progress(f, beat(1), 16);
  const graph = progress(f, beat(3), 20);
  const angle = angleAt(af, start, stop);
  const heat = heatAt(af, start, stop);
  // trace of the tracked spoonful for the inset graph
  const samples = Array.from({ length: 60 }, (_, i) => {
    const k = start + ((af - start) * i) / 59;
    return k <= start ? 0 : heatAt(k, start, stop)[TRACKED];
  });
  return (
    <Stage grid>
      <OvenFloor>
        <FieldMap opacity={0.75} t={f * 0.2} />
        <g transform={`translate(0 ${lerp(-500, 0, drop)})`} opacity={drop}>
          <Turntable angle={angle}>
            <Bowl heat={heat} ring={ring} />
          </Turntable>
        </g>
      </OvenFloor>
      <g opacity={graph} transform="translate(1690 320) scale(0.88)">
        <rect x={-220} y={-80} width={440} height={300} rx={18} fill={INK_3} stroke={LINE} strokeWidth={4} />
        <Txt x={0} y={-30} size={28} color={C.discoveryGold}>
          one spoonful's heat
        </Txt>
        <path d="M-180 180 L180 180 M-180 180 L-180 0" stroke={LINE} strokeWidth={4} />
        <path
          d={samples.map((h, i) => `${i === 0 ? "M" : "L"}${-180 + i * 6} ${180 - Math.min(1, h) * 170}`).join(" ")}
          fill="none"
          stroke={C.discoveryGold}
          strokeWidth={6}
        />
      </g>
    </Stage>
  );
};

export const S5NotPerfect: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const af = shot.startFrame + f;
  const { start, stop } = useTurntableClock();
  const layers = progress(f, beat(0), 36) * (1 - progress(f, beat(1) - 20, 30));
  const pins = progress(f, beat(1), 20);
  const cool = progress(f, beat(2), 20);
  const stir = progress(f, beat(3), 30);
  const angle = angleAt(af, start, stop);
  const heat = heatAt(af, start, stop);
  const pinTrail = Math.max(0, af - (shot.startFrame + beat(1)));
  return (
    <Stage grid>
      <OvenFloor>
        <g opacity={1 - layers}>
          <FieldMap opacity={0.75} t={f * 0.2} />
        </g>
        <Turntable angle={angle}>
          <Bowl heat={heat} even={stir * 0.35} coolMarks={cool * (1 - stir)} />
        </Turntable>
        {/* 3-D layers: the pattern is not a flat map */}
        <g opacity={layers}>
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`translate(0 ${-220 + k * 220}) translate(${CX} ${CY}) scale(1 0.32) skewX(-20) translate(${-CX} ${-CY})`}>
              <rect x={420} y={180} width={1080} height={760} rx={20} fill="none" stroke={C.mistBlue} strokeOpacity={0.5} strokeWidth={6} />
              <FieldMap opacity={0.95} t={f * 0.4 + k * 30} />
            </g>
          ))}
          <Txt x={1560} y={300} size={32} color={C.mistBlue} anchor="start">
            3-D, and it shifts
          </Txt>
          <Txt x={1560} y={344} size={32} color={C.mistBlue} anchor="start">
            as food heats
          </Txt>
        </g>
        <g opacity={pins * (1 - stir)}>
          <circle cx={CX} cy={CY} r={14} fill={C.discoveryGold} />
          <Tag x={CX} y={CY - 40} text="center: barely moves" color={C.discoveryGold} size={28} />
          <path
            d={`M${CX + 300} ${CY} A300 300 0 ${pinTrail * DEG_PER_FRAME > 180 ? 1 : 0} 1 ${CX + 300 * Math.cos((Math.min(359, pinTrail * DEG_PER_FRAME) * Math.PI) / 180)} ${CY + 300 * Math.sin((Math.min(359, pinTrail * DEG_PER_FRAME) * Math.PI) / 180)}`}
            fill="none"
            stroke={C.discoveryGold}
            strokeWidth={5}
            strokeDasharray="12 10"
          />
          <circle cx={CX + 300 * Math.cos((angle * Math.PI) / 180)} cy={CY + 300 * Math.sin((angle * Math.PI) / 180)} r={14} fill={C.discoveryGold} />
        </g>
        <g opacity={stir * (1 - progress(f, length - 20, 16))}>
          <g transform={`rotate(${stir * 300} ${CX} ${CY})`}>
            <path d={`M${CX + 120} ${CY - 40} Q${CX + 200} ${CY - 260} ${CX + 260} ${CY - 420}`} stroke={C.warmIvory} strokeWidth={22} strokeLinecap="round" />
            <ellipse cx={CX + 110} cy={CY - 10} rx={46} ry={30} fill={C.warmIvory} />
          </g>
        </g>
      </OvenFloor>
      <Txt x={960} y={1035} size={30} color={C.mistBlue} opacity={cool}>
        more even, still not perfect: some cooler spots remain
      </Txt>
    </Stage>
  );
};

