/**
 * Investor Goals & Preferences Types
 *
 * Captures investment objectives to personalize the portal experience
 */

// ============================================
// Goal Categories
// ============================================

export type InvestmentHorizon = 'short' | 'medium' | 'long';

export type RiskTolerance = 'conservative' | 'moderate' | 'growth';

export type IncomePreference = 'maximize_monthly' | 'balanced' | 'compound_growth';

// ============================================
// Short-Term Goals (0-2 years)
// ============================================

export type ShortTermGoal =
  | 'monthly_income'        // Generate consistent monthly cash flow
  | 'capital_preservation'  // Protect principal while earning yield
  | 'liquidity_buffer'      // Maintain accessible reserves
  | 'bridge_income'         // Cover expenses during transition
  | 'test_allocation';      // Trial investment before larger commitment

export interface ShortTermGoalConfig {
  id: ShortTermGoal;
  label: string;
  description: string;
  suggestedTerm: 6 | 12;
  dashboardEmphasis: 'payments' | 'principal' | 'liquidity';
}

export const SHORT_TERM_GOALS: ShortTermGoalConfig[] = [
  {
    id: 'monthly_income',
    label: 'Monthly Income',
    description: 'I want predictable monthly payments to supplement my income',
    suggestedTerm: 12,
    dashboardEmphasis: 'payments',
  },
  {
    id: 'capital_preservation',
    label: 'Capital Preservation',
    description: 'I want to protect my principal while earning better than savings rates',
    suggestedTerm: 6,
    dashboardEmphasis: 'principal',
  },
  {
    id: 'liquidity_buffer',
    label: 'Liquidity Buffer',
    description: 'I want returns on cash I may need access to within a year',
    suggestedTerm: 6,
    dashboardEmphasis: 'liquidity',
  },
  {
    id: 'bridge_income',
    label: 'Bridge Income',
    description: 'I need income during a career transition or gap period',
    suggestedTerm: 6,
    dashboardEmphasis: 'payments',
  },
  {
    id: 'test_allocation',
    label: 'Test Allocation',
    description: 'I want to try this asset class before committing more capital',
    suggestedTerm: 6,
    dashboardEmphasis: 'principal',
  },
];

// ============================================
// Long-Term Goals (2+ years)
// ============================================

export type LongTermGoal =
  | 'retirement_income'     // Build retirement income stream
  | 'wealth_building'       // Compound returns for wealth growth
  | 'passive_income'        // Create sustainable passive income
  | 'portfolio_diversification' // Add fixed income to portfolio
  | 'generational_wealth';  // Build wealth for heirs

export interface LongTermGoalConfig {
  id: LongTermGoal;
  label: string;
  description: string;
  suggestedStrategy: 'reinvest' | 'withdraw' | 'hybrid';
  dashboardEmphasis: 'growth' | 'income' | 'allocation';
  projectionYears: number;
}

export const LONG_TERM_GOALS: LongTermGoalConfig[] = [
  {
    id: 'retirement_income',
    label: 'Retirement Income',
    description: 'Build a reliable income stream for retirement',
    suggestedStrategy: 'hybrid',
    dashboardEmphasis: 'income',
    projectionYears: 10,
  },
  {
    id: 'wealth_building',
    label: 'Wealth Building',
    description: 'Compound returns to grow my overall net worth',
    suggestedStrategy: 'reinvest',
    dashboardEmphasis: 'growth',
    projectionYears: 10,
  },
  {
    id: 'passive_income',
    label: 'Passive Income',
    description: 'Create a sustainable income stream without active management',
    suggestedStrategy: 'withdraw',
    dashboardEmphasis: 'income',
    projectionYears: 5,
  },
  {
    id: 'portfolio_diversification',
    label: 'Portfolio Diversification',
    description: 'Add fixed-income exposure to balance my investment portfolio',
    suggestedStrategy: 'hybrid',
    dashboardEmphasis: 'allocation',
    projectionYears: 5,
  },
  {
    id: 'generational_wealth',
    label: 'Generational Wealth',
    description: 'Build assets to pass on to future generations',
    suggestedStrategy: 'reinvest',
    dashboardEmphasis: 'growth',
    projectionYears: 20,
  },
];

// ============================================
// Investment Timeline
// ============================================

export type InvestmentTimeline =
  | '6_months'
  | '1_year'
  | '2_years'
  | '3_5_years'
  | '5_10_years'
  | '10_plus_years';

export interface TimelineConfig {
  id: InvestmentTimeline;
  label: string;
  months: number;
  horizon: InvestmentHorizon;
}

export const INVESTMENT_TIMELINES: TimelineConfig[] = [
  { id: '6_months', label: '6 months', months: 6, horizon: 'short' },
  { id: '1_year', label: '1 year', months: 12, horizon: 'short' },
  { id: '2_years', label: '2 years', months: 24, horizon: 'medium' },
  { id: '3_5_years', label: '3-5 years', months: 48, horizon: 'medium' },
  { id: '5_10_years', label: '5-10 years', months: 84, horizon: 'long' },
  { id: '10_plus_years', label: '10+ years', months: 120, horizon: 'long' },
];

// ============================================
// Target Allocation
// ============================================

export interface TargetAllocation {
  initialInvestment: number;
  monthlyAddition?: number;
  targetTotal?: number;
  timeline: InvestmentTimeline;
}

// ============================================
// Complete Investor Profile
// ============================================

export interface InvestorGoals {
  id: string;
  investorId: string;

  // Primary Goals
  shortTermGoals: ShortTermGoal[];
  longTermGoals: LongTermGoal[];
  primaryGoal: ShortTermGoal | LongTermGoal;

  // Investment Preferences
  incomePreference: IncomePreference;
  riskTolerance: RiskTolerance;

  // Timeline & Allocation
  investmentTimeline: InvestmentTimeline;
  targetAllocation: TargetAllocation;

  // Maturity Preferences
  defaultMaturityAction: 'reinvest' | 'withdraw' | 'ask_each_time';
  preferredTerm: 6 | 12;

  // Dashboard Preferences (derived from goals)
  dashboardConfig: DashboardConfig;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Dashboard Configuration
// ============================================

export interface DashboardConfig {
  // Primary Metrics to Emphasize
  primaryMetric: 'monthly_income' | 'total_value' | 'projected_growth' | 'ytd_earnings';
  secondaryMetrics: string[];

  // Visualization Preferences
  showProjections: boolean;
  projectionYears: number;
  showCompounding: boolean;

  // Widget Configuration
  widgets: DashboardWidget[];

  // Alert Preferences
  alertOnMaturity: boolean;
  alertDaysBeforeMaturity: number;
  alertOnPayment: boolean;
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  position: number;
  size: 'small' | 'medium' | 'large';
  visible: boolean;
}

export type WidgetType =
  | 'portfolio_summary'
  | 'monthly_income'
  | 'payment_calendar'
  | 'growth_projection'
  | 'compounding_chart'
  | 'allocation_breakdown'
  | 'maturity_timeline'
  | 'ytd_performance'
  | 'goal_progress';

// ============================================
// Goal-Based Dashboard Presets
// ============================================

export const DASHBOARD_PRESETS: Record<string, Partial<DashboardConfig>> = {
  income_focused: {
    primaryMetric: 'monthly_income',
    secondaryMetrics: ['ytd_earnings', 'next_payment'],
    showProjections: false,
    showCompounding: false,
    widgets: [
      { id: 'w1', type: 'monthly_income', position: 1, size: 'large', visible: true },
      { id: 'w2', type: 'payment_calendar', position: 2, size: 'medium', visible: true },
      { id: 'w3', type: 'portfolio_summary', position: 3, size: 'medium', visible: true },
    ],
  },
  growth_focused: {
    primaryMetric: 'projected_growth',
    secondaryMetrics: ['total_value', 'compound_effect'],
    showProjections: true,
    projectionYears: 10,
    showCompounding: true,
    widgets: [
      { id: 'w1', type: 'growth_projection', position: 1, size: 'large', visible: true },
      { id: 'w2', type: 'compounding_chart', position: 2, size: 'large', visible: true },
      { id: 'w3', type: 'portfolio_summary', position: 3, size: 'medium', visible: true },
    ],
  },
  balanced: {
    primaryMetric: 'total_value',
    secondaryMetrics: ['monthly_income', 'ytd_earnings'],
    showProjections: true,
    projectionYears: 5,
    showCompounding: true,
    widgets: [
      { id: 'w1', type: 'portfolio_summary', position: 1, size: 'large', visible: true },
      { id: 'w2', type: 'monthly_income', position: 2, size: 'medium', visible: true },
      { id: 'w3', type: 'growth_projection', position: 3, size: 'medium', visible: true },
      { id: 'w4', type: 'payment_calendar', position: 4, size: 'small', visible: true },
    ],
  },
};

// ============================================
// Utility Functions
// ============================================

export function getDashboardConfigForGoals(
  shortTermGoals: ShortTermGoal[],
  longTermGoals: LongTermGoal[],
  incomePreference: IncomePreference
): DashboardConfig {
  // Determine primary focus based on goals
  const hasIncomeGoals = shortTermGoals.includes('monthly_income') ||
                         longTermGoals.includes('passive_income') ||
                         longTermGoals.includes('retirement_income');

  const hasGrowthGoals = longTermGoals.includes('wealth_building') ||
                         longTermGoals.includes('generational_wealth');

  // Select preset based on income preference and goals
  let preset: Partial<DashboardConfig>;

  if (incomePreference === 'maximize_monthly' || hasIncomeGoals) {
    preset = DASHBOARD_PRESETS.income_focused;
  } else if (incomePreference === 'compound_growth' || hasGrowthGoals) {
    preset = DASHBOARD_PRESETS.growth_focused;
  } else {
    preset = DASHBOARD_PRESETS.balanced;
  }

  // Find projection years from long-term goals
  const projectionYears = longTermGoals.length > 0
    ? Math.max(...longTermGoals.map(g =>
        LONG_TERM_GOALS.find(lg => lg.id === g)?.projectionYears || 5
      ))
    : 5;

  return {
    primaryMetric: preset.primaryMetric || 'total_value',
    secondaryMetrics: preset.secondaryMetrics || ['monthly_income', 'ytd_earnings'],
    showProjections: preset.showProjections ?? true,
    projectionYears,
    showCompounding: preset.showCompounding ?? true,
    widgets: preset.widgets || DASHBOARD_PRESETS.balanced.widgets!,
    alertOnMaturity: true,
    alertDaysBeforeMaturity: 30,
    alertOnPayment: true,
  };
}

export function getSuggestedTerm(shortTermGoals: ShortTermGoal[]): 6 | 12 {
  // If any goal suggests 12-month term, prefer that for higher returns
  const has12MonthGoal = shortTermGoals.some(g => {
    const config = SHORT_TERM_GOALS.find(stg => stg.id === g);
    return config?.suggestedTerm === 12;
  });
  return has12MonthGoal ? 12 : 6;
}

export function getSuggestedMaturityAction(
  longTermGoals: LongTermGoal[]
): 'reinvest' | 'withdraw' | 'ask_each_time' {
  if (longTermGoals.length === 0) return 'ask_each_time';

  const strategies = longTermGoals.map(g =>
    LONG_TERM_GOALS.find(lg => lg.id === g)?.suggestedStrategy
  );

  if (strategies.every(s => s === 'reinvest')) return 'reinvest';
  if (strategies.every(s => s === 'withdraw')) return 'withdraw';
  return 'ask_each_time';
}
