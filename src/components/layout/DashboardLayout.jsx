import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function DashboardLayout() {
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col">
        <DashboardHeader
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
''
export default DashboardLayout;
