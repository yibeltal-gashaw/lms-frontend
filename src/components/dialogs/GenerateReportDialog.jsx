import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, SquareCheck } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const reportSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  type: z.string().min(1, "Please select a report type"),
  periodStart: z.date({ required_error: "Please select start date" }),
  periodEnd: z.date({ required_error: "Please select end date" }),
  labs: z.array(z.string()).min(1, "Select at least one lab"),
  notes: z.string().max(500).optional(),
  shareWithDepartmentHead: z.boolean().default(false),
});


const reportTypes = [
  { value: "Inventory", label: "Lab Inventory Report" },
  { value: "Maintenance", label: "Equipment Maintenance Summary" },
  { value: "Utilization", label: "Lab Utilization Report" },
  { value: "Acquisition", label: "Asset Acquisition Request" },
  { value: "Results", label: "Student Lab Results Summary" },
];

const allLabs = [
  "Biology Lab A",
  "Biology Lab B",
  "Chemistry Lab A",
  "Chemistry Lab B",
  "Physics Lab",
  "Genetics Lab",
  "Computer Lab",
];

const labToDepartmentMap = {
  "Biology Lab A": "Biology",
  "Biology Lab B": "Biology",
  "Chemistry Lab A": "Chemistry",
  "Chemistry Lab B": "Chemistry",
  "Physics Lab": "Physics",
  "Genetics Lab": "Genetics",
  "Computer Lab": "Computer Science",
};

const departmentCodeMap = {
  swe: "Computer Science",
  chemistry: "Chemistry",
  biology: "Biology",
  physics: "Physics",
  genetics: "Genetics",
};

const normalizeDepartment = (dept) => {
  if (!dept) return null;
  const lower = dept.toLowerCase();
  if (departmentCodeMap[lower]) return departmentCodeMap[lower];
  return dept;
};

export function GenerateReportDialog({ open, onOpenChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const userDepartment = normalizeDepartment(user?.department);

  const isLabAllowed = (lab) => {
    if (!userDepartment) return true;
    return labToDepartmentMap[lab] === userDepartment;
  };

  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: "",
      type: "",
      labs: [],
      notes: "",
      shareWithDepartmentHead: false,
    },
  });

  const selectedLabs = form.watch("labs");

  const toggleLab = (lab) => {
    if (!isLabAllowed(lab)) return;
    const current = form.getValues("labs");
    if (current.includes(lab)) {
      form.setValue("labs", current.filter((l) => l !== lab));
    } else {
      form.setValue("labs", [...current, lab]);
    }
  };

  const selectAllLabs = () => {
    const allowedLabs = allLabs.filter(isLabAllowed);
    form.setValue("labs", allowedLabs);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Report generated:", data);
    toast.success("Report generated successfully", {
      description: data.shareWithDepartmentHead
        ? "Report has been shared with Department Head"
        : "Report saved as draft",
    });
    setIsSubmitting(false);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>
            Create a new lab report for the selected period and labs.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Monthly Lab Inventory Report" {...field} />
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
                  <FormLabel>Report Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="periodStart"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Period Start *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="periodEnd"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Period End *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="labs"
              render={() => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Labs to Include *</FormLabel>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={selectAllLabs}
                    >
                      Select All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-3">
                    {allLabs.map((lab) => {
                      const isAllowed = isLabAllowed(lab);
                      const isChecked = selectedLabs.includes(lab);
                      return (
                        <div key={lab} className="flex items-center space-x-2">
                          {isAllowed ? (
                            <Checkbox
                              id={lab}
                              checked={isChecked}
                              onCheckedChange={() => toggleLab(lab)}
                            />
                          ) : (
                            <div className="flex h-4 w-4 items-center justify-center">
                              <SquareCheck className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          <label
                            htmlFor={lab}
                            className={cn(
                              "text-sm font-medium leading-none",
                              !isAllowed && "cursor-not-allowed opacity-70 text-muted-foreground"
                            )}
                          >
                            {lab}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional comments or context for the report..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shareWithDepartmentHead"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Share with Department Head</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Automatically send this report for review upon generation
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Generating..." : "Generate Report"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
