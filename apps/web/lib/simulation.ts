export type ProductMode = "money" | "yield";

export type ModeProfile = {
  id: ProductMode;
  name: string;
  strategy: string;
  targetApy: number;
  reserveBuffer: number;
  strcExposure: number;
  tacticalSleeve: number;
  baseVolatility: number;
  liquidity: string;
};

export type SimulationResult = {
  apy: number;
  volatility: number;
  navBand: [number, number];
  reserveRatio: number;
  estimatedRedemptionHours: number;
  liquidityLabel: string;
};

const profiles: Record<ProductMode, ModeProfile> = {
  money: {
    id: "money",
    name: "Money Mode",
    strategy:
      "Stability-focused wrapper with higher reserves and a cash-like sleeve for daily liquidity posture.",
    targetApy: 5.8,
    reserveBuffer: 10,
    strcExposure: 70,
    tacticalSleeve: 20,
    baseVolatility: 3.2,
    liquidity: "Daily windows"
  },
  yield: {
    id: "yield",
    name: "Yield Mode",
    strategy:
      "Yield-focused wrapper with higher STRC exposure and a smaller reserve for enhanced return potential.",
    targetApy: 11.6,
    reserveBuffer: 5,
    strcExposure: 90,
    tacticalSleeve: 5,
    baseVolatility: 9.4,
    liquidity: "Windowed + potential lockups"
  }
};

export function getModeProfile(mode: ProductMode): ModeProfile {
  return profiles[mode];
}

export function listProfiles(): ModeProfile[] {
  return Object.values(profiles);
}

export function simulateMode(mode: ProductMode, reserveAdjust: number): SimulationResult {
  const profile = profiles[mode];
  const adjustedReserve = clamp(profile.reserveBuffer + reserveAdjust, 2, 25);
  const reserveDelta = adjustedReserve - profile.reserveBuffer;

  // Higher reserve generally lowers yield and dampens volatility.
  const apy = clamp(profile.targetApy - reserveDelta * 0.22, 2.1, 16.5);
  const volatility = clamp(profile.baseVolatility - reserveDelta * 0.24, 1.4, 18.0);
  const navWidth = clamp(volatility * 0.1, 0.2, 2.0);
  const navBand: [number, number] = [100 - navWidth, 100 + navWidth];

  const estimatedRedemptionHours = clamp(24 - reserveDelta * 1.8, 6, 96);
  const liquidityLabel =
    estimatedRedemptionHours <= 24 ? "Higher immediate liquidity" : "More queued liquidity";

  return {
    apy: round(apy),
    volatility: round(volatility),
    navBand: [round(navBand[0]), round(navBand[1])],
    reserveRatio: round(adjustedReserve),
    estimatedRedemptionHours: round(estimatedRedemptionHours),
    liquidityLabel
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
