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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { KeyRound, Mail, Key } from "lucide-react";


export function ResetPasswordDialog({ open, onOpenChange, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [resetMethod, setResetMethod] = useState("email");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (resetMethod === "manual") {
      if (!newPassword || !confirmPassword) {
        toast.error("Please fill in both password fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast({
          title: "Validation Error",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }

      if (newPassword.length < 8) {
        toast({
          title: "Validation Error",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (resetMethod === "email") {
      toast({
        title: "Password Reset Email Sent",
        description: `A password reset link has been sent to ${user?.email}.`,
      });
    } else {
      toast({
        title: "Password Reset",
        description: `Password for ${user?.name} has been reset successfully. Please inform the user of their new password.`,
      });
    }
    
    setNewPassword("");
    setConfirmPassword("");
    setIsLoading(false);
    onOpenChange(false);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Reset Password
          </DialogTitle>
          <DialogDescription>
            Reset password for {user.name} ({user.email})
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <RadioGroup
            value={resetMethod}
            onValueChange={(value) => setResetMethod(value)}
          >
            <div className="flex items-start space-x-3 rounded-lg border p-3">
              <RadioGroupItem value="email" id="email" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer font-medium">
                  <Mail className="h-4 w-4" />
                  Send Reset Link via Email
                </Label>
                <p className="text-sm text-muted-foreground">
                  User will receive an email with a link to reset their password
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-lg border p-3">
              <RadioGroupItem value="manual" id="manual" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="manual" className="flex items-center gap-2 cursor-pointer font-medium">
                  <Key className="h-4 w-4" />
                  Set New Password Manually
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enter a new password for the user directly
                </p>
              </div>
            </div>
          </RadioGroup>

          {resetMethod === "manual" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password *</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="rounded-lg bg-warning/10 p-3 text-sm text-warning">
                <p>
                  Make sure to securely communicate the new password to the user.
                  They should change it after their first login.
                </p>
              </div>
            </div>
          )}
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
            {isLoading
              ? "Processing..."
              : resetMethod === "email"
              ? "Send Reset Link"
              : "Reset Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
