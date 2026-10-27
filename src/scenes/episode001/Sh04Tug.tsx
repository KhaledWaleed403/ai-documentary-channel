import React from "react";
import { useCurrentFrame } from "remotion";
import { progress } from "../../animations/timing";
import { palette } from "../../styles/theme";
import { MoleculeField } from "./molecules";
import { SceneProps, Stage } from "./shared";

// SH04: the waves' pull switches direction and tugs water molecules part-way.
export const Sh04Tug: React.FC<SceneProps> = ({ shot, duration }) => {
  const frame = useCurrentFrame();
  const [plus, minus] = shot.onScreenText;
  return (
    <Stage bg={palette.inkNavy}>
      <MoleculeField
        t={frame}
        jitter={0.45 * progress(frame, duration - 55, 55)}
        appear={progress(frame, 0, 24)}
        arrowOpacity={0.55 * progress(frame, 10, 20)}
        outline={palette.inkNavy}
        labels={{ plus, minus, color: palette.discoveryGold }}
      />
    </Stage>
  );
};
