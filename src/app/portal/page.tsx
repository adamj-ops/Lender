import { PortalLayout } from '@/components/layout/portal-layout';
import { PortfolioOverview } from '@/components/dashboard/portfolio-overview';

export default function PortalDashboard() {
  return (
    <PortalLayout>
      <div className="p-6 lg:p-8">
        <PortfolioOverview />
      </div>
    </PortalLayout>
  );
}
