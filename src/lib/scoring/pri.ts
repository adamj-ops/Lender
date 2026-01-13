/**
 * Portfolio Risk Index (PRI) Calculation
 *
 * PRI answers: "How risky is my portfolio as a system, not as individual loans?"
 * Score Range: 0-100 (higher = riskier)
 *
 * AUTHORITATIVE calculation logic per Unified Specification v1.0
 */

import {
  PRI_WEIGHTS,
  PRI_BANDS,
  CONCENTRATION_THRESHOLDS,
  CONCENTRATION_WARNING_LEVEL,
} from './constants';
import type {
  PRIComponents,
  PRIScore,
  PRIBand,
  ConcentrationBreakdown,
  ConcentrationItem,
  PortfolioSnapshot,
} from '@/types';

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Loan data required for PRI calculation
 */
export interface PortfolioLoan {
  id: string;
  riskScore: number;
  exposure: number;        // Principal amount
  termMonths: number;
  market: string;
  borrowerId: string;
  collateralType: string;
  loanType: string;
  maturityDate: string;
  correlationFactors?: string[];  // Shared contractors, etc.
}

/**
 * Capital commitment data
 */
export interface CapitalCommitment {
  amount: number;
  commitmentEndDate: string;
}

/**
 * Calculate Weighted Average Risk (30% weight)
 *
 * Formula:
 *   WeightedRisk = Σ(LoanRisk × Exposure) / TotalExposure
 */
export function calculateWeightedAverageRisk(loans: PortfolioLoan[]): number {
  if (loans.length === 0) return 0;

  const totalExposure = loans.reduce((sum, loan) => sum + loan.exposure, 0);
  if (totalExposure === 0) return 0;

  const weightedSum = loans.reduce((sum, loan) => sum + loan.riskScore * loan.exposure, 0);

  return Math.round((weightedSum / totalExposure) * 100) / 100;
}

/**
 * Calculate Concentration Risk (25% weight)
 *
 * Penalties applied when exposure exceeds thresholds:
 * - Single Market > 25%: +15 risk points
 * - Single Borrower > 20%: +20 risk points
 * - Single Asset Type > 40%: +10 risk points
 */
export function calculateConcentrationRisk(
  loans: PortfolioLoan[]
): { score: number; breakdown: ConcentrationBreakdown } {
  const totalExposure = loans.reduce((sum, loan) => sum + loan.exposure, 0);
  if (totalExposure === 0) {
    return {
      score: 0,
      breakdown: { byMarket: [], byBorrower: [], byAssetType: [], byLoanType: [] },
    };
  }

  // Group by market
  const byMarket = groupByKey(loans, 'market', totalExposure, CONCENTRATION_THRESHOLDS.SINGLE_MARKET.threshold);

  // Group by borrower
  const byBorrower = groupByKey(loans, 'borrowerId', totalExposure, CONCENTRATION_THRESHOLDS.SINGLE_BORROWER.threshold);

  // Group by asset type
  const byAssetType = groupByKey(loans, 'collateralType', totalExposure, CONCENTRATION_THRESHOLDS.SINGLE_ASSET_TYPE.threshold);

  // Group by loan type
  const byLoanType = groupByKey(loans, 'loanType', totalExposure, 0.50); // 50% threshold for loan type

  // Calculate penalty score
  let penaltyScore = 0;

  // Market concentration penalties
  byMarket.forEach((item) => {
    if (item.breached) {
      penaltyScore += CONCENTRATION_THRESHOLDS.SINGLE_MARKET.penalty;
    }
  });

  // Borrower concentration penalties
  byBorrower.forEach((item) => {
    if (item.breached) {
      penaltyScore += CONCENTRATION_THRESHOLDS.SINGLE_BORROWER.penalty;
    }
  });

  // Asset type concentration penalties
  byAssetType.forEach((item) => {
    if (item.breached) {
      penaltyScore += CONCENTRATION_THRESHOLDS.SINGLE_ASSET_TYPE.penalty;
    }
  });

  return {
    score: clamp(penaltyScore, 0, 100),
    breakdown: { byMarket, byBorrower, byAssetType, byLoanType },
  };
}

/**
 * Group loans by a key and calculate concentration
 */
function groupByKey(
  loans: PortfolioLoan[],
  key: keyof PortfolioLoan,
  totalExposure: number,
  threshold: number
): ConcentrationItem[] {
  const groups = new Map<string, number>();

  loans.forEach((loan) => {
    const value = String(loan[key]);
    groups.set(value, (groups.get(value) || 0) + loan.exposure);
  });

  return Array.from(groups.entries())
    .map(([groupKey, exposure]) => ({
      key: groupKey,
      label: groupKey,
      exposure,
      percentage: exposure / totalExposure,
      threshold,
      breached: exposure / totalExposure > threshold,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

/**
 * Calculate Duration Mismatch (15% weight)
 *
 * Formula:
 *   DurationMismatch = AvgLoanTerm - AvgCapitalCommitment
 *
 * Positive = loans mature after capital commitments end (bad)
 * Negative = loans mature before capital commitments end (good)
 */
export function calculateDurationMismatch(
  loans: PortfolioLoan[],
  capitalCommitments: CapitalCommitment[]
): number {
  if (loans.length === 0) return 0;

  const totalExposure = loans.reduce((sum, loan) => sum + loan.exposure, 0);

  // Weighted average loan term
  const avgLoanTerm = loans.reduce((sum, loan) => sum + loan.termMonths * loan.exposure, 0) / totalExposure;

  // Weighted average capital commitment (in months from now)
  const now = new Date();
  const totalCapital = capitalCommitments.reduce((sum, c) => sum + c.amount, 0);
  if (totalCapital === 0) return avgLoanTerm; // No committed capital = high mismatch

  const avgCapitalCommitment =
    capitalCommitments.reduce((sum, c) => {
      const endDate = new Date(c.commitmentEndDate);
      const monthsRemaining = Math.max(0, (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30));
      return sum + monthsRemaining * c.amount;
    }, 0) / totalCapital;

  const mismatch = avgLoanTerm - avgCapitalCommitment;

  // Convert to 0-100 score (positive mismatch = higher risk)
  // Each month of mismatch adds 5 points
  return clamp(Math.max(0, mismatch * 5), 0, 100);
}

/**
 * Calculate Correlation Risk (15% weight)
 *
 * Identifies hidden correlations like shared contractors, same exit timeline, etc.
 */
export function calculateCorrelationRisk(loans: PortfolioLoan[]): number {
  if (loans.length < 2) return 0;

  let correlationScore = 0;

  // Check for shared correlation factors
  const factorCounts = new Map<string, number>();
  loans.forEach((loan) => {
    loan.correlationFactors?.forEach((factor) => {
      factorCounts.set(factor, (factorCounts.get(factor) || 0) + 1);
    });
  });

  // Penalize shared factors
  factorCounts.forEach((count) => {
    if (count > 1) {
      correlationScore += count * 5; // 5 points per additional correlated loan
    }
  });

  // Check for maturity clustering
  const maturityMonths = new Map<string, number>();
  loans.forEach((loan) => {
    const monthKey = loan.maturityDate.substring(0, 7); // YYYY-MM
    maturityMonths.set(monthKey, (maturityMonths.get(monthKey) || 0) + 1);
  });

  maturityMonths.forEach((count) => {
    if (count > 2) {
      correlationScore += (count - 2) * 3; // Penalize more than 2 loans maturing same month
    }
  });

  return clamp(correlationScore, 0, 100);
}

/**
 * Calculate Liquidity Stress (15% weight)
 *
 * Simulated shock scenarios:
 * - 10% loan extensions
 * - 90-day liquidity freeze
 * - 15% ARV compression
 */
export function calculateLiquidityStress(
  loans: PortfolioLoan[],
  availableLiquidity: number
): number {
  if (loans.length === 0) return 0;

  const totalExposure = loans.reduce((sum, loan) => sum + loan.exposure, 0);
  let stressScore = 0;

  // Scenario 1: 10% of loans extend (need to carry extra months)
  const extensionImpact = totalExposure * 0.10 * 0.01; // Extra month of carry cost
  if (extensionImpact > availableLiquidity * 0.05) {
    stressScore += 20;
  }

  // Scenario 2: 90-day liquidity freeze
  // Check if we can handle no new capital for 90 days
  const monthlyBurnRate = totalExposure * 0.005; // Rough operating cost estimate
  if (availableLiquidity < monthlyBurnRate * 3) {
    stressScore += 30;
  }

  // Scenario 3: 15% ARV compression
  // Simplified: if portfolio has high LTV loans, more vulnerable
  const highLtvLoans = loans.filter((loan) => loan.riskScore > 60);
  if (highLtvLoans.length / loans.length > 0.3) {
    stressScore += 25;
  }

  return clamp(stressScore, 0, 100);
}

/**
 * Determine PRI Band from score
 */
export function getPRIBand(score: number): PRIBand {
  if (score <= PRI_BANDS.CONSERVATIVE.max) return 'conservative';
  if (score <= PRI_BANDS.MODERATE.max) return 'moderate';
  if (score <= PRI_BANDS.ELEVATED.max) return 'elevated';
  if (score <= PRI_BANDS.HIGH.max) return 'high';
  return 'critical';
}

/**
 * Calculate Complete PRI Score
 *
 * Final Formula:
 *   PRI = 0.30 × WeightedAverageRisk
 *       + 0.25 × ConcentrationRisk
 *       + 0.15 × DurationMismatch
 *       + 0.15 × CorrelationRisk
 *       + 0.15 × LiquidityStress
 */
export function calculatePRI(
  loans: PortfolioLoan[],
  capitalCommitments: CapitalCommitment[],
  availableLiquidity: number
): {
  score: number;
  band: PRIBand;
  components: PRIComponents;
  concentrations: ConcentrationBreakdown;
} {
  // Calculate each component
  const weightedAverageRisk = calculateWeightedAverageRisk(loans);
  const { score: concentrationRisk, breakdown: concentrations } = calculateConcentrationRisk(loans);
  const durationMismatch = calculateDurationMismatch(loans, capitalCommitments);
  const correlationRisk = calculateCorrelationRisk(loans);
  const liquidityStress = calculateLiquidityStress(loans, availableLiquidity);

  // Assemble components
  const components: PRIComponents = {
    weightedAverageRisk,
    concentrationRisk,
    durationMismatch,
    correlationRisk,
    liquidityStress,
  };

  // Calculate weighted final score
  const score =
    PRI_WEIGHTS.WEIGHTED_AVERAGE_RISK * weightedAverageRisk +
    PRI_WEIGHTS.CONCENTRATION_RISK * concentrationRisk +
    PRI_WEIGHTS.DURATION_MISMATCH * durationMismatch +
    PRI_WEIGHTS.CORRELATION_RISK * correlationRisk +
    PRI_WEIGHTS.LIQUIDITY_STRESS * liquidityStress;

  const finalScore = Math.round(clamp(score, 0, 100) * 100) / 100;

  return {
    score: finalScore,
    band: getPRIBand(finalScore),
    components,
    concentrations,
  };
}

/**
 * Create portfolio snapshot for audit
 */
export function createPortfolioSnapshot(loans: PortfolioLoan[]): PortfolioSnapshot {
  const totalExposure = loans.reduce((sum, loan) => sum + loan.exposure, 0);

  return {
    totalExposure,
    loanCount: loans.length,
    avgLoanSize: loans.length > 0 ? totalExposure / loans.length : 0,
    avgRiskScore: calculateWeightedAverageRisk(loans),
    avgTermMonths:
      loans.length > 0
        ? loans.reduce((sum, loan) => sum + loan.termMonths, 0) / loans.length
        : 0,
    avgCapitalCommitment: 0, // Filled in by caller
  };
}

/**
 * Check if any concentration is approaching threshold
 */
export function getConcentrationWarnings(breakdown: ConcentrationBreakdown): ConcentrationItem[] {
  const warnings: ConcentrationItem[] = [];

  const checkItems = (items: ConcentrationItem[]) => {
    items.forEach((item) => {
      if (item.percentage >= item.threshold * CONCENTRATION_WARNING_LEVEL && !item.breached) {
        warnings.push(item);
      }
    });
  };

  checkItems(breakdown.byMarket);
  checkItems(breakdown.byBorrower);
  checkItems(breakdown.byAssetType);

  return warnings;
}
