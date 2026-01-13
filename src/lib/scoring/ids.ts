/**
 * Investor Deal Score (IDS) Calculation
 *
 * IDS answers: "How attractive is this deal relative to other uses of my capital?"
 * Score Range: 0-100
 *
 * AUTHORITATIVE calculation logic per Unified Specification v1.0
 */

import {
  IDS_WEIGHTS,
  NET_YIELD_PARAMS,
  PROTECTION_PARAMS,
  DURATION_PARAMS,
  CONFIDENCE_PARAMS,
} from './constants';
import type { IDSComponents, IDSInputSnapshot, IDSScore } from '@/types';

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate Net Yield Score (30% weight)
 *
 * Measures risk-adjusted return after costs and reserves.
 *
 * Formula:
 *   NetYield = InterestRate - ServicingCost - LossReserve
 *   NetYieldScore = clamp((NetYield - 6%) / (14% - 6%) × 100, 0, 100)
 *
 * Interpretation:
 *   6% net yield = 0 points
 *   14% net yield = 100 points
 */
export function calculateNetYieldScore(
  interestRate: number,
  servicingCost: number = NET_YIELD_PARAMS.DEFAULT_SERVICING_COST,
  lossReserve: number = NET_YIELD_PARAMS.DEFAULT_LOSS_RESERVE
): number {
  const netYield = interestRate - servicingCost - lossReserve;

  const { MIN_YIELD, MAX_YIELD } = NET_YIELD_PARAMS;
  const rawScore = ((netYield - MIN_YIELD) / (MAX_YIELD - MIN_YIELD)) * 100;

  return clamp(Math.round(rawScore * 100) / 100, 0, 100);
}

/**
 * Calculate Downside Protection Score (25% weight)
 *
 * Measures equity cushion protecting against loss.
 *
 * Formula:
 *   ProtectionScore = 0.6 × (1 - LTV/MaxLTV) + 0.4 × (1 - LTC/MaxLTC)
 *
 * Interpretation:
 *   Lower LTV/LTC = higher protection
 *   60% weight on LTV, 40% on LTC
 */
export function calculateProtectionScore(ltv: number, ltc: number): number {
  const { MAX_LTV, MAX_LTC, LTV_WEIGHT, LTC_WEIGHT } = PROTECTION_PARAMS;

  // Normalize to 0-1 scale (how much below max)
  const ltvProtection = 1 - ltv / MAX_LTV;
  const ltcProtection = 1 - ltc / MAX_LTC;

  // Weighted combination
  const rawScore = (LTV_WEIGHT * ltvProtection + LTC_WEIGHT * ltcProtection) * 100;

  return clamp(Math.round(rawScore * 100) / 100, 0, 100);
}

/**
 * Calculate Risk Quality Score (20% weight)
 *
 * Inverts the raw risk score to reward lower-risk deals.
 *
 * Formula:
 *   RiskQualityScore = 100 - RiskScore
 */
export function calculateRiskQualityScore(riskScore: number): number {
  return clamp(100 - riskScore, 0, 100);
}

/**
 * Calculate Duration & Liquidity Score (15% weight)
 *
 * Favors shorter terms and clearer exits.
 *
 * Formula:
 *   DurationScore = 100 - (TermMonths - 6) × 2
 *
 * Modifiers:
 *   +10 points: Contracted exit (purchase agreement signed)
 *   -10 points: Refinance dependency (no sale backup)
 */
export function calculateDurationScore(
  termMonths: number,
  hasContractedExit: boolean = false,
  hasRefinanceDependency: boolean = false
): number {
  const { BASE_TERM_MONTHS, PENALTY_PER_MONTH, CONTRACTED_EXIT_BONUS, REFI_DEPENDENCY_PENALTY } =
    DURATION_PARAMS;

  let score = 100 - (termMonths - BASE_TERM_MONTHS) * PENALTY_PER_MONTH;

  // Apply modifiers
  if (hasContractedExit) {
    score += CONTRACTED_EXIT_BONUS;
  }
  if (hasRefinanceDependency) {
    score += REFI_DEPENDENCY_PENALTY;
  }

  return clamp(Math.round(score * 100) / 100, 0, 100);
}

/**
 * Calculate Confidence Factor Score (10% weight)
 *
 * Measures data quality and underwriting confidence.
 *
 * Formula:
 *   ConfidenceScore = DataConfidence × 0.4 + ARVConfidence × 0.4 + BorrowerHistoryScore × 0.2
 */
export function calculateConfidenceScore(
  dataConfidence: number,
  arvConfidence: number,
  borrowerHistoryScore: number
): number {
  const { DATA_CONFIDENCE_WEIGHT, ARV_CONFIDENCE_WEIGHT, BORROWER_HISTORY_WEIGHT } =
    CONFIDENCE_PARAMS;

  const score =
    dataConfidence * DATA_CONFIDENCE_WEIGHT +
    arvConfidence * ARV_CONFIDENCE_WEIGHT +
    borrowerHistoryScore * BORROWER_HISTORY_WEIGHT;

  return clamp(Math.round(score * 100) / 100, 0, 100);
}

/**
 * Calculate Complete IDS Score
 *
 * Final Formula:
 *   IDS = 0.30 × NetYieldScore
 *       + 0.25 × ProtectionScore
 *       + 0.20 × RiskQualityScore
 *       + 0.15 × DurationScore
 *       + 0.10 × ConfidenceScore
 */
export function calculateIDS(inputs: IDSInputSnapshot): {
  score: number;
  components: IDSComponents;
} {
  // Calculate each component
  const netYieldScore = calculateNetYieldScore(
    inputs.interestRate,
    inputs.servicingCost,
    inputs.lossReserve
  );

  const protectionScore = calculateProtectionScore(inputs.ltv, inputs.ltc);

  const riskQualityScore = calculateRiskQualityScore(inputs.riskScore);

  const durationScore = calculateDurationScore(
    inputs.termMonths,
    inputs.hasContractedExit,
    inputs.hasRefinanceDependency
  );

  const confidenceScore = calculateConfidenceScore(
    inputs.dataConfidence,
    inputs.arvConfidence,
    inputs.borrowerHistoryScore
  );

  // Assemble components
  const components: IDSComponents = {
    netYieldScore,
    protectionScore,
    riskQualityScore,
    durationScore,
    confidenceScore,
  };

  // Calculate weighted final score
  const score =
    IDS_WEIGHTS.NET_YIELD * netYieldScore +
    IDS_WEIGHTS.DOWNSIDE_PROTECTION * protectionScore +
    IDS_WEIGHTS.RISK_QUALITY * riskQualityScore +
    IDS_WEIGHTS.DURATION * durationScore +
    IDS_WEIGHTS.CONFIDENCE * confidenceScore;

  return {
    score: Math.round(score * 100) / 100,
    components,
  };
}

/**
 * Create a full IDS Score record for storage
 */
export function createIDSScore(
  loanId: string,
  inputs: IDSInputSnapshot,
  triggeredBy: string
): Omit<IDSScore, 'id'> {
  const { score, components } = calculateIDS(inputs);

  return {
    loanId,
    score,
    components,
    calculatedAt: new Date().toISOString(),
    version: '1.0.0',
    triggeredBy,
    inputSnapshot: inputs,
  };
}
