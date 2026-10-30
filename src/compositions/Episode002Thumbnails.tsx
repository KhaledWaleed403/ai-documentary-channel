// Episode 002 thumbnails (stills, not part of any video). Each one draws a strong
// moment of the episode's own diagrams (no captions, no title bar) and adds one
// large hook line. Scenes take their frame as a prop, so a <Still> can show any
// moment directly.
// Render long: npx remotion still E002LongThumbnail thumbnails/episode-002/Long/<version>/thumbnail-3840x2160.png --scale=2 --port=3123
// Grid-safe Short cover (use this one): npx remotion still E002ShortCover<Name> (same output pattern).
// Render Short: npx remotion still E002ShortThumb<Name> thumbnails/episode-002/Shorts/<Name>/<version>/<Name>-thumbnail-1080x1920.jpg --image-format=jpeg --port=3123
import React from "react";
import { AbsoluteFill, Still } from "remotion";
import { type ShortName, episode002Shorts } from "../data/episode002";
import { K, Stage, SubCutaway } from "../scenes/episode002/kit";
import { SH, SHORT_SCENES, SW } from "../scenes/episode002/shortScenes";
import { fontFamily } from "../styles/theme";

type Line = { text: string; color: string };

const Hook: React.FC<{ lines: Line[]; top: number; size: number; left?: number; align?: "left" | "center" }> = ({
  lines,
  top,
  size,
  left = 60,
  align = "center",
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      right: 60,
      textAlign: align,
      fontFamily,
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: -1,
      textShadow: "0 6px 24px rgba(0, 0, 0, 0.7)",
    }}
  >
    {lines.map((l) => (
      <div key={l.text} style={{ color: l.color }}>
        {l.text}
      </div>
    ))}
  </div>
);

// ---------- Long-form (16:9) ----------
const LIT_ALL = { scrubber: 1, electrolyser: 1, cleaners: 1, analyser: 1, nav: 1, sonar: 1, reactor: 1, turbine: 1 };

export const E002LongThumbnail: React.FC = () => (
  <AbsoluteFill>
    <Stage w={1920} h={1080}>
      <rect x={0} y={330} width={1920} height={750} fill="url(#e2water)" opacity={0.7} />
      <SubCutaway x={960} y={700} w={1780} lit={LIT_ALL} air={1} flow={40} bus={1} breath={0.5} labels={0} tag={0} />
    </Stage>
    <Hook
      top={70}
      left={110}
      align="left"
      size={150}
      lines={[
        { text: "WHO MAKES", color: K.ivory },
        { text: "THE AIR?", color: K.cyan },
      ]}
    />
  </AbsoluteFill>
);

// ---------- Shorts (9:16) ----------
type Thumb = {
  short: ShortName;
  // Frame = start of narration line `line` + `offset`.
  line: number;
  offset: number;
  lines: Line[];
  top: number;
  size?: number;
};

const THUMBS: Thumb[] = [
  // Gauges: O₂ falling, CO₂ rising.
  { short: "SubmarineOtherGas", line: 1, offset: 120, top: 130, lines: [{ text: "IT'S NOT JUST", color: K.ivory }, { text: "OXYGEN", color: K.amber }] },
  // Dead-reckoning track with its growing uncertainty cone.
  { short: "SubmarineNoGPS", line: 4, offset: 40, top: 130, lines: [{ text: "NO GPS", color: K.cyan }, { text: "UNDERWATER", color: K.ivory }] },
  // Radio bands fading with depth, ELF reaching down.
  { short: "SubmarineMessages", line: 3, offset: 150, top: 130, lines: [{ text: "HOW DO YOU", color: K.ivory }, { text: "CALL A SUB?", color: K.cyan }] },
  // Electrolyser splitting water.
  { short: "SubmarineOxygen", line: 2, offset: 90, top: 130, lines: [{ text: "AIR MADE", color: K.ivory }, { text: "FROM WATER", color: K.cyan }] },
  // Depth ruler, pressure arrows and ring frames.
  { short: "SubmarinePressureHull", line: 2, offset: 60, top: 1420, lines: [{ text: "WHAT HOLDS", color: K.ivory }, { text: "BACK THE SEA?", color: K.amber }] },
  // The sub beside a football field.
  { short: "SubmarineStealth", line: 0, offset: 200, top: 130, size: 110, lines: [{ text: "HIDE THIS", color: K.ivory }, { text: "UNDERWATER?", color: K.cyan }] },
  // Food, maintenance and crew panels together.
  { short: "SubmarineEnduranceLimits", line: 3, offset: 40, top: 130, lines: [{ text: "WHY DO THEY", color: K.ivory }, { text: "COME HOME?", color: K.amber }] },
];

// Profile grids on Instagram, TikTok and YouTube show only the centre 3:4 of a
// 9:16 cover (y ≈ 240–1680), and Instagram's desktop upload can't adjust that crop.
// Grid-safe covers put the hook at y 280 and shrink the diagram band (y ≈ 360–1330)
// to fit y ≈ 560–1430, so everything that matters survives the crop.
const GRID_TOP = 280;
const GRID_SCALE = 0.9;
const GRID_SHIFT = 236;

const ShortThumbnail: React.FC<{ thumb: Thumb; grid?: boolean }> = ({ thumb, grid = false }) => {
  const data = episode002Shorts.find((s) => s.name === thumb.short);
  if (!data) {
    throw new Error(`Unknown Short ${thumb.short}`);
  }
  const Scene = SHORT_SCENES[thumb.short];
  const beats = data.lines.map((l) => l.start);
  return (
    <AbsoluteFill style={{ backgroundColor: K.bg }}>
      <AbsoluteFill
        style={grid ? { transformOrigin: "540px 0px", transform: `translateY(${GRID_SHIFT}px) scale(${GRID_SCALE})` } : undefined}
      >
        <Scene t={beats[thumb.line] + thumb.offset} dur={data.durationInFrames} beats={beats} />
      </AbsoluteFill>
      <Hook lines={thumb.lines} top={grid ? GRID_TOP : thumb.top} size={grid ? 100 : (thumb.size ?? 118)} />
    </AbsoluteFill>
  );
};

export const Episode002ThumbnailStills = () => (
  <>
    <Still id="E002LongThumbnail" component={E002LongThumbnail} width={1920} height={1080} />
    {THUMBS.map((thumb) => (
      <Still
        key={thumb.short}
        id={`E002ShortThumb${thumb.short}`}
        component={ShortThumbnail}
        defaultProps={{ thumb }}
        width={SW}
        height={SH}
      />
    ))}
    {THUMBS.map((thumb) => (
      <Still
        key={`cover-${thumb.short}`}
        id={`E002ShortCover${thumb.short}`}
        component={ShortThumbnail}
        defaultProps={{ thumb, grid: true }}
        width={SW}
        height={SH}
      />
    ))}
  </>
);
