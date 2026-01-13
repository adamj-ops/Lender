/**
 * Scoring Module
 *
 * Exports all scoring calculations for IDS and PRI
 */

// IDS (Investor Deal Score) calculations
export {
  calculateIDS,
  calculateNetYieldScore,
  calculateProtectionScore,
  calculateRiskQualityScore,
  calculateDurationScore,
  calculateConfidenceScore,
  createIDSScore,
} from './ids';

// PRI (Portfolio Risk Index) calculations
export {
  calculatePRI,
  calculateWeightedAverageRisk,
  calculateConcentrationRisk,
  calculateDurationMismatch,
  calculateCorrelationRisk,
  calculateLiquidityStress,
  getPRIBand,
  createPortfolioSnapshot,
  getConcentrationWarnings,
  type PortfolioLoan,
  type CapitalCommitment,
} from './pri';

// Constants and configuration
export * from './constants';
