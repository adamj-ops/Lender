/**
 * Portfolio Overview Component
 *
 * Main dashboard view showing investor's portfolio summary
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/lib/investment';

interface PortfolioData {
  totalInvested: number;
  totalInterestEarned: number;
  interestYTD: number;
  activeNotes: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  portfolioReturn: number;
}

// Mock data - replace with real data
const mockPortfolio: PortfolioData = {
  totalInvested: 500000,
  totalInterestEarned: 42500,
  interestYTD: 12500,
  activeNotes: 3,
  nextPaymentDate: '2026-02-01',
  nextPaymentAmount: 4166.67,
  portfolioReturn: 0.094,
};

const mockNotes = [
  {
    id: '1',
    noteNumber: 'EL-2025-001',
    principal: 200000,
    term: 12,
    rate: 0.10,
    monthlyPayment: 1666.67,
    startDate: '2025-07-01',
    maturityDate: '2026-07-01',
    status: 'active',
    paymentsCompleted: 6,
    totalPayments: 12,
  },
  {
    id: '2',
    noteNumber: 'EL-2025-002',
    principal: 150000,
    term: 6,
    rate: 0.084,
    monthlyPayment: 1050.00,
    startDate: '2025-10-01',
    maturityDate: '2026-04-01',
    status: 'active',
    paymentsCompleted: 3,
    totalPayments: 6,
  },
  {
    id: '3',
    noteNumber: 'EL-2025-003',
    principal: 150000,
    term: 12,
    rate: 0.10,
    monthlyPayment: 1250.00,
    startDate: '2025-11-01',
    maturityDate: '2026-11-01',
    status: 'active',
    paymentsCompleted: 2,
    totalPayments: 12,
  },
];

const mockPayments = [
  { date: '2026-01-01', amount: 3966.67, status: 'completed' },
  { date: '2025-12-01', amount: 3966.67, status: 'completed' },
  { date: '2025-11-01', amount: 2916.67, status: 'completed' },
];

export function PortfolioOverview() {
  const portfolio = mockPortfolio;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back. Here&apos;s your portfolio overview.</p>
        </div>
        <Button>New Investment</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invested"
          value={formatCurrency(portfolio.totalInvested)}
          subtitle={`${portfolio.activeNotes} active notes`}
        />
        <StatCard
          title="Total Interest Earned"
          value={formatCurrency(portfolio.totalInterestEarned)}
          subtitle="Since inception"
          trend="+8.5%"
          trendUp
        />
        <StatCard
          title="Interest YTD"
          value={formatCurrency(portfolio.interestYTD)}
          subtitle="Year to date 2026"
        />
        <StatCard
          title="Next Payment"
          value={formatCurrency(portfolio.nextPaymentAmount)}
          subtitle={formatDate(portfolio.nextPaymentDate)}
          highlight
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Notes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Notes</CardTitle>
            <CardDescription>Your current investment positions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Last 3 payments received</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPayments.map((payment, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium">{formatDate(payment.date)}</div>
                  <div className="text-xs text-muted-foreground">Interest payment</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(payment.amount)}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm">
              View all payments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Return Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Annualized Portfolio Return</div>
              <div className="text-3xl font-bold">{formatPercentage(portfolio.portfolioReturn)}</div>
            </div>
            <div className="text-sm text-muted-foreground max-w-md">
              Your blended return across all active notes. Returns are calculated based on note terms
              and payment schedules.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  trendUp?: boolean;
  highlight?: boolean;
}

function StatCard({ title, value, subtitle, trend, trendUp, highlight }: StatCardProps) {
  return (
    <Card className={highlight ? 'border-primary/50 bg-primary/5' : ''}>
      <CardContent className="pt-6">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold">{value}</span>
          {trend && (
            <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>
          )}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
      </CardContent>
    </Card>
  );
}

interface Note {
  id: string;
  noteNumber: string;
  principal: number;
  term: number;
  rate: number;
  monthlyPayment: number;
  startDate: string;
  maturityDate: string;
  status: string;
  paymentsCompleted: number;
  totalPayments: number;
}

function NoteCard({ note }: { note: Note }) {
  const progressPercent = (note.paymentsCompleted / note.totalPayments) * 100;

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{note.noteNumber}</div>
          <div className="text-sm text-muted-foreground">
            {note.term}-month note at {formatPercentage(note.rate)}
          </div>
        </div>
        <Badge variant={note.status === 'active' ? 'default' : 'secondary'}>{note.status}</Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground">Principal</div>
          <div className="font-medium">{formatCurrency(note.principal)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Monthly</div>
          <div className="font-medium">{formatCurrency(note.monthlyPayment)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Maturity</div>
          <div className="font-medium">{formatDate(note.maturityDate)}</div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>
            {note.paymentsCompleted} of {note.totalPayments} payments
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default PortfolioOverview;
