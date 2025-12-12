import { Package, Wrench, FileText, ClipboardCheck } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatusCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AssetStatusChart } from "@/components/dashboard/AssetStatusChart";
import { ServiceRequestsChart } from "@/components/dashboard/ServiceRequestsChart";
import { QuickActions } from "@/components/dashboard/QuickActions";

export function DashboardHome() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back! Here's what's happening in your lab today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Assets"
          value={320}
          change="+12 this month"
          changeType="positive"
          icon={Package}
          iconColor="bg-primary"
        />
        <StatsCard
          title="Pending Requests"
          value={8}
          change="3 urgent"
          changeType="negative"
          icon={Wrench}
          iconColor="bg-accent"
        />
        <StatsCard
          title="Reports Submitted"
          value={15}
          change="2 awaiting approval"
          changeType="neutral"
          icon={FileText}
          iconColor="bg-success"
        />
        <StatsCard
          title="Completed Tasks"
          value={42}
          change="+18% from last week"
          changeType="positive"
          icon={ClipboardCheck}
          iconColor="bg-chart-4"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AssetStatusChart />
        <ServiceRequestsChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        {/* <QuickActions /> */}
      </div>
    </div>
  );
}