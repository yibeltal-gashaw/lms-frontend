import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";
import { RegisterAssetDialog } from "@/components/dialogs/RegisterAssetDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import { useAuth } from "@/contexts/AuthContext";
import { assets, statusStyles } from "@/data/mockdata";
import { labToDepartmentMap } from "@/data/mockdata";
import { normalizeDepartment } from "@/lib/utils";
import { ImportAssetsDialog } from "@/components/dialogs/ImportAssetsDialog";

// Helper function to get department from lab name
const getDepartmentFromLab = (labName) => {
  return labToDepartmentMap[labName] || null;
};

export function LabAssets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isImportDialogOpen,setIsImportDialogOpen] = useState(false);
  const { hasPermission } = useRoleAccess();
  const { user } = useAuth();
  // Get user's department
  const userDepartment = normalizeDepartment(user?.department);

  // Filter assets by department and other criteria
  const filteredAssets = assets.filter((asset) => {
    // Filter by department if user has a department
    if (userDepartment) {
      const assetDepartment = getDepartmentFromLab(asset.lab);
      if (assetDepartment !== userDepartment) {
        return false;
      }
    }
    // If user has no department (e.g., admin), show all assets

    // Filter by search query
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.lab.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "all" || asset.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lab Assets</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and track all laboratory equipment and assets
          </p>
        </div>
        {hasPermission("canRegisterAssets") && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsImportDialogOpen(true)}
            >
              <Upload className="h-4 w-4" />
              Import CSV
            </Button>
            <Button
              className="gap-2"
              onClick={() => setIsRegisterDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Register Asset
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assets by name, ID, lab, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
            <SelectItem value="Damaged">Damaged</SelectItem>
            <SelectItem value="Transferred">Transferred</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assets Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Asset ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Lab</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-center">Qty</TableHead>
              <TableHead className="font-semibold">Last Updated</TableHead>
              <TableHead className="font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-sm">{asset.id}</TableCell>
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {asset.category}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {asset.lab}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("font-medium", statusStyles[asset.status])}
                  >
                    {asset.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{asset.quantity}</TableCell>
                <TableCell className="text-muted-foreground">
                  {asset.lastUpdated}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" /> Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredAssets.length} of {assets.length} assets
        </span>
        <span>
          Total quantity:{" "}
          {filteredAssets.reduce((sum, a) => sum + a.quantity, 0)} items
        </span>
      </div>

      {/* Register Asset Dialog */}
      <RegisterAssetDialog
        open={isRegisterDialogOpen}
        onOpenChange={setIsRegisterDialogOpen}
      />
      {/* Import Assets Dialog */}
      <ImportAssetsDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
      />
    </div>
  );
}
