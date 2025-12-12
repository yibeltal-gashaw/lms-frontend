import { useState } from "react";
import {
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { CreateServiceRequestDialog } from "@/components/dialogs/CreateServiceRequestDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {serviceRequests, statusConfig, priorityStyles} from "@/data/mockdata";

export function ServiceRequests() {
  const [isServiceRequestDialogOpen, setServiceRequestDialogOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredRequests = serviceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      request.status.toLowerCase().replace(" ", "-") === activeTab;
    return matchesSearch && matchesTab;
  });

  const counts = {
    all: serviceRequests.length,
    pending: serviceRequests.filter((r) => r.status === "Pending").length,
    "in-progress": serviceRequests.filter((r) => r.status === "In Progress")
      .length,
    completed: serviceRequests.filter((r) => r.status === "Completed").length,
  };

  function setServiceRequest({
    description,
    lab,
    priority,
    title,
    type,
  }) {
    let request = {
      id: "SR-007",
      title,
      type,
      lab,
      status: "Pending",
      priority,
      requestedBy: "Estifanos Gashaw",
      requestDate: "2024-12-04",
      description
    };
    serviceRequests.push(request);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Service Requests
          </h1>
          <p className="mt-1 text-muted-foreground">
            Submit and track maintenance service requests
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => setServiceRequestDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({counts["in-progress"]})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({counts.completed})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((request) => {
              const StatusIcon = statusConfig[request.status].icon;
              const statusColor = statusConfig[request.status].color;
              const statusBg = statusConfig[request.status].bgColor;

              return (
                <Card
                  key={request.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            statusBg
                          )}
                        >
                          <StatusIcon className={cn("h-4 w-4", statusColor)} />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {request.id}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          priorityStyles[request.priority]
                        )}
                      >
                        {request.priority}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 text-base">
                      {request.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {request.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="secondary">{request.type}</Badge>
                      <Badge variant="secondary">{request.lab}</Badge>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                      <span>{request.requestedBy}</span>
                      <span>{request.requestDate}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredRequests.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-medium text-foreground">
                No requests found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CreateServiceRequestDialog
        open={isServiceRequestDialogOpen}
        onOpenChange={setServiceRequestDialogOpen}
        newServiceRequest={setServiceRequest}
      />
    </div>
  );
}
