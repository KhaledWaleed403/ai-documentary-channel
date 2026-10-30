import React from "react";
import { AbsoluteFill, Composition, useCurrentFrame } from "remotion";
import { progress } from "../animations/timing";
import { AudioCue } from "../components/AudioCue";
import { Captions } from "../components/Captions";
import { type ShortName, episode002Shorts } from "../data/episode002";
import { K } from "../scenes/episode002/kit";
import { SH, SHORT_SCENES, SW } from "../scenes/episode002/shortScenes";
import { fontFamily } from "../styles/theme";

// Caption block bottom edge, clear of the Shorts UI in the bottom 20% (channel convention).
const CAPTION_BOTTOM = 1520;
const CAPTION_BACKING = "rgba(5, 11, 22, 0.78)";

// Restrained accent words: cyan = systems/air/signals, amber = CO₂/heat.
const EMPHASIS: Record<string, string> = {
  oxygen: K.cyan,
  "carbon": K.amber,
  dioxide: K.amber,
  gps: K.cyan,
  radio: K.cyan,
  hydrogen: K.ivory,
  coatings: K.cyan,
  food: K.amber,
};

export type Episode002ShortProps = { short: ShortName; captions: boolean };

// Title only, for the whole Short: each Short stands alone on YouTube, Instagram and TikTok.
// Top edge at y 170 keeps it below the TikTok / Reels header bar.
const TopText: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 170,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily,
        opacity: progress(frame, 0, 10),
      }}
    >
      <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.15, color: K.ivory }}>{title}</div>
    </div>
  );
};

export const Episode002Short: React.FC<Episode002ShortProps> = ({ short, captions }) => {
  const frame = useCurrentFrame();
  const data = episode002Shorts.find((s) => s.name === short);
  if (!data) {
    throw new Error(`Unknown Short ${short}`);
  }
  const Scene = SHORT_SCENES[short];
  const beats = data.lines.map((l) => l.start);
  return (
    <AbsoluteFill style={{ backgroundColor: K.bg }}>
      <Scene t={frame} dur={data.durationInFrames} beats={beats} />
      <TopText title={data.title} />
      {captions ? (
        <Captions cues={data.captions} bottom={CAPTION_BOTTOM} color="#FFFFFF" backing={CAPTION_BACKING} fontSize={50} emphasis={EMPHASIS} />
      ) : null}
      {data.vo.map((c) => (
        <AudioCue key={c.id} name={`VO ${c.id}`} src={c.src} from={c.from} volume={c.volume} />
      ))}
    </AbsoluteFill>
  );
};

export const Episode002ShortsCompositions = () => (
  <>
    {episode002Shorts.map((s) => (
      <Composition
        key={s.name}
        id={`Ep002Short-${s.name}`}
        component={Episode002Short}
        durationInFrames={s.durationInFrames}
        fps={30}
        width={SW}
        height={SH}
        defaultProps={{ short: s.name, captions: true }}
      />
    ))}
  </>
);
