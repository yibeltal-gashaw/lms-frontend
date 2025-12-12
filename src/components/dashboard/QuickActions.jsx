import { Plus, Wrench, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import {cn} from "@/lib/utils";

const actions = [
  {
    title: "Register Asset",
    description: "Add new lab equipment",
    icon: Plus,
    url:"assets",
    color: "bg-primary",
  },
  {
    title: "Request Service",
    description: "Submit maintenance request",
    url:"services",
    icon: Wrench,
    color: "bg-secondary",
  },
  {
    title: "Generate Report",
    description: "Create lab inventory report",
    url:"reports",
    icon: FileText,
    color: "bg-secondary",
  },
  {
    title: "Upload Results",
    description: "Upload lab report results",
    url:"analytics",
    icon: Upload,
    color: "bg-secondary",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
      <div className="mt-4 grid gap-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.url}
            className={cn("h-auto flex flex-col items-start gap-1 p-4 text-left rounded-md", action.color)}
          >
            <action.icon className="h-5 w-5" />
            <span className="font-medium">{action.title}</span>
            <span className="text-xs opacity-70">{action.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}