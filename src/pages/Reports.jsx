import { FileText, Download, Share2, Eye, Calendar, Clock } from "lucide-react";
import { GenerateReportDialog } from "@/components/dialogs/GenerateReportDialog";
import { ReportPreviewDialog } from "@/components/dialogs/ReportPreviewDialog";
import { ShareToTelegramDialog } from "@/components/dialogs/ShareToTelegramDialog";
import { downloadReportAsPDF } from "@/utils/downloadReportAsPDF";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {reports, statusStyles} from "@/data/mockdata";
import { toast } from "sonner";

export function Reports() {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handlePreview = (report) => {
    setSelectedReport(report);
    setIsPreviewDialogOpen(true);
  };

  const handleDownload = (report) => {
    downloadReportAsPDF(report);
    toast.success(`Downloading ${report.title}`);
  };

  const handleShare = (report) => {
    setSelectedReport(report);
    setIsShareDialogOpen(true);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="mt-1 text-muted-foreground">
            Generate, view, and share lab reports
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsGenerateDialogOpen(true)}>
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">2</div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning">1</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-muted-foreground">1</div>
            <p className="text-sm text-muted-foreground">Draft</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{report.title}</h3>
                    <Badge variant="outline" className={cn("font-medium", statusStyles[report.status])}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Badge variant="secondary">{report.type}</Badge>
                    </span>
                    <span>{report.period}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {report.createdDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Due: {report.dueDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handlePreview(report)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDownload(report)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare(report)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialogs */}
      <GenerateReportDialog
        open={isGenerateDialogOpen}
        onOpenChange={setIsGenerateDialogOpen}
      />
      <ReportPreviewDialog
        open={isPreviewDialogOpen}
        onOpenChange={setIsPreviewDialogOpen}
        report={selectedReport}
      />
      <ShareToTelegramDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        report={selectedReport}
      />
    </div>
  );
}