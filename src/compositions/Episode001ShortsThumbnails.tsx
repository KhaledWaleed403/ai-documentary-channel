// Episode 001 Shorts thumbnails (stills, not part of any video). Each one
// freezes a strong frame of the Short's own animation (no captions, no audio)
// and adds one large hook line in the clear band below the picture.
// Registered as compositions spanning the Short's full length (not <Still>):
// a 1-frame timeline would cut off every shot that starts after frame 0.
// Render: npx remotion still E001ShortThumb<Name> thumbnails/episode-001/Shorts/<Name>/<version>/<Name>-thumbnail-1080x1920.jpg --image-format=jpeg --port=3123 (1080×1920).
import React from "react";
import { AbsoluteFill, Composition, Freeze } from "remotion";
import { episode001 } from "../data/episode001";
import { ShortName, episode001Shorts } from "../data/episode001Shorts";
import { fontFamily, palette } from "../styles/theme";
import { Episode001 } from "./Episode001";
import { Episode001Short } from "./Episode001Shorts";

type Line = { text: string; color: string };

type Thumb = {
  id: string;
  frame: number;
  // A Short from the batch, or the original HowMicrowavesWork Short.
  short: ShortName | "HowMicrowavesWork";
  lines: Line[];
  // Top of the text block; null when the frame already carries its own hook.
  top: number | null;
  size?: number;
};

const THUMBS: Thumb[] = [
  {
    id: "E001ShortThumbHowMicrowavesWork",
    short: "HowMicrowavesWork",
    // SH04: water molecules tugged by the field.
    frame: 540,
    lines: [
      { text: "WHAT'S HEATING", color: palette.warmIvory },
      { text: "YOUR FOOD?", color: palette.discoveryGold },
    ],
    // Above the molecule grid, which fills the lower two thirds.
    top: 110,
  },
  {
    id: "E001ShortThumbCandyBarDiscovery",
    short: "CandyBarDiscovery",
    // CB02 end: Spencer by the magnetron, bar melted in his pocket.
    frame: 420,
    lines: [
      { text: "WHAT MELTED", color: palette.warmIvory },
      { text: "HIS CANDY BAR?", color: palette.discoveryGold },
    ],
    // Below the silhouette's feet; smaller so each line fits on one row.
    top: 1615,
    size: 100,
  },
  {
    id: "E001ShortThumbMicrowaveSafeDishes",
    short: "MicrowaveSafeDishes",
    // DS01 end: scorching plate and its own "Why is the PLATE hot?" headline.
    frame: 115,
    lines: [],
    top: null,
  },
  {
    id: "E001ShortThumbStandingTime",
    short: "StandingTime",
    // ST02 end: cross-section, outside hot, middle still cool.
    frame: 365,
    lines: [
      { text: "BEEP.", color: palette.warmIvory },
      { text: "NOT DONE YET.", color: palette.discoveryGold },
    ],
    // Below the "middle: still cool" chip.
    top: 1490,
  },
  {
    id: "E001ShortThumbSuperheatedWater",
    short: "SuperheatedWater",
    // SW04: the superheated water erupting from the cup.
    frame: 690,
    lines: [
      { text: "HOTTER THAN", color: palette.warmIvory },
      { text: "BOILING", color: palette.discoveryGold },
    ],
    top: 1380,
  },
];

const SIZE = 118;

const Picture: React.FC<{ short: Thumb["short"] }> = ({ short }) =>
  short === "HowMicrowavesWork" ? (
    <Episode001 narration={false} draft={false} soundDesign={false} music={false} sfx="v2" />
  ) : (
    <Episode001Short short={short} narration={false} soundDesign={false} draft={false} captions={false} />
  );

const ShortThumbnail: React.FC<{ thumb: Thumb }> = ({ thumb }) => (
  <AbsoluteFill style={{ backgroundColor: palette.inkNavy }}>
    <Freeze frame={thumb.frame}>
      <Picture short={thumb.short} />
    </Freeze>
    {thumb.top === null ? null : (
      <div
        style={{
          position: "absolute",
          top: thumb.top,
          left: 60,
          right: 60,
          textAlign: "center",
          fontFamily,
          fontSize: thumb.size ?? SIZE,
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: -1,
          textShadow: "0 6px 24px rgba(0, 0, 0, 0.65)",
        }}
      >
        {thumb.lines.map((l) => (
          <div key={l.text} style={{ color: l.color }}>
            {l.text}
          </div>
        ))}
      </div>
    )}
  </AbsoluteFill>
);

export const Episode001ShortsThumbnailStills = () => (
  <>
    {THUMBS.map((thumb) => (
      <Composition
        key={thumb.id}
        id={thumb.id}
        component={ShortThumbnail}
        defaultProps={{ thumb }}
        durationInFrames={
          thumb.short === "HowMicrowavesWork"
            ? episode001.durationInFrames
            : episode001Shorts[thumb.short].board.durationInFrames
        }
        fps={30}
        width={1080}
        height={1920}
      />
    ))}
  </>
);
