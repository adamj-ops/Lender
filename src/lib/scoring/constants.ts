/**
 * Everyday Lending - Scoring Constants
 *
 * AUTHORITATIVE formulas and weights for IDS and PRI calculations.
 * These values are derived from the Unified Specification v1.0
 *
 * ⚠️ Changes to these values require compliance review.
 */

// ============================================
// IDS (Investor Deal Score) Configuration
// ============================================

/**
 * IDS Component Weights
 * Total must equal 1.0 (100%)
 */
export const IDS_WEIGHTS = {
  NET_YIELD: 0.30,           // 30% - Highest priority
  DOWNSIDE_PROTECTION: 0.25, // 25% - High priority
  RISK_QUALITY: 0.20,        // 20% - Medium priority
  DURATION: 0.15,            // 15% - Medium priority
  CONFIDENCE: 0.10,          // 10% - Modifier
} as const;

/**
 * Net Yield Score Parameters
 *
 * Formula:
 *   NetYield = InterestRate - ServicingCost - LossReserve
 *   NetYieldScore = clamp((NetYield - MIN) / (MAX - MIN) × 100, 0, 100)
 *
 * Interpretation:
 *   - 6% net yield = 0 points
 *   - 14% net yield = 100 points
 *   - Linear interpolation between
 */
export const NET_YIELD_PARAMS = {
  MIN_YIELD: 0.06,           // 6% - Floor (0 points)
  MAX_YIELD: 0.14,           // 14% - Ceiling (100 points)
  DEFAULT_SERVICING_COST: 0.0075, // 0.75% annual
  DEFAULT_LOSS_RESERVE: 0.01,     // 1% annual
} as const;

/**
 * Downside Protection Score Parameters
 *
 * Formula:
 *   ProtectionScore = 0.6 × (1 - LTV/MaxLTV) + 0.4 × (1 - LTC/MaxLTC)
 *
 * Interpretation:
 *   - Lower LTV/LTC = higher protection
 *   - 60% weight on LTV, 40% on LTC
 */
export const PROTECTION_PARAMS = {
  MAX_LTV: 0.75,             // 75% - Hard cap
  MAX_LTC: 0.90,             // 90% - Hard cap
  LTV_WEIGHT: 0.60,          // 60% of protection score
  LTC_WEIGHT: 0.40,          // 40% of protection score
} as const;

/**
 * Duration & Liquidity Score Parameters
 *
 * Formula:
 *   DurationScore = 100 - (TermMonths - BASE) × PENALTY_PER_MONTH
 *
 * Modifiers:
 *   +10 points: Contracted exit (purchase agreement signed)
 *   -10 points: Refinance dependency (no sale backup)
 *
 * Interpretation:
 *   - 6-month term = 100 points
 *   - Each additional month subtracts 2 points
 */
export const DURATION_PARAMS = {
  BASE_TERM_MONTHS: 6,       // Baseline term
  PENALTY_PER_MONTH: 2,      // Points deducted per month over base
  CONTRACTED_EXIT_BONUS: 10, // Bonus for signed purchase agreement
  REFI_DEPENDENCY_PENALTY: -10, // Penalty for no sale backup
} as const;

/**
 * Confidence Factor Parameters
 *
 * Formula:
 *   ConfidenceScore = DataConfidence × 0.4 + ARVConfidence × 0.4 + BorrowerHistoryScore × 0.2
 */
export const CONFIDENCE_PARAMS = {
  DATA_CONFIDENCE_WEIGHT: 0.40,
  ARV_CONFIDENCE_WEIGHT: 0.40,
  BORROWER_HISTORY_WEIGHT: 0.20,
} as const;

// ============================================
// PRI (Portfolio Risk Index) Configuration
// ============================================

/**
 * PRI Component Weights
 * Total must equal 1.0 (100%)
 */
export const PRI_WEIGHTS = {
  WEIGHTED_AVERAGE_RISK: 0.30, // 30%
  CONCENTRATION_RISK: 0.25,    // 25%
  DURATION_MISMATCH: 0.15,     // 15%
  CORRELATION_RISK: 0.15,      // 15%
  LIQUIDITY_STRESS: 0.15,      // 15%
} as const;

/**
 * Concentration Risk Thresholds
 *
 * Penalties applied when exposure exceeds thresholds
 */
export const CONCENTRATION_THRESHOLDS = {
  SINGLE_MARKET: {
    threshold: 0.25,           // 25%
    penalty: 15,               // +15 risk points
  },
  SINGLE_BORROWER: {
    threshold: 0.20,           // 20%
    penalty: 20,               // +20 risk points
  },
  SINGLE_ASSET_TYPE: {
    threshold: 0.40,           // 40%
    penalty: 10,               // +10 risk points
  },
} as const;

/**
 * Concentration Warning Level
 * Alert at this percentage of threshold
 */
export const CONCENTRATION_WARNING_LEVEL = 0.80; // 80%

/**
 * PRI Band Definitions
 * Higher score = riskier
 */
export const PRI_BANDS = {
  CONSERVATIVE: { min: 0, max: 25, label: 'Conservative' },
  MODERATE: { min: 26, max: 45, label: 'Moderate' },
  ELEVATED: { min: 46, max: 65, label: 'Elevated' },
  HIGH: { min: 66, max: 80, label: 'High' },
  CRITICAL: { min: 81, max: 100, label: 'Critical' },
} as const;

/**
 * Liquidity Stress Test Scenarios
 */
export const STRESS_SCENARIOS = {
  LOAN_EXTENSION: {
    name: '10% Loan Extensions',
    description: 'What if 10% of loans extend past maturity?',
    extensionRate: 0.10,
  },
  LIQUIDITY_FREEZE: {
    name: '90-Day Liquidity Freeze',
    description: 'Can portfolio survive no new capital for 90 days?',
    freezeDays: 90,
  },
  ARV_COMPRESSION: {
    name: '15% ARV Compression',
    description: 'What happens if property values drop 15%?',
    compressionRate: 0.15,
  },
} as const;

// ============================================
// Alert Thresholds
// ============================================

export const ALERT_THRESHOLDS = {
  IDS_CHANGE_EXPLANATION: 5,    // Generate explanation at ±5 points
  IDS_DROP_ALERT: 10,           // HIGH severity alert at -10 points
  PRI_CHANGE_EXPLANATION: 7,    // Generate explanation at ±7 points
  MATURITY_WARNING_DAYS: 90,    // MEDIUM alert when maturity < 90 days
} as const;

/**
 * Alert Severity to Delivery Mapping
 */
export const ALERT_DELIVERY = {
  ids_drop: { severity: 'high', delivery: 'immediate' },
  ids_change: { severity: 'medium', delivery: 'daily_digest' },
  pri_breach: { severity: 'high', delivery: 'immediate' },
  pri_change: { severity: 'medium', delivery: 'daily_digest' },
  risk_tier_change: { severity: 'medium', delivery: 'daily_digest' },
  maturity_warning: { severity: 'medium', delivery: 'daily_digest' },
  concentration_warning: { severity: 'low', delivery: 'weekly' },
  concentration_breach: { severity: 'high', delivery: 'immediate' },
} as const;

// ============================================
// Risk Scoring Parameters
// ============================================

/**
 * Risk Tier Boundaries
 */
export const RISK_TIERS = {
  LOW: { min: 0, max: 30 },
  MEDIUM: { min: 31, max: 55 },
  HIGH: { min: 56, max: 75 },
  CRITICAL: { min: 76, max: 100 },
} as const;

/**
 * Borrower Experience Level Scores
 */
export const BORROWER_EXPERIENCE_SCORES = {
  first_time: 20,
  novice: 50,       // 1-3 completed projects
  experienced: 75,  // 4-10 completed projects
  professional: 95, // 10+ completed projects
} as const;

/**
 * Property Condition Adjustments
 * Added to base risk score
 */
export const PROPERTY_CONDITION_ADJUSTMENTS = {
  excellent: -10,
  good: -5,
  fair: 0,
  poor: 10,
  distressed: 20,
} as const;

// ============================================
// Loan Product Constraints
// ============================================

export const LOAN_PRODUCTS = {
  fix_and_flip: {
    minTerm: 6,
    maxTerm: 12,
    description: 'Acquisition + renovation + sale',
  },
  bridge: {
    minTerm: 12,
    maxTerm: 36,
    description: 'Stabilization or value-add hold',
  },
  bridge_to_refi: {
    minTerm: 12,
    maxTerm: 24,
    description: 'Transitional with permanent takeout',
  },
} as const;

// ============================================
// Validation Constants
// ============================================

export const VALIDATION = {
  MIN_LOAN_AMOUNT: 50_000,
  MAX_LOAN_AMOUNT: 10_000_000,
  MIN_CREDIT_SCORE: 580,
  MIN_LIQUIDITY_MONTHS: 6,    // Months of payments in reserves
  MAX_LTV_HARD_CAP: 0.75,     // Absolute maximum
  MAX_LTC_HARD_CAP: 0.90,     // Absolute maximum
} as const;

// ============================================
// Audit & Compliance
// ============================================

export const COMPLIANCE = {
  SCORE_RETENTION_YEARS: 7,   // Minimum retention period
  SNAPSHOT_IMMUTABLE: true,   // Scores cannot be modified
  OVERRIDE_REQUIRES_REASON: true,
} as const;
