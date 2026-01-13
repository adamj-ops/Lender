/**
 * Investment Calculation Utilities
 *
 * Payment and return calculations for fixed-term promissory notes.
 * Based on Payment Mechanics & Investor Guide v1.0
 *
 * Calculation Method: 30/360 day basis
 */

import {
  NOTE_RATES,
  MINIMUM_INVESTMENT,
  type NoteTerm,
  type PaymentScheduleItem,
  type PaymentCalendar,
  type PaymentSummary,
} from '@/types/investment';

/**
 * Validate investment amount
 */
export function validateInvestmentAmount(amount: number): {
  valid: boolean;
  error?: string;
} {
  if (amount < MINIMUM_INVESTMENT) {
    return {
      valid: false,
      error: `Minimum investment is $${MINIMUM_INVESTMENT.toLocaleString()}`,
    };
  }
  return { valid: true };
}

/**
 * Calculate monthly payment
 *
 * Formula: Monthly Interest Payment = Principal Amount × Monthly Interest Rate
 *
 * @param principal - Investment amount
 * @param term - Note term (6 or 12 months)
 * @returns Monthly payment amount
 */
export function calculateMonthlyPayment(principal: number, term: NoteTerm): number {
  const rate = NOTE_RATES[term].monthlyRate;
  return Math.round(principal * rate * 100) / 100;
}

/**
 * Calculate total interest earned over the term
 *
 * @param principal - Investment amount
 * @param term - Note term (6 or 12 months)
 * @returns Total interest earned
 */
export function calculateTotalInterest(principal: number, term: NoteTerm): number {
  const monthlyPayment = calculateMonthlyPayment(principal, term);
  return Math.round(monthlyPayment * term * 100) / 100;
}

/**
 * Calculate total return at maturity
 *
 * @param principal - Investment amount
 * @param term - Note term (6 or 12 months)
 * @returns Principal + total interest
 */
export function calculateTotalReturn(principal: number, term: NoteTerm): number {
  return principal + calculateTotalInterest(principal, term);
}

/**
 * Get annualized return rate
 *
 * @param term - Note term (6 or 12 months)
 * @returns Annualized return as decimal (e.g., 0.10 for 10%)
 */
export function getAnnualizedReturn(term: NoteTerm): number {
  return NOTE_RATES[term].annualizedReturn;
}

/**
 * Generate payment schedule for a note
 *
 * @param principal - Investment amount
 * @param term - Note term (6 or 12 months)
 * @param effectiveDate - Date investment becomes effective (ISO string)
 * @returns Complete payment calendar with all scheduled payments
 */
export function generatePaymentSchedule(
  principal: number,
  term: NoteTerm,
  effectiveDate: string
): PaymentCalendar {
  const monthlyPayment = calculateMonthlyPayment(principal, term);
  const payments: PaymentScheduleItem[] = [];
  let cumulativeInterest = 0;

  const startDate = new Date(effectiveDate);

  for (let i = 1; i <= term; i++) {
    // Payment date is 1st of following month
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);
    paymentDate.setDate(1);

    cumulativeInterest += monthlyPayment;

    const isLastPayment = i === term;

    payments.push({
      paymentNumber: i,
      paymentDate: paymentDate.toISOString().split('T')[0],
      interestPayment: monthlyPayment,
      principalPayment: isLastPayment ? principal : 0,
      totalPayment: isLastPayment ? principal + monthlyPayment : monthlyPayment,
      cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
      type: isLastPayment ? 'final' : 'interest',
    });
  }

  const summary: PaymentSummary = {
    principalAmount: principal,
    term,
    monthlyPayment,
    totalInterest: calculateTotalInterest(principal, term),
    totalReturn: calculateTotalReturn(principal, term),
    annualizedReturn: getAnnualizedReturn(term),
  };

  return {
    noteId: '', // Set by caller
    payments,
    summary,
  };
}

/**
 * Calculate investment comparison table
 *
 * @param amounts - Array of investment amounts to compare
 * @param term - Note term (6 or 12 months)
 * @returns Comparison data for each amount
 */
export function generateComparisonTable(
  amounts: number[],
  term: NoteTerm
): Array<{
  investmentAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  returnAtMaturity: number;
  annualizedReturn: number;
}> {
  return amounts.map((amount) => ({
    investmentAmount: amount,
    monthlyPayment: calculateMonthlyPayment(amount, term),
    totalInterest: calculateTotalInterest(amount, term),
    returnAtMaturity: calculateTotalReturn(amount, term),
    annualizedReturn: getAnnualizedReturn(term),
  }));
}

/**
 * Calculate reinvestment compounding over multiple terms
 *
 * @param initialPrincipal - Starting investment amount
 * @param term - Note term (6 or 12 months)
 * @param numberOfTerms - How many terms to compound
 * @returns Projection of value over time
 */
export function calculateCompoundingProjection(
  initialPrincipal: number,
  term: NoteTerm,
  numberOfTerms: number
): Array<{
  termNumber: number;
  startingPrincipal: number;
  monthlyPayment: number;
  interestEarned: number;
  endingBalance: number;
}> {
  const projection = [];
  let currentPrincipal = initialPrincipal;

  for (let i = 1; i <= numberOfTerms; i++) {
    const monthlyPayment = calculateMonthlyPayment(currentPrincipal, term);
    const interestEarned = calculateTotalInterest(currentPrincipal, term);
    const endingBalance = calculateTotalReturn(currentPrincipal, term);

    projection.push({
      termNumber: i,
      startingPrincipal: currentPrincipal,
      monthlyPayment,
      interestEarned,
      endingBalance,
    });

    // Reinvest full amount for next term
    currentPrincipal = endingBalance;
  }

  return projection;
}

/**
 * Calculate CAGR (Compound Annual Growth Rate) for reinvestment scenario
 *
 * @param initialPrincipal - Starting investment amount
 * @param term - Note term (6 or 12 months)
 * @param years - Number of years
 * @returns CAGR as decimal
 */
export function calculateCAGR(
  initialPrincipal: number,
  term: NoteTerm,
  years: number
): number {
  const termsPerYear = 12 / term;
  const totalTerms = Math.floor(termsPerYear * years);

  if (totalTerms === 0) return 0;

  const projection = calculateCompoundingProjection(initialPrincipal, term, totalTerms);
  const finalValue = projection[projection.length - 1].endingBalance;

  // CAGR = (Final Value / Initial Value)^(1/years) - 1
  return Math.pow(finalValue / initialPrincipal, 1 / years) - 1;
}

/**
 * Calculate maturity date from effective date
 *
 * @param effectiveDate - Date investment becomes effective (ISO string)
 * @param term - Note term (6 or 12 months)
 * @returns Maturity date as ISO string
 */
export function calculateMaturityDate(effectiveDate: string, term: NoteTerm): string {
  const date = new Date(effectiveDate);
  date.setMonth(date.getMonth() + term);
  return date.toISOString().split('T')[0];
}

/**
 * Calculate first payment date from effective date
 *
 * @param effectiveDate - Date investment becomes effective (ISO string)
 * @returns First payment date (1st of following month)
 */
export function calculateFirstPaymentDate(effectiveDate: string): string {
  const date = new Date(effectiveDate);
  date.setMonth(date.getMonth() + 1);
  date.setDate(1);
  return date.toISOString().split('T')[0];
}

/**
 * Adjust payment date for weekends/holidays
 * If the 1st falls on a weekend, payment processes on preceding business day
 *
 * @param paymentDate - Original payment date (ISO string)
 * @returns Adjusted payment date (ISO string)
 */
export function adjustPaymentDateForWeekend(paymentDate: string): string {
  const date = new Date(paymentDate);
  const dayOfWeek = date.getDay();

  // If Saturday (6), move to Friday
  if (dayOfWeek === 6) {
    date.setDate(date.getDate() - 1);
  }
  // If Sunday (0), move to Friday
  else if (dayOfWeek === 0) {
    date.setDate(date.getDate() - 2);
  }

  return date.toISOString().split('T')[0];
}

/**
 * Calculate remaining payments for an active note
 *
 * @param totalPayments - Total number of payments in term
 * @param paymentsMade - Number of payments already made
 * @returns Remaining payment count
 */
export function calculateRemainingPayments(
  totalPayments: number,
  paymentsMade: number
): number {
  return Math.max(0, totalPayments - paymentsMade);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(decimal: number): string {
  return `${(decimal * 100).toFixed(2)}%`;
}
