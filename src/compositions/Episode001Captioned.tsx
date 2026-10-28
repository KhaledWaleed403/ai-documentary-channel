import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import captions from "../../episodes/episode-001/v2.4/captions.json";
import { Captions } from "../components/Captions";
import { episode001 } from "../data/episode001";
import { palette } from "../styles/theme";
import { Episode001 } from "./Episode001";

// HowMicrowavesWork v2.4: the approved v2.3 Short (Episode001SoundV2 props:
// narration on, V2 effects, no music, no draft overlay) with burned-in captions
// on top. Episode001 itself is unchanged. Cues: episodes/episode-001/v2.4/
// captions.json, aligned to the v2.3 takes by scripts/audio/build-ep001-captions.py.
const EMPHASIS: Record<string, string> = {
  microwaves: palette.signalTeal,
  waves: palette.signalTeal,
  "waves'": palette.signalTeal,
  heat: palette.discoveryGold,
  hot: palette.discoveryGold,
};

// The original frame uses y 1380–1550 (thermometer, hot/cold labels, the final
// bowl), so the picture is scaled to 0.86 about (540, 130) to make room for captions,
// like the other Shorts. Its margins are filled with a blurred, silent copy of
// the same frame, so the full-bleed ivory / mist / navy backgrounds continue
// without a seam.
const Episode001WithCaptions: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill
      style={{
        filter: "blur(90px)",
        transform: "scale(1.35)",
      }}
    >
      <Episode001
        narration={false}
        draft={false}
        soundDesign={false}
        music={false}
        sfx="v2"
      />
    </AbsoluteFill>
    <AbsoluteFill
      style={{
        transformOrigin: "540px 130px",
        transform: "scale(0.86)",
        maskImage:
          "linear-gradient(to bottom, #000 86%, transparent 100%), linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <Episode001 narration draft={false} soundDesign music={false} sfx="v2" />
    </AbsoluteFill>
    <Captions
      cues={captions.cues}
      bottom={1520}
      color="#FFFFFF"
      backing="rgba(17, 24, 39, 0.72)"
      emphasis={EMPHASIS}
    />
  </AbsoluteFill>
);

export const Episode001CaptionedComposition = () => (
  <Composition
    id="E001ShortHowMicrowavesWorkCaptioned"
    component={Episode001WithCaptions}
    durationInFrames={episode001.durationInFrames}
    fps={episode001.fps}
    width={episode001.width}
    height={episode001.height}
  />
);
