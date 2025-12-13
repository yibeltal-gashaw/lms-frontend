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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, MessageCircle } from "lucide-react";


export function ShareToTelegramDialog({
  open,
  onOpenChange,
  report,
  onShare,
}) {
  const [chatId, setChatId] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  if (!report) return null;

  const defaultMessage = `📊 *${report.title}*\n\n📋 Type: ${report.type}\n📅 Period: ${report.period}\n🔖 Status: ${report.status}\n📆 Created: ${report.createdDate}\n⏰ Due: ${report.dueDate}`;

  const handleShare = async () => {
    if (!chatId.trim()) {
      toast.error("Please enter a Telegram Chat ID or username");
      return;
    }

    setIsSharing(true);

    try {
      const message = customMessage.trim() || defaultMessage;
      const encodedMessage = encodeURIComponent(message);
      
      // Open Telegram with pre-filled message
      // Using t.me/share/url for web sharing
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedMessage}`;
      
      window.open(telegramUrl, "_blank", "noopener,noreferrer");

      toast.success("Select a chat to share the report");
      
      // Call onShare callback if provided
      if (onShare) {
        onShare(report, { chatId, customMessage });
      }

      onOpenChange(false);
      setChatId("");
      setCustomMessage("");
    } catch (error) {
      console.error("Error sharing to Telegram:", error);
      toast.error("Failed to share to Telegram. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDirectShare = () => {
    const message = customMessage.trim() || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedMessage}`;
    
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
    
    toast.success("Select a chat to share the report");
    
    // Call onShare callback if provided
    if (onShare) {
      onShare(report, { chatId, customMessage });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#0088cc]" />
            Share to Telegram
          </DialogTitle>
          <DialogDescription>
            Share "{report.title}" via Telegram
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Message */}
          <div className="space-y-2">
            <Label>Message Preview</Label>
            <div className="rounded-lg bg-muted/50 p-4 text-sm whitespace-pre-wrap">
              {customMessage.trim() || defaultMessage}
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="custom-message">Custom Message (Optional)</Label>
            <Textarea
              id="custom-message"
              placeholder="Add a custom message or leave empty to use the default..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Chat ID Input (for Bot API - optional) */}
          <div className="space-y-2">
            <Label htmlFor="chat-id">Chat ID or Username (Optional)</Label>
            <Input
              id="chat-id"
              placeholder="@username or chat ID"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to select a chat manually
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDirectShare}
            className="bg-[#0088cc] hover:bg-[#0077b5] text-white"
          >
            <Send className="mr-2 h-4 w-4" />
            Share via Telegram
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
