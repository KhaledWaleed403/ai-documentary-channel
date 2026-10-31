// Episode 003 thumbnails (stills, not part of any video). Each one draws a strong
// moment of the episode's own diagrams (no captions, no title bar) and adds one
// large hook line. Scenes take their frame as a prop, so a <Still> can show any
// moment directly.
// Render long: npx remotion still E003LongThumbnail thumbnails/episode-003/Long/<version>/thumbnail-3840x2160.png --scale=2 --port=3123
// Render Short cover: npx remotion still E003ShortCover<Name> thumbnails/episode-003/Shorts/<Name>/<version>/<Name>-thumbnail-1080x1920.jpg --image-format=jpeg --port=3123
import React from "react";
import { AbsoluteFill, Still } from "remotion";
import { episode003Long } from "../data/episode003";
import { type Ep3ShortName, episode003Shorts } from "../data/episode003Shorts";
import { K, Stage } from "../scenes/episode003/kit";
import { LONG_SCENES } from "../scenes/episode003/longScenes";
import { SH, SHORT_SCENES, SW } from "../scenes/episode003/shortScenes";
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
// Scene 1 at its end: the hypothetical path that falls back, and Voyager 2's real
// path bending at all four giants on its way out.
const LONG_SCENE = 1;
const LONG_FRAME = 700;

export const E003LongThumbnail: React.FC = () => {
  const sc = episode003Long.scenes.find((s) => s.scene === LONG_SCENE);
  if (!sc) {
    throw new Error(`No scene ${LONG_SCENE}`);
  }
  const Scene = LONG_SCENES[sc.scene];
  return (
    <AbsoluteFill style={{ backgroundColor: K.bg }}>
      <Scene t={LONG_FRAME} dur={sc.end - sc.start} beats={sc.shots.map((s) => s.start - sc.start)} ends={sc.shots.map((s) => s.end - sc.start)} />
      <Hook
        top={70}
        left={110}
        align="left"
        size={150}
        lines={[
          { text: "STOLEN", color: K.ivory },
          { text: "FROM JUPITER", color: K.amber },
        ]}
      />
    </AbsoluteFill>
  );
};

// ---------- Shorts (9:16) ----------
type Thumb = {
  short: Ep3ShortName;
  // Frame = start of narration line `line` + `offset`.
  line: number;
  offset: number;
  lines: Line[];
};

const THUMBS: Thumb[] = [
  // Sun view after the flyby: the carried curve and the longer Sun-relative bar.
  { short: "GravityAssistSpeed", line: 5, offset: 10, lines: [{ text: "STEAL SPEED", color: K.ivory }, { text: "FROM A PLANET", color: K.cyan }] },
  // Parker's final orbit, the seven Venus flybys and the drained energy bar.
  { short: "ReachingTheSun", line: 5, offset: 185, lines: [{ text: "FALL INTO", color: K.ivory }, { text: "THE SUN", color: K.amber }] },
  // Voyager 2's path bending at all four giants.
  { short: "VoyagerAlignment", line: 4, offset: 150, lines: [{ text: "FLY TO", color: K.ivory }, { text: "URANUS", color: K.cyan }] },
];

// Profile grids on Instagram, TikTok and YouTube show only the centre 3:4 of a
// 9:16 cover (y ≈ 240–1680), and Instagram's desktop upload can't adjust that crop.
// The hook sits at y 280 and the diagram band (y ≈ 360–1330) moves down to
// y ≈ 570–1540, so everything that matters survives the crop. It is shifted, not
// scaled: a scaled Stage shows its own vignette edge as a frame.
const GRID_TOP = 280;
const GRID_SHIFT = 210;

const ShortCover: React.FC<{ thumb: Thumb }> = ({ thumb }) => {
  const data = episode003Shorts.find((s) => s.name === thumb.short);
  if (!data) {
    throw new Error(`Unknown Short ${thumb.short}`);
  }
  const Scene = SHORT_SCENES[thumb.short];
  return (
    <AbsoluteFill style={{ backgroundColor: K.bg }}>
      <Stage w={SW} h={SH}>
        {null}
      </Stage>
      <AbsoluteFill style={{ transform: `translateY(${GRID_SHIFT}px)` }}>
        <Scene t={data.beats[thumb.line] + thumb.offset} dur={data.durationInFrames} beats={data.beats} />
      </AbsoluteFill>
      <Hook lines={thumb.lines} top={GRID_TOP} size={100} />
    </AbsoluteFill>
  );
};

export const Episode003ThumbnailStills = () => (
  <>
    <Still id="E003LongThumbnail" component={E003LongThumbnail} width={1920} height={1080} />
    {THUMBS.map((thumb) => (
      <Still key={thumb.short} id={`E003ShortCover${thumb.short}`} component={ShortCover} defaultProps={{ thumb }} width={SW} height={SH} />
    ))}
  </>
);
