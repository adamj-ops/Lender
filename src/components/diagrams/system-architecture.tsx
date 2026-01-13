/**
 * System Architecture Diagram
 *
 * Visual representation of the Everyday Lending platform architecture
 */

'use client';

import { Card } from '@/components/ui/card';

interface FlowNodeProps {
  title: string;
  subtitle?: string;
  items?: string[];
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  className?: string;
}

function FlowNode({ title, subtitle, items, variant = 'secondary', className = '' }: FlowNodeProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground border-primary',
    secondary: 'bg-card border-border',
    accent: 'bg-accent border-accent-foreground/20',
    muted: 'bg-muted/50 border-border',
  };

  return (
    <div className={`rounded-lg border p-4 ${variants[variant]} ${className}`}>
      <div className="font-semibold text-sm">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
      {items && items.length > 0 && (
        <ul className="mt-2 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-current opacity-50" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Arrow({ direction = 'down' }: { direction?: 'down' | 'right' | 'bidirectional' }) {
  if (direction === 'right') {
    return (
      <div className="flex items-center justify-center px-2">
        <svg width="24" height="12" viewBox="0 0 24 12" className="text-muted-foreground">
          <path d="M0 6h20M16 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    );
  }
  if (direction === 'bidirectional') {
    return (
      <div className="flex items-center justify-center px-2">
        <svg width="24" height="12" viewBox="0 0 24 12" className="text-muted-foreground">
          <path d="M4 6h16M4 2l-4 4 4 4M20 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-2">
      <svg width="12" height="24" viewBox="0 0 12 24" className="text-muted-foreground">
        <path d="M6 0v20M2 16l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

export function SystemArchitectureDiagram() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Everyday Lending Platform Architecture</h2>
        <p className="text-muted-foreground">Investor-first private credit intelligence system</p>
      </div>

      {/* User Layer */}
      <Card className="p-6">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Presentation Layer
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FlowNode
            title="Investor Portal"
            subtitle="Primary interface"
            items={['Dashboard', 'Deal Intelligence', 'Portfolio View', 'Documents']}
            variant="primary"
          />
          <FlowNode
            title="Onboarding Flow"
            subtitle="Account setup"
            items={['Registration', 'Accreditation', 'KYC/AML', 'Banking Setup']}
            variant="accent"
          />
          <FlowNode
            title="Ops Console"
            subtitle="Internal tools"
            items={['Loan Entry', 'Underwriting', 'Document Mgmt']}
            variant="muted"
          />
        </div>
      </Card>

      <Arrow />

      {/* API Layer */}
      <Card className="p-6">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          API Gateway & Authentication
        </div>
        <div className="grid grid-cols-4 gap-4">
          <FlowNode title="Auth Service" items={['JWT Tokens', 'Role-Based Access', 'MFA']} />
          <FlowNode title="API Routes" items={['REST Endpoints', 'Rate Limiting', 'Validation']} />
          <FlowNode title="Event Bus" items={['Domain Events', 'Async Processing', 'Webhooks']} />
          <FlowNode title="Notification Service" items={['Email', 'In-App Alerts', 'Push']} />
        </div>
      </Card>

      <Arrow />

      {/* Domain Layer */}
      <Card className="p-6">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Domain Services (Bounded Contexts)
        </div>
        <div className="grid grid-cols-6 gap-3">
          <FlowNode
            title="Origination"
            items={['Loan Intake', 'Documents', 'Borrower Data']}
            className="text-center"
          />
          <FlowNode
            title="Underwriting"
            items={['LTV/LTC Calc', 'DSCR', 'Debt Yield']}
            className="text-center"
          />
          <FlowNode
            title="Scoring"
            items={['Risk Score', 'IDS', 'PRI']}
            variant="accent"
            className="text-center"
          />
          <FlowNode
            title="Intelligence"
            items={['AI Explainer', 'Comparisons', 'Insights']}
            variant="accent"
            className="text-center"
          />
          <FlowNode
            title="Portfolio"
            items={['Aggregation', 'Concentration', 'Analytics']}
            className="text-center"
          />
          <FlowNode
            title="Compliance"
            items={['Audit Logs', 'Snapshots', 'Overrides']}
            className="text-center"
          />
        </div>
      </Card>

      <Arrow />

      {/* Data Layer */}
      <Card className="p-6">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Data & Integration Layer
        </div>
        <div className="grid grid-cols-4 gap-4">
          <FlowNode
            title="PostgreSQL"
            subtitle="Primary database"
            items={['Loans', 'Investors', 'Scores', 'Audit Trail']}
          />
          <FlowNode
            title="Document Storage"
            subtitle="S3/Blob storage"
            items={['Loan Docs', 'Statements', 'Signed Agreements']}
          />
          <FlowNode
            title="AI/ML Services"
            subtitle="Explanation engine"
            items={['Claude API', 'Structured Prompts', 'Schema Validation']}
          />
          <FlowNode
            title="Payment Rails"
            subtitle="ACH processing"
            items={['Plaid', 'Dwolla/Modern Treasury', 'Bank Verification']}
          />
        </div>
      </Card>

      {/* Event Flow Legend */}
      <Card className="p-4 bg-muted/30">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Key Event Flows
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <div className="font-medium">Deal Scoring Flow</div>
            <div className="text-xs text-muted-foreground font-mono">
              Loan Updated → UnderwritingCalc → RiskScoring → InvestorScoring → RuleEvaluator → AIExplainer → Notification
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Portfolio Update Flow</div>
            <div className="text-xs text-muted-foreground font-mono">
              Portfolio Changed → PRI Recalc → Band Check → Concentration Alert → Investor Notification
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SystemArchitectureDiagram;
