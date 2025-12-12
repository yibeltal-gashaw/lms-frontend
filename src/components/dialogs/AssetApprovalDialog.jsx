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
import { CheckCircle, XCircle, Package, Calendar, User, Building, DollarSign } from "lucide-react";


const priorityStyles = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-blue-500/10 text-blue-600",
  high: "bg-amber-500/10 text-amber-600",
  critical: "bg-destructive/10 text-destructive",
};

export function AssetApprovalDialog({
  open,
  onOpenChange,
  asset,
  onApprove,
  onReject,
}) {
  const [comments, setComments] = useState("");

  if (!asset) return null;

  const handleApprove = () => {
    onApprove(comments);
    setComments("");
  };

  const handleReject = () => {
    onReject(comments);
    setComments("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Asset Acquisition Request Review
          </DialogTitle>
          <DialogDescription>
            Review the details below and approve or reject this request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Asset Details */}
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{asset.assetName}</h3>
                <p className="text-sm text-muted-foreground">{asset.category}</p>
              </div>
              <Badge className={priorityStyles[asset.priority]}>
                {asset.priority} priority
              </Badge>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Lab:</span>
                <span className="font-medium">{asset.lab}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium">{asset.quantity}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Estimated Cost:</span>
                <span className="font-medium">${asset.estimatedCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Requested:</span>
                <span className="font-medium">{new Date(asset.requestDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm md:col-span-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Requested by:</span>
                <span className="font-medium">{asset.requestedBy}</span>
              </div>
            </div>
          </div>

          {/* Justification */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Justification</Label>
            <div className="rounded-lg bg-muted/50 p-4 text-sm">
              {asset.justification}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Comments (Optional)</Label>
            <Textarea
              id="comments"
              placeholder="Add any comments or conditions for this decision..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-destructive hover:bg-destructive/10"
            onClick={handleReject}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject Request
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleApprove}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
