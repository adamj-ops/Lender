/**
 * Investment Module
 *
 * Exports all investment calculation utilities
 */

export {
  validateInvestmentAmount,
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateTotalReturn,
  getAnnualizedReturn,
  generatePaymentSchedule,
  generateComparisonTable,
  calculateCompoundingProjection,
  calculateCAGR,
  calculateMaturityDate,
  calculateFirstPaymentDate,
  adjustPaymentDateForWeekend,
  calculateRemainingPayments,
  formatCurrency,
  formatPercentage,
} from './calculations';
