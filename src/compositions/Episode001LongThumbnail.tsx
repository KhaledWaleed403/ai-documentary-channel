// Episode 001 long-form YouTube thumbnail (a still, not part of the video).
// Built from the long-form's own drawings: an X-ray oven (as in Scene 7) with a
// patchy hot/cold bowl, plus a magnified inset of water molecules under the field.
// Render: npx remotion still E001LongThumbnail thumbnails/episode-001/Long/<version>/thumbnail-3840x2160.png --scale=2 (3840×2160).
import React from "react";
import { Still } from "remotion";
import { SignalPath } from "../components/SignalPath";
import { C, FieldArrows, INK_2, Molecule, OvenFront, SoupBowl, Stage, Txt } from "../scenes/episode001Long/shared";

const Inside: React.FC = () => (
  <g>
    <rect x={40} y={-200} width={110} height={70} rx={10} fill={C.signalTeal} opacity={0.75} />
    <g opacity={0.85} filter="url(#glow)">
      {Array.from({ length: 5 }).map((_, i) => (
        <SignalPath key={i} points={[[-500, -175 + i * 62], [180, -175 + i * 62]]} progress={1} stroke={C.signalTeal} width={6} amplitude={12} wavelength={96} phase={i * 1.3} />
      ))}
    </g>
    <SoupBowl x={-150} y={110} w={360} soup={C.energyOrange} />
    {/* Uneven heating on the soup surface: hot spots and one cold spot. */}
    <ellipse cx={-75} cy={110} rx={58} ry={18} fill={C.discoveryGold} filter="url(#soft)" opacity={0.95} />
    <ellipse cx={-75} cy={110} rx={40} ry={12} fill={C.discoveryGold} />
    <ellipse cx={-235} cy={112} rx={48} ry={16} fill={C.mistBlue} />
  </g>
);

export const E001LongThumbnail: React.FC = () => (
  <Stage grid>
    <rect x={0} y={905} width={1920} height={175} fill={INK_2} />
    <OvenFront x={700} y={600} w={1120} glass={0.1} inside={<Inside />} />

    {/* Leader from the bowl's surface to the magnified inset. */}
    <path d="M640 720 Q1000 980 1252 712" fill="none" stroke={C.warmIvory} strokeOpacity={0.7} strokeWidth={5} strokeDasharray="16 12" />

    <g transform="translate(1480 520)">
      <circle r={300} fill={INK_2} stroke={C.signalTeal} strokeWidth={10} />
      <circle r={300} fill="none" stroke={C.signalTeal} strokeWidth={26} opacity={0.25} filter="url(#soft)" />
      <FieldArrows x0={-150} x1={150} y={-170} n={3} field={1} len={110} />
      {/* Crowded, out-of-sync molecules warming under the field. */}
      <Molecule x={-140} y={-30} angle={-35} s={0.95} color={C.energyOrange} />
      <Molecule x={60} y={-60} angle={160} s={0.9} color={C.discoveryGold} />
      <Molecule x={-60} y={130} angle={20} s={0.9} color={C.discoveryGold} />
      <Molecule x={140} y={95} angle={-120} s={0.95} color={C.energyOrange} />
    </g>

    <Txt x={110} y={180} size={150} color={C.discoveryGold} anchor="start" weight={800}>
      2.45 BILLION
    </Txt>
    <Txt x={116} y={258} size={66} color={C.warmIvory} anchor="start" weight={700}>
      TIMES A SECOND
    </Txt>
  </Stage>
);

export const Episode001LongThumbnailStill: React.FC = () => (
  <Still id="E001LongThumbnail" component={E001LongThumbnail} width={1920} height={1080} />
);
