import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const serviceRequestSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  type: z.string().min(1, "Please select a service type"),
  lab: z.string().min(1, "Please select a lab"),
  priority: z.string().min(1, "Please select priority"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  contactPhone: z.string().max(20).optional(),
});


const serviceTypes = [
  { value: "Cleaning", label: "Cleaning Service", department: "General Service" },
  { value: "Electrical", label: "Electrical Installation/Maintenance", department: "General Service" },
  { value: "Water", label: "Water Maintenance", department: "General Service" },
  { value: "Furniture", label: "Furniture Installation/Maintenance", department: "General Service" },
  { value: "ICT", label: "Network/Computer Maintenance", department: "ICT Directorate" },
];

const labs = [
  "Biology Lab A",
  "Biology Lab B",
  "Chemistry Lab A",
  "Chemistry Lab B",
  "Physics Lab",
  "Genetics Lab",
  "Computer Lab",
];

const priorities = [
  { value: "High", label: "High - Urgent, affecting operations" },
  { value: "Medium", label: "Medium - Important but not urgent" },
  { value: "Low", label: "Low - Can be scheduled later" },
];


export function CreateServiceRequestDialog({ open, onOpenChange, newServiceRequest }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      title: "",
      type: "",
      lab: "",
      priority: "",
      description: "",
      contactPhone: "",
    },
  });

  const selectedType = form.watch("type");
  const responsibleDept = serviceTypes.find((t) => t.value === selectedType)?.department;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Service request submitted:", data);
    newServiceRequest(data)
    toast.success("Service request submitted", {
      description: `Your ${data.type} request has been sent to ${responsibleDept || "the relevant department"}.`,
    });
    setIsSubmitting(false);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Service Request</DialogTitle>
          <DialogDescription>
            Submit a maintenance or service request for your lab.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electrical socket repair" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {responsibleDept && (
                    <p className="text-xs text-muted-foreground">
                      This will be handled by: {responsibleDept}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lab Location *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lab" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {labs.map((lab) => (
                          <SelectItem key={lab} value={lab}>
                            {lab}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorities.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue or service needed in detail..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., +251 91 234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
