// Luminexplain brand tokens. Colour roles: teal = waves/field, orange = heating,
// gold = hot, mist blue = cold.
export const palette = {
  inkNavy: "#111827",
  warmIvory: "#F4F1E8",
  signalTeal: "#27B7C8",
  energyOrange: "#F28C45",
  mistBlue: "#DDEBF2",
  discoveryGold: "#F4C95D",
} as const;

export type PaletteKey = keyof typeof palette;

export const fontFamily =
  '"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif';

export const strokeWidth = {
  thin: 4,
  base: 6,
  bold: 10,
} as const;
