import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRoleAccess } from "@/hooks/useRoleAccess";
import {scheduleData, labColors} from "@/data/mockdata";


export function Schedule() {
  const { hasPermission } = useRoleAccess();
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lab Schedule</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage laboratory schedules
          </p>
        </div>
        {hasPermission("canCreateSchedule") && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Schedule
          </Button>
        )}
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">December 9 - 13, 2024</h2>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Schedule Grid */}
      <div className="grid gap-4 md:grid-cols-5">
        {scheduleData.map((day) => (
          <div key={day.day} className="space-y-3">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                {day.day}
              </p>
              <p className="text-2xl font-bold">{day.date}</p>
            </div>
            <div className="space-y-2">
              {day.slots.map((slot, idx) => (
                <Card
                  key={idx}
                  className={cn(
                    "border-l-4 transition-shadow hover:shadow-md",
                    labColors[slot.lab] || "bg-muted border-l-muted-foreground"
                  )}
                >
                  <CardContent className="p-3">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {slot.time}
                    </Badge>
                    <p className="font-semibold text-sm">{slot.class}</p>
                    <p className="text-xs text-muted-foreground">{slot.lab}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {slot.instructor}
                    </p>
                  </CardContent>
                </Card>
              ))}
              {day.slots.length === 0 && (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                  No sessions
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="flex flex-wrap gap-4 p-4">
          <span className="text-sm font-medium text-muted-foreground">
            Labs:
          </span>
          {Object.keys(labColors).map((lab) => (
            <div key={lab} className="flex items-center gap-2">
              <div
                className={cn("h-3 w-3 rounded", labColors[lab].split(" ")[0])}
              />
              <span className="text-sm">{lab}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
