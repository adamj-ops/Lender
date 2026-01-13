/**
 * Everyday Lending - Investment & Note Types
 *
 * Type definitions for investor notes, payment structures,
 * and the fixed-income private credit program.
 */

// ============================================
// Investment Note Types
// ============================================

export type NoteTerm = 6 | 12; // months

export type NoteStatus =
  | 'pending'       // Documents submitted, awaiting funding
  | 'funded'        // Investment received
  | 'active'        // Generating payments
  | 'maturing'      // Within 30 days of maturity
  | 'matured'       // Term complete
  | 'reinvested'    // Rolled into new note
  | 'withdrawn';    // Principal returned

/**
 * Investment Note
 * Fixed-term promissory note secured by real estate
 */
export interface InvestmentNote {
  id: string;
  noteNumber: string;
  investorId: string;

  // Investment Terms
  principalAmount: number;       // Minimum $100,000
  term: NoteTerm;
  monthlyRate: number;           // 0.007 (6mo) or 0.008333 (12mo)
  annualizedReturn: number;      // 0.084 (8.4%) or 0.10 (10%)

  // Dates
  fundedDate: string;            // ISO date - when investment received
  effectiveDate: string;         // ISO date - when interest starts
  maturityDate: string;          // ISO date
  firstPaymentDate: string;      // ISO date

  // Calculated Values
  monthlyPayment: number;        // Principal × Monthly Rate
  totalInterest: number;         // Monthly Payment × Term
  totalReturn: number;           // Principal + Total Interest

  // Status
  status: NoteStatus;

  // Banking
  bankingInfo: BankingInfo;

  // Documents
  documents: NoteDocument[];

  // Audit
  createdAt: string;
  updatedAt: string;
}

/**
 * Note Rate Configuration
 * Authoritative rates from Investment Guide
 */
export const NOTE_RATES = {
  6: {
    monthlyRate: 0.007,          // 0.70%
    annualizedReturn: 0.084,     // 8.40%
    totalReturnMultiplier: 0.042 // 4.20% over term
  },
  12: {
    monthlyRate: 0.008333,       // 0.8333%
    annualizedReturn: 0.10,      // 10.00%
    totalReturnMultiplier: 0.10  // 10.00% over term
  }
} as const;

export const MINIMUM_INVESTMENT = 100_000; // $100,000

// ============================================
// Payment Types
// ============================================

export type PaymentStatus =
  | 'scheduled'     // Not yet due
  | 'processing'    // ACH initiated
  | 'completed'     // Funds settled
  | 'failed'        // ACH failed
  | 'cancelled';    // Cancelled before processing

export type PaymentType =
  | 'interest'      // Monthly interest payment
  | 'principal'     // Principal return at maturity
  | 'final';        // Principal + final interest

/**
 * Scheduled Payment
 * Individual payment in the payment calendar
 */
export interface Payment {
  id: string;
  noteId: string;
  investorId: string;

  // Payment Details
  paymentNumber: number;         // 1, 2, 3... through term
  paymentType: PaymentType;
  scheduledDate: string;         // ISO date - 1st of month
  processedDate?: string;        // ISO date
  settledDate?: string;          // ISO date

  // Amounts
  interestAmount: number;
  principalAmount: number;       // 0 except for final payment
  totalAmount: number;

  // Cumulative
  cumulativeInterest: number;

  // Status
  status: PaymentStatus;

  // ACH Details
  achReference?: string;
  achStatus?: ACHStatus;

  // Audit
  createdAt: string;
  updatedAt: string;
}

export type ACHStatus =
  | 'pending'
  | 'submitted'
  | 'processing'
  | 'settled'
  | 'returned'
  | 'failed';

// ============================================
// Banking Types
// ============================================

export interface BankingInfo {
  id: string;
  investorId: string;

  // Bank Details
  bankName: string;
  bankAddress?: string;
  routingNumber: string;         // 9 digits
  accountNumber: string;
  accountType: 'checking' | 'savings';
  accountHolderName: string;

  // Verification
  verified: boolean;
  verifiedAt?: string;
  testDepositSent?: boolean;
  testDepositConfirmed?: boolean;

  // Status
  isActive: boolean;

  // Audit
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Document Types
// ============================================

export type DocumentType =
  | 'promissory_note'
  | 'ach_authorization'
  | 'w9'
  | 'subscription_agreement'
  | 'statement'
  | '1099_int';

export interface NoteDocument {
  id: string;
  noteId: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  signedAt?: string;
  signedBy?: string;
  createdAt: string;
}

// ============================================
// Investor Types
// ============================================

export interface Investor {
  id: string;
  userId: string;

  // Contact
  legalName: string;
  entityName?: string;           // If investing through entity
  email: string;
  phone?: string;

  // Address
  address: InvestorAddress;

  // Tax
  taxId: string;                 // SSN or EIN (encrypted)
  taxIdType: 'ssn' | 'ein';

  // Accreditation
  isAccredited: boolean;
  accreditationVerifiedAt?: string;
  accreditationMethod?: AccreditationMethod;

  // Portfolio Summary
  totalInvested: number;
  totalActiveNotes: number;
  totalInterestEarned: number;
  totalInterestYTD: number;

  // Status
  status: 'pending' | 'active' | 'suspended';

  // Audit
  createdAt: string;
  updatedAt: string;
}

export interface InvestorAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type AccreditationMethod =
  | 'income'
  | 'net_worth'
  | 'professional_certification'
  | 'entity_assets'
  | 'third_party_verification';

// ============================================
// Maturity & Reinvestment Types
// ============================================

export type MaturityOption =
  | 'full_withdrawal'        // Return principal + final interest
  | 'principal_reinvest'     // Reinvest principal, withdraw interest
  | 'total_reinvest'         // Reinvest principal + all interest
  | 'partial_withdrawal';    // Withdraw portion, reinvest rest

export interface MaturityInstruction {
  id: string;
  noteId: string;
  investorId: string;

  // Instruction
  option: MaturityOption;
  withdrawalAmount?: number;     // For partial withdrawal
  newTerm?: NoteTerm;            // For reinvestment

  // Status
  instructionDate: string;       // When investor provided instruction
  processedDate?: string;
  status: 'pending' | 'processed';

  // New Note (if reinvesting)
  newNoteId?: string;

  // Audit
  createdAt: string;
}

// ============================================
// Payment Calendar Types
// ============================================

/**
 * Generate payment calendar for a note
 */
export interface PaymentCalendar {
  noteId: string;
  payments: PaymentScheduleItem[];
  summary: PaymentSummary;
}

export interface PaymentScheduleItem {
  paymentNumber: number;
  paymentDate: string;           // ISO date
  interestPayment: number;
  principalPayment: number;      // 0 except final
  totalPayment: number;
  cumulativeInterest: number;
  type: PaymentType;
}

export interface PaymentSummary {
  principalAmount: number;
  term: NoteTerm;
  monthlyPayment: number;
  totalInterest: number;
  totalReturn: number;
  annualizedReturn: number;
}

// ============================================
// Statement Types
// ============================================

export interface MonthlyStatement {
  id: string;
  noteId: string;
  investorId: string;

  // Period
  statementDate: string;
  periodStart: string;
  periodEnd: string;

  // Current Month
  paymentAmount: number;

  // Year-to-Date
  interestYTD: number;
  paymentsYTD: number;

  // Balance
  principalBalance: number;
  maturityDate: string;
  remainingTerm: number;         // months

  // Payment History
  recentPayments: PaymentHistoryItem[];

  // Document
  documentUrl: string;

  createdAt: string;
}

export interface PaymentHistoryItem {
  date: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
}

// ============================================
// Tax Reporting Types
// ============================================

export interface Form1099INT {
  id: string;
  investorId: string;
  taxYear: number;

  // Amounts
  interestIncome: number;        // Box 1
  earlyWithdrawalPenalty?: number; // Box 2

  // Payer Info
  payerName: string;
  payerTIN: string;
  payerAddress: string;

  // Recipient Info
  recipientName: string;
  recipientTIN: string;          // Masked for display
  recipientAddress: string;

  // Status
  generatedAt: string;
  mailedAt?: string;
  downloadedAt?: string;

  // Document
  documentUrl: string;
}

// ============================================
// Utility Functions (Type Guards)
// ============================================

export function isMaturityPayment(payment: Payment): boolean {
  return payment.paymentType === 'final' || payment.paymentType === 'principal';
}

export function calculateMonthlyPayment(principal: number, term: NoteTerm): number {
  return principal * NOTE_RATES[term].monthlyRate;
}

export function calculateTotalInterest(principal: number, term: NoteTerm): number {
  return calculateMonthlyPayment(principal, term) * term;
}

export function calculateTotalReturn(principal: number, term: NoteTerm): number {
  return principal + calculateTotalInterest(principal, term);
}
