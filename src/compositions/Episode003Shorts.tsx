import React from "react";
import { AbsoluteFill, Composition, useCurrentFrame } from "remotion";
import { progress } from "../animations/timing";
import { AudioCue } from "../components/AudioCue";
import { Captions } from "../components/Captions";
import { type Ep3ShortName, episode003Shorts } from "../data/episode003Shorts";
import { K } from "../scenes/episode003/kit";
import { SH, SHORT_SCENES, SW } from "../scenes/episode003/shortScenes";
import { fontFamily } from "../styles/theme";

// Caption block bottom edge, clear of the Shorts UI in the bottom 20% (channel convention).
const CAPTION_BOTTOM = 1520;
const CAPTION_BACKING = "rgba(2, 4, 10, 0.8)";

// Restrained accent words: cyan = spacecraft, amber = planets and the Sun.
const EMPHASIS: Record<string, string> = {
  spacecraft: K.cyan,
  faster: K.cyan,
  direction: K.cyan,
  planet: K.amber,
  "planet's": K.amber,
  sun: K.amber,
  venus: K.amber,
  sideways: K.amber,
  energy: K.ivory,
  alignment: K.amber,
  voyager: K.cyan,
  parker: K.cyan,
};

export type Episode003ShortProps = { short: Ep3ShortName; captions: boolean };

// Title for the whole Short; top edge at y 170 keeps it below the TikTok / Reels header bar.
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
      <div style={{ fontSize: 74, fontWeight: 750, lineHeight: 1.15, color: K.ivory, textWrap: "balance" }}>{title}</div>
    </div>
  );
};

export const Episode003Short: React.FC<Episode003ShortProps> = ({ short, captions }) => {
  const frame = useCurrentFrame();
  const data = episode003Shorts.find((s) => s.name === short);
  if (!data) {
    throw new Error(`Unknown Short ${short}`);
  }
  const Scene = SHORT_SCENES[short];
  return (
    <AbsoluteFill style={{ backgroundColor: K.bg }}>
      <Scene t={frame} dur={data.durationInFrames} beats={data.beats} />
      <TopText title={data.title} />
      {captions ? <Captions cues={data.captions} bottom={CAPTION_BOTTOM} color="#FFFFFF" backing={CAPTION_BACKING} fontSize={50} emphasis={EMPHASIS} /> : null}
      {data.vo.map((c) => (
        <AudioCue key={c.id} name={`VO ${c.id}`} src={c.src} from={c.from} volume={c.volume} />
      ))}
    </AbsoluteFill>
  );
};

export const Episode003ShortsCompositions = () => (
  <>
    {episode003Shorts.map((s) => (
      <Composition
        key={s.name}
        id={`Ep003Short-${s.name}`}
        component={Episode003Short}
        durationInFrames={s.durationInFrames}
        fps={30}
        width={SW}
        height={SH}
        defaultProps={{ short: s.name, captions: true }}
      />
    ))}
  </>
);
