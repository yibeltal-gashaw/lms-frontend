import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  Clock,
  Package,
  FileText,
  AlertCircle,
  Eye,
  MessageSquare,
} from "lucide-react";
import { AssetApprovalDialog } from "@/components/dialogs/AssetApprovalDialog";
import { ReportReviewDialog } from "@/components/dialogs/ReportReviewDialog";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import {priorityStyles, assetRequests, reportReviews, statusStyles} from "@/data/mockdata"


export function Approvals() {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const [selectedReport, setSelectedReport] = useState(null);
  const [assets, setAssets] = useState(assetRequests);
  const [reports, setReports] = useState(reportReviews);

  const pendingAssets = assets.filter((a) => a.status === "pending");
  const pendingReports = reports.filter((r) => r.status === "pending");
  const {user} = useAuth();

  const handleAssetApproval = (id, approved, comments) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === id
          ? { ...asset, status: approved ? "approved" : "rejected" }
          : asset
      )
    );
    setSelectedAsset(null);
    approved
      ? toast.success(`Request ${id} has been approved.`)
      : toast.error(`Request ${id} has been rejected.`);
  };

  const handleReportReview = (id, approved, comments) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id
          ? { ...report, status: approved ? "approved" : "revision_requested" }
          : report
      )
    );
    setSelectedReport(null);
    approved
      ? toast.success(`Request ${id} has been approved.`)
      : toast.error(`Request ${id} has been sent back for revision.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Mr. {user.firstName} {user.lastName}
        </h1>
        <p className="text-muted-foreground">
          Review and approve asset acquisitions, reports, and departmental
          requests
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingAssets.length + pendingReports.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require your attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Asset Requests
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssets.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Report Reviews
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReports.length}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Items
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {pendingAssets.filter((a) => a.priority === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need immediate action
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assets" className="gap-2">
            <Package className="h-4 w-4" />
            Asset Requests
            {pendingAssets.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {pendingAssets.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="h-4 w-4" />
            Report Reviews
            {pendingReports.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {pendingReports.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Asset Requests Tab */}
        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Acquisition Requests</CardTitle>
              <CardDescription>
                Review and approve requests for new laboratory equipment and
                assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assets.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{request.assetName}</h3>
                        <Badge className={priorityStyles[request.priority]}>
                          {request.priority}
                        </Badge>
                        <Badge className={statusStyles[request.status]}>
                          {request.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>ID: {request.id}</span>
                        <span>Lab: {request.lab}</span>
                        <span>Qty: {request.quantity}</span>
                        <span>
                          Cost: ${request.estimatedCost.toLocaleString()}
                        </span>
                        <span>By: {request.requestedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAsset(request)}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Review
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                            onClick={() =>
                              handleAssetApproval(request.id, true)
                            }
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              handleAssetApproval(request.id, false)
                            }
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Reviews Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Reviews</CardTitle>
              <CardDescription>
                Approve submitted reports or request revisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{report.title}</h3>
                        <Badge className={statusStyles[report.status]}>
                          {report.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>ID: {report.id}</span>
                        <span>Type: {report.type}</span>
                        <span>Period: {report.period}</span>
                        <span>Lab: {report.lab}</span>
                        <span>By: {report.submittedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Review
                      </Button>
                      {report.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                            onClick={() => handleReportReview(report.id, true)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleReportReview(report.id, false)}
                          >
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Request Revision
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AssetApprovalDialog
        open={!!selectedAsset}
        onOpenChange={(open) => !open && setSelectedAsset(null)}
        asset={selectedAsset}
        onApprove={(comments) =>
          selectedAsset && handleAssetApproval(selectedAsset.id, true, comments)
        }
        onReject={(comments) =>
          selectedAsset &&
          handleAssetApproval(selectedAsset.id, false, comments)
        }
      />

      <ReportReviewDialog
        open={!!selectedReport}
        onOpenChange={(open) => !open && setSelectedReport(null)}
        report={selectedReport}
        onApprove={(comments) =>
          selectedReport &&
          handleReportReview(selectedReport.id, true, comments)
        }
        onRequestRevision={(comments) =>
          selectedReport &&
          handleReportReview(selectedReport.id, false, comments)
        }
      />
    </div>
  );
}
