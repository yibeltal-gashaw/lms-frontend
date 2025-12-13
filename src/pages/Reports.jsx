import {
  FileText,
  Download,
  Share2,
  Eye,
  Calendar,
  Clock,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GenerateReportDialog } from "@/components/dialogs/GenerateReportDialog";
import { ReportPreviewDialog } from "@/components/dialogs/ReportPreviewDialog";
import { ShareToTelegramDialog } from "@/components/dialogs/ShareToTelegramDialog";
import { downloadReportAsPDF } from "@/utils/downloadReportAsPDF";
import { useReportHistory } from "@/hooks/useReportHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { reports, statusStyles } from "@/data/mockdata";
import { toast } from "sonner";
import { format } from "date-fns";

export function Reports() {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [expandedReports, setExpandedReports] = useState(new Set());
  const { addHistoryEntry, getReportHistory } = useReportHistory();

  const toggleReportHistory = (reportId) => {
    setExpandedReports((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reportId)) {
        newSet.delete(reportId);
      } else {
        newSet.add(reportId);
      }
      return newSet;
    });
  };

  const handlePreview = (report) => {
    setSelectedReport(report);
    setIsPreviewDialogOpen(true);
    addHistoryEntry(report.id, "viewed", { reportTitle: report.title });
  };

  const handleDownload = (report) => {
    const fileName = downloadReportAsPDF(report);
    addHistoryEntry(report.id, "downloaded", {
      reportTitle: report.title,
      fileName,
    });
    toast.success(`Downloading ${report.title}`);
  };

  const handleShare = (report) => {
    setSelectedReport(report);
    setIsShareDialogOpen(true);
  };

  const handleShareComplete = (report, details) => {
    addHistoryEntry(report.id, "shared", {
      reportTitle: report.title,
      ...details,
    });
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
        {reports.map((report) => {
          const reportHistory = getReportHistory(report.id);
          const isExpanded = expandedReports.has(report.id);
          const actionCounts = {
            viewed: reportHistory.filter((h) => h.action === "viewed").length,
            downloaded: reportHistory.filter((h) => h.action === "downloaded")
              .length,
            shared: reportHistory.filter((h) => h.action === "shared").length,
          };

          return (
            <Card key={report.id} className="transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {report.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-medium",
                            statusStyles[report.status]
                          )}
                        >
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
                      {reportHistory.length > 0 && (
                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Viewed: {actionCounts.viewed}</span>
                          <span>Downloaded: {actionCounts.downloaded}</span>
                          <span>Shared: {actionCounts.shared}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(report)}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(report)}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShare(report)}
                        title="Share"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {reportHistory.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleReportHistory(report.id)}
                        title="View History"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* History Section */}
                {isExpanded && reportHistory.length > 0 && (
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <History className="h-4 w-4 text-muted-foreground" />
                      <h4 className="text-sm font-semibold">
                        Activity History
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {reportHistory.map((entry) => {
                        const actionIcons = {
                          viewed: Eye,
                          downloaded: Download,
                          shared: Share2,
                        };
                        const actionColors = {
                          viewed: "text-primary",
                          downloaded: "text-success",
                          shared: "text-accent",
                        };
                        const ActionIcon =
                          actionIcons[entry.action] || FileText;
                        const actionColor =
                          actionColors[entry.action] || "text-muted-foreground";

                        return (
                          <div
                            key={entry.id}
                            className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2 text-sm"
                          >
                            <ActionIcon
                              className={cn("h-4 w-4", actionColor)}
                            />
                            <div className="flex-1">
                              <span className="font-medium capitalize">
                                {entry.action}
                              </span>
                              {entry.fileName && (
                                <span className="text-muted-foreground ml-2">
                                  ({entry.fileName})
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {format(
                                new Date(entry.timestamp),
                                "MMM d, yyyy 'at' h:mm a"
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
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
        onShare={handleShareComplete}
      />
    </div>
  );
}
