import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar, Clock, Building } from "lucide-react";

const statusStyles = {
  Approved: "bg-success/10 text-success border-success/20",
  "Pending Review": "bg-warning/10 text-warning border-warning/20",
  Submitted: "bg-primary/10 text-primary border-primary/20",
  Draft: "bg-muted text-muted-foreground border-muted-foreground/20",
};

export function ReportPreviewDialog({
  open,
  onOpenChange,
  report,
}) {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Preview
          </DialogTitle>
          <DialogDescription>
            Viewing: {report.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Header */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{report.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">Report ID: {report.id}</p>
              </div>
              <Badge variant="outline" className={statusStyles[report.status]}>
                {report.status}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">{report.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Period:</span>
                <span className="font-medium">{report.period}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{new Date(report.createdDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{new Date(report.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Report Content Preview */}
          <div className="rounded-lg border bg-card">
            <div className="border-b bg-muted/50 px-6 py-3">
              <h3 className="font-semibold">Executive Summary</h3>
            </div>
            <div className="p-6 text-sm text-muted-foreground space-y-4">
              <p>
                This {report.type.toLowerCase()} report covers the {report.period} period and provides 
                comprehensive analysis of lab operations, resource utilization, and key performance indicators.
              </p>
              <p>
                Key highlights include equipment status updates, maintenance schedules, 
                and recommendations for operational improvements.
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="rounded-lg border bg-card">
            <div className="border-b bg-muted/50 px-6 py-3">
              <h3 className="font-semibold">Key Metrics</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <p className="text-sm text-muted-foreground">Equipment Uptime</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-success">87%</div>
                  <p className="text-sm text-muted-foreground">Lab Utilization</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-warning">12</div>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="rounded-lg border bg-card">
            <div className="border-b bg-muted/50 px-6 py-3">
              <h3 className="font-semibold">Recommendations</h3>
            </div>
            <div className="p-6">
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Schedule preventive maintenance for aging equipment</li>
                <li>Consider capacity expansion for high-demand labs</li>
                <li>Implement automated inventory tracking system</li>
                <li>Review and update safety protocols</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
