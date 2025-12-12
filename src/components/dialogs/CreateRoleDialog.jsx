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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle, UserPlus } from "lucide-react";


export function CreateRoleDialog({ open, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.role) {
        toast.error("Please fill in role is required field.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    toast.success(
      `Anew \` ${formData.role} \` role has been created successfully.`,{
        icon: <CheckCircle size={20} className="text-green-500" />,
      });
    
    setFormData({
      role: "",
    });
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create New Role
          </DialogTitle>
          <DialogDescription>
            Create a new role and assign users in the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                placeholder="Department Head"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
