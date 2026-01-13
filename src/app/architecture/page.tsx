import { SystemArchitectureDiagram } from '@/components/diagrams/system-architecture';
import { OnboardingFlowDiagram } from '@/components/diagrams/onboarding-flow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Everyday Lending Architecture</h1>
          <p className="text-muted-foreground mt-2">
            System diagrams and flow documentation
          </p>
        </div>

        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="system">System Architecture</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding Flow</TabsTrigger>
          </TabsList>
          <TabsContent value="system" className="mt-8">
            <SystemArchitectureDiagram />
          </TabsContent>
          <TabsContent value="onboarding" className="mt-8">
            <OnboardingFlowDiagram />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
