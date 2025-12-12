import { Package, Wrench, FileText, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "asset",
    title: "New Microscope Registered",
    description: "Added 5 Olympus CX23 microscopes to Chemistry Lab",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    type: "service",
    title: "Maintenance Request Submitted",
    description: "Electrical maintenance for Lab Room A-101",
    time: "4 hours ago",
    status: "pending",
  },
  {
    id: 3,
    type: "report",
    title: "Monthly Report Approved",
    description: "November 2024 lab inventory report approved by department",
    time: "Yesterday",
    status: "success",
  },
  {
    id: 4,
    type: "asset",
    title: "Asset Status Updated",
    description: "Centrifuge CFG-200 marked as Under Maintenance",
    time: "Yesterday",
    status: "warning",
  },
  {
    id: 5,
    type: "service",
    title: "Service Request Completed",
    description: "Water pipe repair in Biology Lab completed",
    time: "2 days ago",
    status: "success",
  },
];

const iconMap = {
  asset: Package,
  service: Wrench,
  report: FileText,
};

const statusMap = {
  success: { icon: CheckCircle, color: "text-success" },
  pending: { icon: Clock, color: "text-warning" },
  warning: { icon: AlertCircle, color: "text-accent" },
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-4">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          const StatusIcon = statusMap[activity.status].icon;
          const statusColor = statusMap[activity.status].color;

          return (
            <div key={activity.id} className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Icon className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-card-foreground">{activity.title}</p>
                  <StatusIcon className={cn("h-4 w-4", statusColor)} />
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground truncate">{activity.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}