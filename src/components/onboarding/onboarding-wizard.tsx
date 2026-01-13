/**
 * Onboarding Wizard
 *
 * Multi-step onboarding flow for new investors
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  SHORT_TERM_GOALS,
  LONG_TERM_GOALS,
  INVESTMENT_TIMELINES,
  type ShortTermGoal,
  type LongTermGoal,
  type IncomePreference,
  type InvestmentTimeline,
} from '@/types/goals';

type OnboardingStep =
  | 'welcome'
  | 'accreditation'
  | 'identity'
  | 'banking'
  | 'documents'
  | 'goals'
  | 'complete';

const STEPS: { id: OnboardingStep; title: string; description: string }[] = [
  { id: 'welcome', title: 'Welcome', description: 'Get started' },
  { id: 'accreditation', title: 'Accreditation', description: 'Verify status' },
  { id: 'identity', title: 'Identity', description: 'KYC verification' },
  { id: 'banking', title: 'Banking', description: 'Connect account' },
  { id: 'documents', title: 'Documents', description: 'Sign agreements' },
  { id: 'goals', title: 'Goals', description: 'Your objectives' },
  { id: 'complete', title: 'Complete', description: 'Start investing' },
];

export interface InvestorGoalsData {
  shortTermGoals: ShortTermGoal[];
  longTermGoals: LongTermGoal[];
  incomePreference: IncomePreference;
  timeline: InvestmentTimeline;
  initialInvestment: number;
}

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [goalsData, setGoalsData] = useState<InvestorGoalsData>({
    shortTermGoals: [],
    longTermGoals: [],
    incomePreference: 'balanced',
    timeline: '1_year',
    initialInvestment: 100000,
  });

  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);
  const progress = ((currentIndex + 1) / STEPS.length) * 100;

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const goBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EL</span>
            </div>
            <span className="font-semibold">Everyday Lending</span>
          </div>
          <Badge variant="secondary">Step {currentIndex + 1} of {STEPS.length}</Badge>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 ${
                  i <= currentIndex ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    i < currentIndex
                      ? 'bg-primary text-primary-foreground'
                      : i === currentIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i < currentIndex ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-8">
        <div className="max-w-2xl mx-auto px-4">
          {currentStep === 'welcome' && <WelcomeStep onNext={goNext} />}
          {currentStep === 'accreditation' && <AccreditationStep onNext={goNext} onBack={goBack} />}
          {currentStep === 'identity' && <IdentityStep onNext={goNext} onBack={goBack} />}
          {currentStep === 'banking' && <BankingStep onNext={goNext} onBack={goBack} />}
          {currentStep === 'documents' && <DocumentsStep onNext={goNext} onBack={goBack} />}
          {currentStep === 'goals' && (
            <GoalsStep
              onNext={goNext}
              onBack={goBack}
              goalsData={goalsData}
              setGoalsData={setGoalsData}
            />
          )}
          {currentStep === 'complete' && <CompleteStep goalsData={goalsData} />}
        </div>
      </main>
    </div>
  );
}

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

function WelcomeStep({ onNext }: StepProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <CardTitle className="text-2xl">Welcome to Everyday Lending</CardTitle>
        <CardDescription className="text-base">
          You&apos;re about to join a private credit investment platform offering institutional-grade
          real estate-backed notes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-2">
            <div className="text-2xl font-bold">8.40%</div>
            <div className="text-sm text-muted-foreground">6-Month Note Return</div>
          </div>
          <div className="rounded-lg border p-4 space-y-2">
            <div className="text-2xl font-bold">10.00%</div>
            <div className="text-sm text-muted-foreground">12-Month Note Return</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">What to expect:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
              Monthly interest payments via ACH
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
              Principal returned at maturity
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
              First-position liens on multifamily real estate
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
              $100,000 minimum investment
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <Button onClick={onNext} className="w-full" size="lg">
            Get Started
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Onboarding takes approximately 15-20 minutes
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function AccreditationStep({ onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accreditation Verification</CardTitle>
        <CardDescription>
          This offering is available to accredited investors only. Select how you qualify.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {[
            {
              id: 'income',
              title: 'Income',
              description: 'I earn over $200,000 annually (or $300,000 jointly with spouse)',
            },
            {
              id: 'net_worth',
              title: 'Net Worth',
              description: 'I have a net worth exceeding $1 million (excluding primary residence)',
            },
            {
              id: 'professional',
              title: 'Professional Certification',
              description: 'I hold a Series 7, 65, or 82 license in good standing',
            },
            {
              id: 'entity',
              title: 'Entity',
              description: 'I represent an entity with over $5 million in assets',
            },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`w-full text-left rounded-lg border p-4 transition-colors ${
                selected === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    selected === option.id ? 'border-primary' : 'border-muted-foreground'
                  }`}
                >
                  {selected === option.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={onNext} disabled={!selected} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function IdentityStep({ onNext, onBack }: StepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification</CardTitle>
        <CardDescription>
          We need to verify your identity for compliance. This information is encrypted and secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Legal First Name</Label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Legal Last Name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ssn">Social Security Number</Label>
          <Input id="ssn" placeholder="XXX-XX-XXXX" type="password" />
          <p className="text-xs text-muted-foreground">
            Your SSN is encrypted and used only for tax reporting purposes.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input id="address" placeholder="123 Main St" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="New York" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="NY" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" placeholder="10001" />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={onNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BankingStep({ onNext, onBack }: StepProps) {
  const [method, setMethod] = useState<'plaid' | 'manual' | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Your Bank</CardTitle>
        <CardDescription>
          Link your bank account to receive monthly interest payments via ACH.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <button
            onClick={() => setMethod('plaid')}
            className={`w-full text-left rounded-lg border p-4 transition-colors ${
              method === 'plaid' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <BankIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Connect with Plaid</div>
                <div className="text-sm text-muted-foreground">Instant verification (recommended)</div>
              </div>
              <Badge variant="secondary" className="ml-auto">Fastest</Badge>
            </div>
          </button>

          <button
            onClick={() => setMethod('manual')}
            className={`w-full text-left rounded-lg border p-4 transition-colors ${
              method === 'manual' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <EditIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Manual Entry</div>
                <div className="text-sm text-muted-foreground">Enter routing and account numbers</div>
              </div>
            </div>
          </button>
        </div>

        {method === 'manual' && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" placeholder="Chase Bank" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="routing">Routing Number</Label>
                <Input id="routing" placeholder="XXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account">Account Number</Label>
                <Input id="account" placeholder="XXXXXXXXXXXX" />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={onNext} disabled={!method} className="flex-1">
            {method === 'plaid' ? 'Connect Bank' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentsStep({ onNext, onBack }: StepProps) {
  const [signed, setSigned] = useState<string[]>([]);

  const documents = [
    { id: 'subscription', name: 'Subscription Agreement', description: 'Investment terms and conditions' },
    { id: 'w9', name: 'W-9 Form', description: 'Tax identification for interest reporting' },
    { id: 'ach', name: 'ACH Authorization', description: 'Authorize payment deposits' },
  ];

  const toggleSign = (id: string) => {
    setSigned((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const allSigned = documents.every((doc) => signed.includes(doc.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Documents</CardTitle>
        <CardDescription>
          Review and electronically sign the required investment documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`rounded-lg border p-4 transition-colors ${
                signed.includes(doc.id) ? 'border-primary/50 bg-primary/5' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DocumentIcon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-muted-foreground">{doc.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button
                    variant={signed.includes(doc.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleSign(doc.id)}
                  >
                    {signed.includes(doc.id) ? 'Signed ✓' : 'Sign'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={onNext} disabled={!allSigned} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface GoalsStepProps extends StepProps {
  goalsData: InvestorGoalsData;
  setGoalsData: (data: InvestorGoalsData) => void;
}

function GoalsStep({ onNext, onBack, goalsData, setGoalsData }: GoalsStepProps) {
  const [subStep, setSubStep] = useState<'short' | 'long' | 'preferences'>('short');

  const toggleShortTermGoal = (goalId: ShortTermGoal) => {
    const current = goalsData.shortTermGoals;
    const updated = current.includes(goalId)
      ? current.filter((g) => g !== goalId)
      : [...current, goalId];
    setGoalsData({ ...goalsData, shortTermGoals: updated });
  };

  const toggleLongTermGoal = (goalId: LongTermGoal) => {
    const current = goalsData.longTermGoals;
    const updated = current.includes(goalId)
      ? current.filter((g) => g !== goalId)
      : [...current, goalId];
    setGoalsData({ ...goalsData, longTermGoals: updated });
  };

  const canProceed =
    subStep === 'short'
      ? goalsData.shortTermGoals.length > 0
      : subStep === 'long'
      ? goalsData.longTermGoals.length > 0
      : true;

  const handleNext = () => {
    if (subStep === 'short') {
      setSubStep('long');
    } else if (subStep === 'long') {
      setSubStep('preferences');
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (subStep === 'long') {
      setSubStep('short');
    } else if (subStep === 'preferences') {
      setSubStep('long');
    } else {
      onBack?.();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {['short', 'long', 'preferences'].map((step, i) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                (subStep === 'short' && i === 0) ||
                (subStep === 'long' && i <= 1) ||
                (subStep === 'preferences' && i <= 2)
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <CardTitle>
          {subStep === 'short' && 'Short-Term Goals'}
          {subStep === 'long' && 'Long-Term Goals'}
          {subStep === 'preferences' && 'Investment Preferences'}
        </CardTitle>
        <CardDescription>
          {subStep === 'short' &&
            'What are you looking to achieve in the next 0-2 years? Select all that apply.'}
          {subStep === 'long' &&
            'What are your longer-term objectives (2+ years)? Select all that apply.'}
          {subStep === 'preferences' &&
            'How would you like to manage your investment returns?'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {subStep === 'short' && (
          <div className="space-y-3">
            {SHORT_TERM_GOALS.map((goal) => {
              const isSelected = goalsData.shortTermGoals.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleShortTermGoal(goal.id)}
                  className={`w-full text-left rounded-lg border p-4 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                        isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}
                    >
                      {isSelected && <CheckIcon className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{goal.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {goal.suggestedTerm}mo suggested
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {subStep === 'long' && (
          <div className="space-y-3">
            {LONG_TERM_GOALS.map((goal) => {
              const isSelected = goalsData.longTermGoals.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleLongTermGoal(goal.id)}
                  className={`w-full text-left rounded-lg border p-4 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                        isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}
                    >
                      {isSelected && <CheckIcon className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{goal.label}</span>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            goal.suggestedStrategy === 'reinvest'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : goal.suggestedStrategy === 'withdraw'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : ''
                          }`}
                        >
                          {goal.suggestedStrategy === 'reinvest' && 'Compound'}
                          {goal.suggestedStrategy === 'withdraw' && 'Withdraw'}
                          {goal.suggestedStrategy === 'hybrid' && 'Flexible'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {subStep === 'preferences' && (
          <div className="space-y-6">
            {/* Income Preference */}
            <div className="space-y-3">
              <Label className="text-base">What would you like to do with your monthly interest?</Label>
              <div className="space-y-2">
                {[
                  {
                    id: 'maximize_monthly' as IncomePreference,
                    label: 'Receive Monthly Payments',
                    description: 'Get paid every month via ACH deposit',
                    icon: '💵',
                  },
                  {
                    id: 'compound_growth' as IncomePreference,
                    label: 'Compound Growth',
                    description: 'Reinvest returns for maximum long-term growth',
                    icon: '📈',
                  },
                  {
                    id: 'balanced' as IncomePreference,
                    label: 'Balanced Approach',
                    description: 'Receive some payments, reinvest the rest',
                    icon: '⚖️',
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setGoalsData({ ...goalsData, incomePreference: option.id })}
                    className={`w-full text-left rounded-lg border p-4 transition-all ${
                      goalsData.incomePreference === option.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Timeline */}
            <div className="space-y-3">
              <Label className="text-base">How long do you plan to invest with us?</Label>
              <div className="grid grid-cols-3 gap-2">
                {INVESTMENT_TIMELINES.map((timeline) => (
                  <button
                    key={timeline.id}
                    onClick={() => setGoalsData({ ...goalsData, timeline: timeline.id })}
                    className={`rounded-lg border p-3 text-center transition-all ${
                      goalsData.timeline === timeline.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-sm">{timeline.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Initial Investment */}
            <div className="space-y-3">
              <Label className="text-base">Planned initial investment</Label>
              <div className="grid grid-cols-4 gap-2">
                {[100000, 250000, 500000, 1000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setGoalsData({ ...goalsData, initialInvestment: amount })}
                    className={`rounded-lg border p-3 text-center transition-all ${
                      goalsData.initialInvestment === amount
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-sm">
                      ${amount >= 1000000 ? `${amount / 1000000}M` : `${amount / 1000}K`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={handleBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed} className="flex-1">
            {subStep === 'preferences' ? 'Complete Setup' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CompleteStep({ goalsData }: { goalsData: InvestorGoalsData }) {
  // Determine dashboard focus based on goals
  const isIncomeFocused =
    goalsData.incomePreference === 'maximize_monthly' ||
    goalsData.shortTermGoals.includes('monthly_income');
  const isGrowthFocused =
    goalsData.incomePreference === 'compound_growth' ||
    goalsData.longTermGoals.includes('wealth_building');

  const dashboardPreview = isIncomeFocused
    ? 'Income-focused dashboard with payment calendar and monthly earnings'
    : isGrowthFocused
    ? 'Growth-focused dashboard with projections and compounding charts'
    : 'Balanced dashboard with income tracking and growth projections';

  const suggestedTerm = goalsData.shortTermGoals.some(
    (g) => SHORT_TERM_GOALS.find((stg) => stg.id === g)?.suggestedTerm === 12
  )
    ? '12-month'
    : '6-month';

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-2xl">You&apos;re All Set!</CardTitle>
        <CardDescription className="text-base">
          Your account is configured based on your investment goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Goals Summary */}
        <div className="rounded-lg border p-4 space-y-4 bg-muted/30">
          <h3 className="font-medium flex items-center gap-2">
            <TargetIcon className="w-4 h-4" />
            Your Investment Profile
          </h3>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dashboard Style</span>
              <span className="font-medium">
                {isIncomeFocused ? 'Income Focused' : isGrowthFocused ? 'Growth Focused' : 'Balanced'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Suggested Note Term</span>
              <span className="font-medium">{suggestedTerm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Investment Horizon</span>
              <span className="font-medium">
                {INVESTMENT_TIMELINES.find((t) => t.id === goalsData.timeline)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initial Investment</span>
              <span className="font-medium">
                ${goalsData.initialInvestment.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="rounded-lg border p-4 space-y-2">
          <h3 className="font-medium text-sm">Your Personalized Dashboard</h3>
          <p className="text-sm text-muted-foreground">{dashboardPreview}</p>
          <div className="flex gap-2 mt-3">
            {isIncomeFocused && (
              <>
                <Badge variant="secondary">Payment Calendar</Badge>
                <Badge variant="secondary">Monthly Earnings</Badge>
              </>
            )}
            {isGrowthFocused && (
              <>
                <Badge variant="secondary">Growth Projections</Badge>
                <Badge variant="secondary">Compound Chart</Badge>
              </>
            )}
            {!isIncomeFocused && !isGrowthFocused && (
              <>
                <Badge variant="secondary">Portfolio Overview</Badge>
                <Badge variant="secondary">Goal Progress</Badge>
              </>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium">Next Steps</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                1
              </span>
              <div>
                <div className="font-medium">Choose Your Note</div>
                <div className="text-muted-foreground">
                  Based on your goals, we suggest a {suggestedTerm} note
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                2
              </span>
              <div>
                <div className="font-medium">Fund Your Investment</div>
                <div className="text-muted-foreground">
                  Wire or ACH ${goalsData.initialInvestment.toLocaleString()}
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                3
              </span>
              <div>
                <div className="font-medium">Start Earning</div>
                <div className="text-muted-foreground">
                  {isIncomeFocused
                    ? 'Receive your first payment on the 1st of next month'
                    : 'Watch your investment compound over time'}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <Button className="w-full" size="lg">
          Go to Your Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}

// Icons
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BankIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
    </svg>
  );
}

export default OnboardingWizard;
