// Scene 3 · From restaurant giant to countertop (S3-01 … S3-05).
// One fixed line-up composition (floor at y = 900, 400 px per metre) so only
// the changing part moves between shots.
import React from "react";
import { CameraFrame } from "../../components/CameraFrame";
import { easeOut } from "../../animations/timing";
import { C, INK_2, INK_3, LINE, OvenFront, SceneProps, Silhouette, Stage, Txt, lerp, progress, useShotTime } from "./shared";

const FLOOR = 900;

// Generic 1940s cabinet oven (~1.8 m), no brand.
const Cabinet: React.FC<{ water?: number; t?: number; ghost?: number }> = ({ water = 0, t = 0, ghost = 1 }) => (
  <g opacity={ghost}>
    <rect x={380} y={180} width={240} height={720} rx={14} fill={INK_3} stroke={C.warmIvory} strokeOpacity={0.75} strokeWidth={6} />
    <rect x={410} y={360} width={180} height={150} rx={8} fill="#0B111C" stroke={LINE} strokeWidth={5} />
    <rect x={410} y={560} width={180} height={300} rx={8} fill="none" stroke={LINE} strokeWidth={4} />
    {[220, 260, 300].map((y) => (
      <circle key={y} cx={500} cy={y} r={12} fill={LINE} />
    ))}
    {/* cooling pipes on the side */}
    <path d="M620 260 L680 260 L680 820 L620 820" fill="none" stroke={C.signalTeal} strokeOpacity={0.35 + 0.65 * water} strokeWidth={10} />
    <path d="M620 260 L680 260 L680 820 L620 820" fill="none" stroke={C.mistBlue} strokeWidth={4} strokeDasharray="14 22" strokeDashoffset={-t * 3} opacity={water} />
  </g>
);

const Person: React.FC<{ x: number; s?: number; opacity?: number }> = ({ x, s = 1.37, opacity = 1 }) => <Silhouette x={x} y={FLOOR - 160 * s} s={s} opacity={opacity} />;

const House: React.FC<{ x: number; y: number; lit: number; s?: number }> = ({ x, y, lit, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-50 10 L0 -36 L50 10 L50 56 L-50 56 Z" fill={lit > 0 ? `rgba(244, 201, 93, ${0.85 * lit})` : INK_2} stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-12} y={24} width={24} height={32} fill={INK_3} />
  </g>
);

const Balance: React.FC<{ tip: number; adults: number }> = ({ tip, adults }) => {
  const a = lerp(-14, 0, tip);
  return (
    <g transform="translate(1440 560)">
      <path d="M0 0 L0 340 M-90 340 L90 340" stroke={LINE} strokeWidth={10} />
      <g transform={`rotate(${a})`}>
        <path d="M-260 0 L260 0" stroke={C.warmIvory} strokeWidth={8} />
        <g transform="translate(-260 0)">
          <path d="M0 0 L-70 120 M0 0 L70 120 M-90 120 L90 120" stroke={C.warmIvory} strokeWidth={4} />
          <rect x={-34} y={0} width={68} height={120} rx={6} fill={INK_3} stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={4} transform={`rotate(${-a} 0 120)`} />
        </g>
        <g transform="translate(260 0)">
          <path d="M0 0 L-90 120 M0 0 L90 120 M-110 120 L110 120" stroke={C.warmIvory} strokeWidth={4} />
          <g transform={`rotate(${-a} 0 120)`}>
            {[0, 1, 2, 3].map((i) => (
              <g key={i} opacity={progress(adults, i * 0.25, 0.25)}>
                <Silhouette x={-75 + i * 50} y={120 - 160 * 0.22} s={0.22} />
              </g>
            ))}
          </g>
        </g>
      </g>
    </g>
  );
};

const Countertop: React.FC<{ drop: number; ghost?: number }> = ({ drop, ghost = 1 }) => (
  <g opacity={ghost}>
    <rect x={820} y={540} width={760} height={360} fill={INK_2} stroke={LINE} strokeWidth={4} />
    <rect x={800} y={524} width={800} height={20} rx={6} fill={INK_3} stroke={LINE} strokeWidth={4} />
    <g transform={`translate(0 ${lerp(-300, 0, drop)})`} opacity={drop}>
      {/* ~40 cm tall generic 1967 countertop oven */}
      <rect x={900} y={364} width={260} height={160} rx={14} fill={INK_3} stroke={C.warmIvory} strokeOpacity={0.8} strokeWidth={5} />
      <rect x={918} y={384} width={160} height={120} rx={8} fill="#0B111C" stroke={LINE} strokeWidth={4} />
      {[400, 440, 480].map((y) => (
        <circle key={y} cx={1120} cy={y} r={9} fill={LINE} />
      ))}
    </g>
  </g>
);

const Toaster: React.FC<{ p: number }> = ({ p }) => (
  <g opacity={p} fill="none" stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={4}>
    <rect x={1220} y={430} width={150} height={94} rx={22} />
    <path d="M1255 430 L1255 412 M1335 430 L1335 412" strokeLinecap="round" />
  </g>
);

export const S3Radarange: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const fold = progress(f, beat(0), 20);
  const tilt = progress(f, beat(1), 70);
  const title = progress(f, beat(2), 16, easeOut);
  return (
    <CameraFrame scale={lerp(1.35, 1, tilt)} originX={500} originY={lerp(900, 540, tilt)}>
      <Stage grid>
        <line x1={0} y1={FLOOR} x2={1920} y2={FLOOR} stroke={LINE} strokeWidth={4} />
        <g opacity={fold}>
          <Cabinet />
        </g>
        <g opacity={title} transform={`translate(1060 ${lerp(320, 300, title)})`}>
          <rect x={-40} y={-70} width={560} height={110} rx={10} fill={C.warmIvory} />
          <Txt x={240} y={8} size={54} color={C.inkNavy} weight={800}>
            Radarange · c. 1947
          </Txt>
        </g>
      </Stage>
    </CameraFrame>
  );
};

export const S3Giant: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const bar = progress(f, beat(0), 30);
  const adults = progress(f, beat(1), 40);
  const tip = progress(f, beat(1) + 36, 30);
  const water = progress(f, beat(2), 20);
  const awning = progress(f, beat(3), 24);
  return (
    <Stage grid>
      <line x1={0} y1={FLOOR} x2={1920} y2={FLOOR} stroke={LINE} strokeWidth={4} />
      {/* restaurant awning behind */}
      <g opacity={awning}>
        <path d="M120 120 L880 120 L840 190 L160 190 Z" fill="#7A3B2E" opacity={0.8} />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M${170 + i * 85} 190 q42 40 85 0`} fill="#7A3B2E" opacity={0.8} />
        ))}
        <Txt x={500} y={168} size={34} color={C.warmIvory}>
          RESTAURANT
        </Txt>
      </g>
      <Cabinet water={water} t={f} />
      <Person x={880} />
      {/* height bar */}
      <g opacity={bar}>
        <path d={`M330 ${FLOOR} L330 ${lerp(FLOOR, 180, bar)}`} stroke={C.discoveryGold} strokeWidth={5} />
        <path d="M310 180 L350 180 M310 900 L350 900" stroke={C.discoveryGold} strokeWidth={5} opacity={bar} />
        <Txt x={300} y={560} size={44} color={C.discoveryGold} anchor="end">
          ≈ 1.8 m
        </Txt>
      </g>
      <g opacity={progress(f, beat(1) - 10, 20)}>
        <Balance tip={tip} adults={adults} />
        <Txt x={1440} y={980} size={32} color={C.mistBlue}>
          about as heavy as four adults
        </Txt>
      </g>
      <g opacity={awning}>
        <House x={1780} y={180} lit={0} />
        <Txt x={1780} y={290} size={28} color={C.mistBlue}>
          homes: no
        </Txt>
      </g>
    </Stage>
  );
};

export const S3Countertop: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  const cal = progress(f, beat(0), 40);
  const drop = progress(f, beat(1), 16, easeOut);
  const tag = progress(f, beat(2), 16, easeOut);
  const lit = progress(f, beat(3), 20);
  const toaster = progress(f, beat(4), 20);
  const year = Math.round(lerp(1947, 1967, cal));
  return (
    <Stage grid>
      <line x1={0} y1={FLOOR} x2={1920} y2={FLOOR} stroke={LINE} strokeWidth={4} />
      <Cabinet water={1} t={f} ghost={0.9} />
      <Countertop drop={drop} />
      <Toaster p={toaster} />
      <g opacity={tag} transform={`translate(1030 ${lerp(250, 300, tag)}) rotate(${lerp(-12, -4, tag)})`}>
        <rect x={-110} y={-48} width={220} height={84} rx={12} fill={C.warmIvory} />
        <Txt x={0} y={12} size={48} color={C.inkNavy} weight={800}>
          $495
        </Txt>
      </g>
      <g transform="translate(1500 140)">
        <rect x={-150} y={-60} width={300} height={110} rx={10} fill={C.warmIvory} />
        <Txt x={0} y={22} size={64} color={C.inkNavy} weight={800}>
          {year}
        </Txt>
        <Txt x={0} y={100} size={30} color={C.mistBlue} opacity={cal}>
          twenty years later
        </Txt>
      </g>
      <House x={1780} y={330} lit={lit} />
      <Txt x={1780} y={440} size={28} color={C.discoveryGold} opacity={lit}>
        home kitchens
      </Txt>
    </Stage>
  );
};

export const S3Homes: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat } = useShotTime(shot);
  return (
    <Stage grid>
      <line x1={0} y1={FLOOR} x2={1920} y2={FLOOR} stroke={LINE} strokeWidth={4} />
      <g opacity={0.12}>
        <Cabinet water={1} t={f} />
        <Countertop drop={1} />
      </g>
      {Array.from({ length: 10 }).map((_, i) => (
        <House key={i} x={420 + i * 120} y={330} s={1.1} lit={i < 9 ? progress(f, beat(0) + i * 8, 10) : 0} />
      ))}
      <Txt x={960} y={520} size={46} color={C.discoveryGold} opacity={progress(f, beat(0), 20)}>
        US homes, late 1990s: ~9 in 10
      </Txt>
    </Stage>
  );
};

export const S3IdeaInside: React.FC<SceneProps> = ({ shot }) => {
  const { f, beat, length } = useShotTime(shot);
  const ghost = progress(f, beat(0), 30);
  const modern = progress(f, beat(1), 24);
  const push = progress(f, beat(2), length - beat(2) + 8, (x) => x * x);
  return (
    <CameraFrame scale={lerp(1, 3, push)} originX={1000} originY={540}>
      <Stage grid>
        <line x1={0} y1={FLOOR} x2={1920} y2={FLOOR} stroke={LINE} strokeWidth={4} opacity={1 - ghost * 0.6} />
        <g opacity={1 - ghost * 0.85}>
          <Cabinet water={1} t={f} />
          <Countertop drop={1} />
        </g>
        {/* shared idea: a metal box + one magnetron */}
        <g opacity={ghost * (1 - modern * 0.7)}>
          <rect x={700} y={330} width={600} height={360} rx={20} fill="none" stroke={C.warmIvory} strokeWidth={6} strokeDasharray="16 12" />
          <rect x={1180} y={360} width={90} height={70} rx={10} fill="none" stroke={C.signalTeal} strokeWidth={5} />
          <Txt x={1000} y={760} size={36} color={C.mistBlue}>
            a metal box + a magnetron
          </Txt>
        </g>
        <g opacity={modern}>
          <OvenFront x={1000} y={510} w={640} />
        </g>
      </Stage>
    </CameraFrame>
  );
};
