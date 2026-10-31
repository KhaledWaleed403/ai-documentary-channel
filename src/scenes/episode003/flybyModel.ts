// The one demonstration flyby used in Scenes 3–8, so every view shows the same physics.
// Planet-frame path: an unpowered hyperbola (orbits.ts). Sun frame: the planet's
// velocity (constant over the short flyby) added to the planet-relative motion.
// Units: px and frames. Math coordinates (y up) are converted to screen by `scr`.
import { add, fromAngle, len, makeFlyby, mul, type V2 } from "./orbits";

// Planet-relative speed far from Jupiter and Jupiter's speed (relative to the Sun), px/frame.
export const V_INF = 2.6;
export const V_PLANET = 2.6;
export const PLANET_VEL: V2 = { x: V_PLANET, y: 0 };

// Passes behind Jupiter (on its trailing side) and turns clockwise by 105°.
export const FLYBY = makeFlyby({ vInf: V_INF, turnDeg: 105, rp: 74, inDeg: 125, cw: true });
// The mirror-image pass in front of Jupiter (leading side), used for braking.
export const FLYBY_FRONT = makeFlyby({ vInf: V_INF, turnDeg: 105, rp: 74, inDeg: 55, cw: false });

// Half-length of the replayed flyby, frames either side of closest approach.
export const HALF = 105;

export const scr = (p: V2, origin: V2, scale = 1): V2 => ({ x: origin.x + p.x * scale, y: origin.y - p.y * scale });

// Samples of the planet-relative path, tau ∈ [-HALF, HALF].
export const relPath = (fly = FLYBY, half = HALF, steps = 160) =>
  Array.from({ length: steps + 1 }, (_, i) => fly.rel(-half + (2 * half * i) / steps).p);

// Velocity relative to the Sun.
export const sunVel = (tau: number, fly = FLYBY) => add(fly.rel(tau).v, PLANET_VEL);

export const speedRelPlanet = (tau: number, fly = FLYBY) => len(fly.rel(tau).v);
export const speedRelSun = (tau: number, fly = FLYBY) => len(sunVel(tau, fly));

// Asymptotic velocities (far from the planet).
export const vInRel = (fly = FLYBY) => fromAngle(fly.inDeg, V_INF);
export const vOutRel = (fly = FLYBY) => fromAngle(fly.outDeg, V_INF);
export const vInSun = (fly = FLYBY) => add(vInRel(fly), PLANET_VEL);
export const vOutSun = (fly = FLYBY) => add(vOutRel(fly), PLANET_VEL);

// Sun-frame path given the planet's position at closest approach.
export const sunPath = (planetAtCA: V2, fly = FLYBY, half = HALF, steps = 160) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const tau = -half + (2 * half * i) / steps;
    return add(add(planetAtCA, mul(PLANET_VEL, tau)), fly.rel(tau).p);
  });
