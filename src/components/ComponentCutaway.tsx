import React from "react";

type ComponentCutawayProps = {
  // Outer shell artwork (e.g. the oven's front panel).
  shell: React.ReactNode;
  // Internals revealed underneath.
  interior: React.ReactNode;
  // 0 = closed shell, 1 = fully cut away (shell reduced to a ghost outline).
  reveal: number;
  // Ghost outline drawn on top once the shell has gone, so context remains.
  ghost?: React.ReactNode;
  ghostOpacity?: number;
};

// Reveal a part's internals by fading its shell away while a ghost outline
// stays on top for context. Layers can be stacked for an X-ray build-up.
export const ComponentCutaway: React.FC<ComponentCutawayProps> = ({
  shell,
  interior,
  reveal,
  ghost,
  ghostOpacity = 0.45,
}) => (
  <g>
    <g opacity={reveal}>{interior}</g>
    <g opacity={1 - reveal}>{shell}</g>
    {ghost ? <g opacity={reveal * ghostOpacity}>{ghost}</g> : null}
  </g>
);
