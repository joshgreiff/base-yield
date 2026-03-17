export type ProductMode = "money" | "yield";

export type ModeProfile = {
  id: ProductMode;
  name: string;
  strategy: string;
  targetApy: number;
  targetRange: string;
  yieldSource: string;
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

export type YieldPayoutPreference = "usd" | "btc";

export type BtcAccumulationResult = {
  annualYieldUsd: number;
  annualYieldConvertedUsd: number;
  estimatedBtcAccumulated: number;
};

const profiles: Record<ProductMode, ModeProfile> = {
  money: {
    id: "money",
    name: "Money Mode",
    strategy:
      "Stability-focused wrapper with higher reserves and a cash-like sleeve for daily liquidity posture.",
    targetApy: 8.9,
    targetRange: "8-10%",
    yieldSource: "Base STRC carry + reserve sleeve",
    reserveBuffer: 10,
    strcExposure: 70,
    tacticalSleeve: 20,
    baseVolatility: 2.8,
    liquidity: "Daily windows"
  },
  yield: {
    id: "yield",
    name: "Yield Mode",
    strategy:
      "Yield-focused wrapper with higher STRC exposure and optional structured overlays for enhanced return potential.",
    targetApy: 19.5,
    targetRange: "15-25%",
    yieldSource: "Base STRC carry + optional leverage/options overlays",
    reserveBuffer: 5,
    strcExposure: 90,
    tacticalSleeve: 5,
    baseVolatility: 11.8,
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
  const reserveYieldSensitivity = mode === "money" ? 0.18 : 0.42;
  const reserveVolSensitivity = mode === "money" ? 0.22 : 0.35;
  const apyBounds = mode === "money" ? [7, 10.5] : [15, 28];
  const volBounds = mode === "money" ? [1.2, 7.5] : [6, 22];

  const apy = clamp(
    profile.targetApy - reserveDelta * reserveYieldSensitivity,
    apyBounds[0],
    apyBounds[1]
  );
  const volatility = clamp(
    profile.baseVolatility - reserveDelta * reserveVolSensitivity,
    volBounds[0],
    volBounds[1]
  );
  const navWidth = clamp(volatility * 0.1, 0.2, 2.0);
  const navBand: [number, number] = [100 - navWidth, 100 + navWidth];

  const redemptionBase = mode === "money" ? 18 : 56;
  const estimatedRedemptionHours = clamp(redemptionBase - reserveDelta * 2.2, 6, 120);
  const liquidityLabel =
    estimatedRedemptionHours <= 24
      ? "Higher immediate liquidity"
      : "Windowed liquidity with queue risk";

  return {
    apy: round(apy),
    volatility: round(volatility),
    navBand: [round(navBand[0]), round(navBand[1])],
    reserveRatio: round(adjustedReserve),
    estimatedRedemptionHours: round(estimatedRedemptionHours),
    liquidityLabel
  };
}

export function simulateBtcAccumulation(
  positionUsd: number,
  apyPercent: number,
  convertPercent: number,
  btcPriceUsd: number
): BtcAccumulationResult {
  const normalizedConvert = clamp(convertPercent, 0, 100) / 100;
  const annualYieldUsd = positionUsd * (apyPercent / 100);
  const annualYieldConvertedUsd = annualYieldUsd * normalizedConvert;
  const estimatedBtcAccumulated = annualYieldConvertedUsd / btcPriceUsd;

  return {
    annualYieldUsd: round(annualYieldUsd),
    annualYieldConvertedUsd: round(annualYieldConvertedUsd),
    estimatedBtcAccumulated: Math.round(estimatedBtcAccumulated * 1e6) / 1e6
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
