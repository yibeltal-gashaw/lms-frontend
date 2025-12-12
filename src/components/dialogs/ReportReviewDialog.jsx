import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, MessageSquare, FileText, Calendar, User, Building, Download, Eye } from "lucide-react";


const statusStyles = {
  pending: "bg-amber-500/10 text-amber-600",
  approved: "bg-emerald-500/10 text-emerald-600",
  revision_requested: "bg-blue-500/10 text-blue-600",
};

export function ReportReviewDialog({
  open,
  onOpenChange,
  report,
  onApprove,
  onRequestRevision,
}) {
  const [comments, setComments] = useState("");

  if (!report) return null;

  const handleApprove = () => {
    onApprove(comments);
    setComments("");
  };

  const handleRequestRevision = () => {
    onRequestRevision(comments);
    setComments("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Review
          </DialogTitle>
          <DialogDescription>
            Review the submitted report and approve or request revisions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {/* Report Details */}
          <div className="rounded-lg border px-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.type}</p>
              </div>
              <Badge className={statusStyles[report.status]}>
                {report.status.replace("_", " ")}
              </Badge>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Lab:</span>
                <span className="font-medium">{report.lab}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Period:</span>
                <span className="font-medium">{report.period}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Submitted:</span>
                <span className="font-medium">{new Date(report.submittedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Submitted by:</span>
                <span className="font-medium">{report.submittedBy}</span>
              </div>
            </div>
          </div>

          {/* Report Preview Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              Preview Report
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          {/* Report Summary (Simulated) */}
          <div className="space-y-1">
            <Label className="text-sm font-medium">Report Summary</Label>
            <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
              <p>This report covers the {report.period} period for {report.lab}.</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                <li>Executive summary and key findings</li>
                <li>Detailed metrics and analysis</li>
                <li>Recommendations and action items</li>
                <li>Supporting data and appendices</li>
              </ul>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-1">
            <Label htmlFor="review-comments">Review Comments</Label>
            <Textarea
              id="review-comments"
              placeholder="Add feedback, suggestions for improvement, or conditions for approval..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Comments will be shared with the report author
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            onClick={handleRequestRevision}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Request Revision
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleApprove}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
