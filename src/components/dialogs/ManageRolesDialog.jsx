import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Shield, Info } from "lucide-react";
import { allRoles, roleToId } from "@/data/mockdata";

export function ManageRolesDialog({ open, onOpenChange, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    if (user) {
      const currentRoleId = roleToId[user.role] || "";
      setSelectedRoles(currentRoleId ? [currentRoleId] : []);
    }
  }, [user]);

  const handleRoleToggle = (roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSubmit = async () => {
    if (selectedRoles.length === 0) {
      toast.error("User must have at least one role assigned.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const roleLabels = selectedRoles
      .map((id) => allRoles.find((r) => r.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    toast({
      title: "Roles Updated",
      description: `${user?.name}'s roles have been updated to: ${roleLabels}`,
    });
    
    setIsLoading(false);
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Manage User Roles
          </DialogTitle>
          <DialogDescription>
            Assign or revoke roles for {user.name}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted p-3">
            <Info className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Current role: <Badge variant="outline">{user.role}</Badge>
            </p>
          </div>

          <div className="space-y-3">
            {allRoles.map((role) => (
              <div
                key={role.id}
                className={`flex items-start space-x-3 rounded-lg border p-3 transition-colors ${
                  selectedRoles.includes(role.id)
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <Checkbox
                  id={role.id}
                  checked={selectedRoles.includes(role.id)}
                  onCheckedChange={() => handleRoleToggle(role.id)}
                />
                <div className="flex-1">
                  <Label
                    htmlFor={role.id}
                    className="cursor-pointer font-medium"
                  >
                    {role.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
