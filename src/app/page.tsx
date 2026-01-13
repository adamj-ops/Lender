import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EL</span>
            </div>
            <span className="font-semibold text-lg">Everyday Lending</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portal">
              <Button variant="ghost">Investor Portal</Button>
            </Link>
            <Link href="/onboarding">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="text-sm">
            Private Credit Investment Platform
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Institutional-Grade
            <br />
            <span className="text-primary">Real Estate Notes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn predictable monthly income backed by first-position liens on multifamily
            real estate. Minimum investment $100,000.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/onboarding">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Start Investing
              </Button>
            </Link>
            <Link href="/architecture">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                View Architecture
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Returns Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Competitive Fixed Returns</h2>
            <p className="text-muted-foreground mt-2">
              Choose the term that fits your investment goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
              <CardHeader>
                <CardTitle className="text-lg">6-Month Note</CardTitle>
                <CardDescription>Short-term liquidity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">8.40%</div>
                <div className="text-muted-foreground mt-1">Annualized return</div>
                <ul className="mt-6 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    0.70% monthly payment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    4.20% total return
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    Principal returned at maturity
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-primary">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full" />
              <div className="absolute top-4 right-4">
                <Badge>Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">12-Month Note</CardTitle>
                <CardDescription>Maximum yield</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold">10.00%</div>
                <div className="text-muted-foreground mt-1">Annualized return</div>
                <ul className="mt-6 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    0.8333% monthly payment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    10.00% total return
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    Principal returned at maturity
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Platform Features</h2>
            <p className="text-muted-foreground mt-2">
              Built for sophisticated investors
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Deal Intelligence',
                description: 'IDS scoring provides comparable, explainable deal metrics',
                icon: ChartIcon,
              },
              {
                title: 'Portfolio Analytics',
                description: 'PRI monitoring for systemic risk and concentration tracking',
                icon: PieIcon,
              },
              {
                title: 'Monthly Payments',
                description: 'Automated ACH deposits on the 1st of each month',
                icon: CalendarIcon,
              },
              {
                title: 'AI Explanations',
                description: 'Natural language insights when scores change significantly',
                icon: SparkleIcon,
              },
              {
                title: 'Full Transparency',
                description: 'Every score traceable to deterministic calculations',
                icon: EyeIcon,
              },
              {
                title: 'Audit Trail',
                description: 'Immutable snapshots for complete compliance history',
                icon: ShieldIcon,
              },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <feature.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Start Earning?</h2>
          <p className="text-primary-foreground/80">
            Join sophisticated investors earning predictable monthly income from real estate-backed notes.
          </p>
          <Link href="/onboarding">
            <Button size="lg" variant="secondary" className="px-8">
              Begin Onboarding
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">EL</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Everyday Lending
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/portal" className="hover:text-foreground transition-colors">
              Portal
            </Link>
            <Link href="/onboarding" className="hover:text-foreground transition-colors">
              Onboarding
            </Link>
            <Link href="/architecture" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
          </div>
        </div>
      </footer>
    </main>
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

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  );
}

function PieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}
