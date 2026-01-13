/**
 * Everyday Lending - Core Type Definitions
 *
 * This file contains the canonical type definitions for the
 * investor-first private credit intelligence platform.
 */

// ============================================
// Loan Types
// ============================================

export type LoanType = 'fix_and_flip' | 'bridge' | 'bridge_to_refi';

export type CollateralType =
  | 'sfr'           // Single Family Residential
  | 'duplex'        // 2 units
  | 'triplex'       // 3 units
  | 'quad'          // 4 units
  | 'small_multi';  // 5-20 units

export type LoanStatus =
  | 'application'
  | 'underwriting'
  | 'approved'
  | 'funded'
  | 'active'
  | 'matured'
  | 'paid_off'
  | 'default';

export type RiskTier = 'low' | 'medium' | 'high' | 'critical';

export interface Loan {
  id: string;
  loanNumber: string;

  // Loan Terms
  loanType: LoanType;
  principalAmount: number;
  interestRate: number;       // Annual rate as decimal (e.g., 0.12 for 12%)
  termMonths: number;
  originationDate: string;    // ISO date
  maturityDate: string;       // ISO date

  // Collateral
  collateral: CollateralInfo;

  // Borrower
  borrowerId: string;
  borrower: BorrowerInfo;

  // Calculated Metrics
  ltv: number;                // Loan-to-Value ratio
  ltc: number;                // Loan-to-Cost ratio
  dscr?: number;              // Debt Service Coverage Ratio (for income-producing)
  debtYield?: number;

  // Scoring
  riskScore: number;
  riskTier: RiskTier;
  ids: number;                // Investor Deal Score

  // Status
  status: LoanStatus;

  // Audit
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// ============================================
// Collateral Types
// ============================================

export interface CollateralInfo {
  propertyId: string;
  address: PropertyAddress;
  collateralType: CollateralType;
  unitCount: number;

  // Valuation
  purchasePrice: number;
  asIsValue: number;
  arvValue: number;           // After Repair Value
  rehabBudget: number;

  // Property Details
  squareFootage: number;
  yearBuilt: number;
  condition: PropertyCondition;

  // Market
  market: string;             // MSA or market identifier
  submarket?: string;
}

export interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  county?: string;
}

export type PropertyCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'distressed';

// ============================================
// Borrower Types
// ============================================

export interface BorrowerInfo {
  id: string;
  entityName?: string;
  contactName: string;

  // Credit Profile
  creditScore?: number;
  experienceLevel: ExperienceLevel;
  completedProjects: number;

  // Track Record
  defaultHistory: boolean;
  avgProjectReturn?: number;

  // Liquidity
  verifiedLiquidity: number;
  liquidityAsOfDate: string;
}

export type ExperienceLevel = 'first_time' | 'novice' | 'experienced' | 'professional';

// ============================================
// Investor Deal Score (IDS) Types
// ============================================

/**
 * IDS answers: "How attractive is this deal relative to other uses of my capital?"
 * Score Range: 0-100
 */
export interface IDSScore {
  id: string;
  loanId: string;

  // Final Score
  score: number;              // 0-100

  // Component Scores (each 0-100)
  components: IDSComponents;

  // Metadata
  calculatedAt: string;
  version: string;
  triggeredBy: string;        // Event that triggered calculation

  // Snapshot for audit (immutable)
  inputSnapshot: IDSInputSnapshot;
}

export interface IDSComponents {
  netYieldScore: number;      // 30% weight
  protectionScore: number;    // 25% weight (downside protection)
  riskQualityScore: number;   // 20% weight
  durationScore: number;      // 15% weight
  confidenceScore: number;    // 10% weight
}

export interface IDSInputSnapshot {
  interestRate: number;
  servicingCost: number;
  lossReserve: number;
  ltv: number;
  ltc: number;
  riskScore: number;
  termMonths: number;
  hasContractedExit: boolean;
  hasRefinanceDependency: boolean;
  dataConfidence: number;
  arvConfidence: number;
  borrowerHistoryScore: number;
}

// ============================================
// Portfolio Risk Index (PRI) Types
// ============================================

/**
 * PRI answers: "How risky is my portfolio as a system, not as individual loans?"
 * Score Range: 0-100 (higher = riskier)
 */
export interface PRIScore {
  id: string;
  portfolioId: string;
  investorId: string;

  // Final Score
  score: number;              // 0-100 (higher = riskier)
  priBand: PRIBand;

  // Component Scores
  components: PRIComponents;

  // Concentration Details
  concentrations: ConcentrationBreakdown;

  // Metadata
  calculatedAt: string;
  version: string;
  triggeredBy: string;

  // Snapshot for audit
  portfolioSnapshot: PortfolioSnapshot;
}

export interface PRIComponents {
  weightedAverageRisk: number;  // 30% weight
  concentrationRisk: number;    // 25% weight
  durationMismatch: number;     // 15% weight
  correlationRisk: number;      // 15% weight
  liquidityStress: number;      // 15% weight
}

export type PRIBand = 'conservative' | 'moderate' | 'elevated' | 'high' | 'critical';

export interface ConcentrationBreakdown {
  byMarket: ConcentrationItem[];
  byBorrower: ConcentrationItem[];
  byAssetType: ConcentrationItem[];
  byLoanType: ConcentrationItem[];
}

export interface ConcentrationItem {
  key: string;
  label: string;
  exposure: number;           // Dollar amount
  percentage: number;         // Portfolio percentage
  threshold: number;          // Max allowed percentage
  breached: boolean;
}

export interface PortfolioSnapshot {
  totalExposure: number;
  loanCount: number;
  avgLoanSize: number;
  avgRiskScore: number;
  avgTermMonths: number;
  avgCapitalCommitment: number;
}

// ============================================
// AI Intelligence Types
// ============================================

export type AITaskType = 'deal_explanation' | 'portfolio_insight' | 'comparison';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

/**
 * AI Explanation Output Structure
 * All AI outputs must follow this format
 */
export interface AIExplanation {
  id: string;
  taskType: AITaskType;
  entityId: string;           // Loan ID or Portfolio ID
  entityType: 'loan' | 'portfolio';

  // Required output structure
  whatChanged: string;        // Factual description of metric movement
  whyItMatters: string;       // Explanation of what drove the change
  considerations: string[];   // Neutral framing (NO recommendations)
  confidence: ConfidenceLevel;

  // Supporting data
  metricDeltas: MetricDelta[];
  drivers: string[];          // Deterministic reasons

  // Metadata
  generatedAt: string;
  promptVersion: string;
}

export interface MetricDelta {
  metric: string;
  previousValue: number;
  currentValue: number;
  change: number;
  changePercent: number;
}

/**
 * AI Prompt Packet - Structured input to AI
 * AI receives ONLY structured packets, never raw user input
 */
export interface AIPromptPacket {
  taskType: AITaskType;
  metrics: {
    current: ScoreSnapshot;
    previous: ScoreSnapshot;
  };
  deltas: MetricDelta[];
  drivers: string[];
  confidenceInputs: ConfidenceInputs;
}

export interface ScoreSnapshot {
  score: number;
  components: Record<string, number>;
  calculatedAt: string;
}

export interface ConfidenceInputs {
  dataCompleteness: number;
  dataRecency: number;
  sourceReliability: number;
}

// ============================================
// Alert Types
// ============================================

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertDelivery = 'immediate' | 'daily_digest' | 'weekly';

export interface Alert {
  id: string;
  investorId: string;

  // Alert Details
  type: AlertType;
  severity: AlertSeverity;
  delivery: AlertDelivery;

  // Content
  title: string;
  summary: string;
  explanation?: AIExplanation;

  // References
  entityId: string;
  entityType: 'loan' | 'portfolio';

  // Status
  acknowledged: boolean;
  acknowledgedAt?: string;
  acknowledgedBy?: string;

  // Metadata
  createdAt: string;
  sentAt?: string;
}

export type AlertType =
  | 'ids_drop'                // IDS drop ≥ 10 points
  | 'ids_change'              // IDS change ≥ 5 points
  | 'pri_breach'              // PRI band breach
  | 'pri_change'              // PRI change ≥ 7 points
  | 'risk_tier_change'        // Risk tier downgrade
  | 'maturity_warning'        // Maturity < 90 days
  | 'concentration_warning'   // 80% of concentration limit
  | 'concentration_breach';   // Concentration threshold breached

// ============================================
// Event Types (EventBus)
// ============================================

export type DomainEvent =
  | UnderwritingEvent
  | ScoringEvent
  | IntelligenceEvent
  | AlertEvent;

// Underwriting Domain Events
export interface UnderwritingEvent {
  type: 'underwriting.loan.recomputed';
  payload: {
    loanId: string;
    metrics: {
      ltv: number;
      ltc: number;
      dscr?: number;
      debtYield?: number;
    };
  };
  metadata: EventMetadata;
}

// Scoring Domain Events
export interface ScoringEvent {
  type:
    | 'scoring.loan.risk_updated'
    | 'scoring.loan.ids_updated'
    | 'scoring.portfolio.pri_updated'
    | 'scoring.portfolio.pri_breached';
  payload: {
    entityId: string;
    entityType: 'loan' | 'portfolio';
    previousScore?: number;
    currentScore: number;
    delta?: number;
  };
  metadata: EventMetadata;
}

// Intelligence Domain Events
export interface IntelligenceEvent {
  type:
    | 'intel.deal.explanation_generated'
    | 'intel.portfolio.insight_generated';
  payload: {
    explanationId: string;
    entityId: string;
    entityType: 'loan' | 'portfolio';
  };
  metadata: EventMetadata;
}

// Alert Domain Events
export interface AlertEvent {
  type: 'alert.investor.notification_sent';
  payload: {
    alertId: string;
    investorId: string;
    severity: AlertSeverity;
    delivery: AlertDelivery;
  };
  metadata: EventMetadata;
}

export interface EventMetadata {
  eventId: string;
  timestamp: string;
  version: string;
  triggeredBy: string;
  correlationId?: string;
}

// ============================================
// Audit Types
// ============================================

export interface AuditEntry {
  id: string;
  entityId: string;
  entityType: string;
  action: AuditAction;

  // Change Details
  previousValue?: unknown;
  newValue?: unknown;

  // User Context
  userId: string;
  userRole: string;

  // Metadata
  timestamp: string;
  ipAddress?: string;
  reason?: string;            // Required for overrides
}

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'score_calculated'
  | 'override_applied'
  | 'alert_sent'
  | 'alert_acknowledged';

// ============================================
// User Types
// ============================================

export type UserRole =
  | 'investor'
  | 'gp_manager'
  | 'lending_ops'
  | 'underwriter'
  | 'admin'
  | 'auditor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;

  // For investors
  investorProfileId?: string;

  // Permissions
  permissions: string[];

  // Metadata
  createdAt: string;
  lastLoginAt?: string;
}
