/**
 * Onboarding Flow Diagram
 *
 * Visual representation of the investor onboarding journey
 */

'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StepProps {
  number: number;
  title: string;
  description: string;
  details: string[];
  duration?: string;
  status?: 'complete' | 'current' | 'upcoming';
}

function Step({ number, title, description, details, duration, status = 'upcoming' }: StepProps) {
  const statusStyles = {
    complete: 'border-primary/50 bg-primary/5',
    current: 'border-primary bg-card ring-2 ring-primary/20',
    upcoming: 'border-border bg-card',
  };

  const numberStyles = {
    complete: 'bg-primary text-primary-foreground',
    current: 'bg-primary text-primary-foreground animate-pulse',
    upcoming: 'bg-muted text-muted-foreground',
  };

  return (
    <Card className={`relative p-5 ${statusStyles[status]}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${numberStyles[status]}`}
        >
          {status === 'complete' ? '✓' : number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{title}</h3>
            {duration && (
              <Badge variant="secondary" className="text-xs">
                {duration}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <ul className="mt-3 space-y-1.5">
            {details.map((detail, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

function Connector() {
  return (
    <div className="flex justify-center py-2">
      <div className="w-px h-8 bg-border relative">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r border-border bg-background" />
      </div>
    </div>
  );
}

export function OnboardingFlowDiagram() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-2">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold">Investor Onboarding Journey</h2>
        <p className="text-muted-foreground">Complete these steps to start investing</p>
      </div>

      <Step
        number={1}
        title="Create Account"
        description="Register and verify your email address"
        details={[
          'Email & password registration',
          'Email verification link',
          'Basic profile information',
        ]}
        duration="2 min"
        status="complete"
      />

      <Connector />

      <Step
        number={2}
        title="Accreditation Verification"
        description="Confirm accredited investor status"
        details={[
          'Select qualification method (income, net worth, professional)',
          'Upload supporting documentation',
          'Third-party verification (optional expedited)',
        ]}
        duration="5 min"
        status="current"
      />

      <Connector />

      <Step
        number={3}
        title="Identity Verification (KYC)"
        description="Verify your identity for compliance"
        details={[
          'Government-issued ID upload',
          'Address verification',
          'SSN/Tax ID collection (encrypted)',
          'OFAC/AML screening (automated)',
        ]}
        duration="3 min"
        status="upcoming"
      />

      <Connector />

      <Step
        number={4}
        title="Banking Setup"
        description="Connect your bank account for payments"
        details={[
          'Link bank via Plaid (instant) or manual entry',
          'Micro-deposit verification (if manual)',
          'ACH authorization agreement',
        ]}
        duration="2 min"
        status="upcoming"
      />

      <Connector />

      <Step
        number={5}
        title="Investment Documents"
        description="Review and sign required agreements"
        details={[
          'Subscription Agreement review',
          'W-9 tax form',
          'ACH Authorization',
          'Electronic signature via DocuSign',
        ]}
        duration="5 min"
        status="upcoming"
      />

      <Connector />

      <Step
        number={6}
        title="Fund Your Account"
        description="Make your first investment"
        details={[
          'Select note term (6 or 12 months)',
          'Enter investment amount ($100K minimum)',
          'Wire or ACH transfer instructions',
          'Investment confirmation',
        ]}
        duration="Varies"
        status="upcoming"
      />

      {/* Summary Card */}
      <Card className="mt-8 p-5 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Total Estimated Time</h3>
            <p className="text-sm text-muted-foreground">
              Complete onboarding in under 20 minutes
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">~17 min</div>
            <div className="text-xs text-muted-foreground">excluding funding</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OnboardingFlowDiagram;
