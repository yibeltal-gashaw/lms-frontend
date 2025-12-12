
import {
  BarChart3,
  Building,
  ChevronLeft,
  Droplet,
  UserPlus,
  Users,
  UserStar,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { title: "Users", url: "", icon: UserPlus },
  { title: "Create department", url: "add-department", icon: Building },
  { title: "Create Role", url: "add-role", icon: BarChart3 },
  { title: "Lab Assistants", url: "lab-assistant", icon: Users },
  { title: "Service Providers", url: "service-providers", icon: Droplet },
  { title: "General Account", url: "general-account", icon: UserStar },
];

export default function TechnicalAssistantLayout() {
  const [userSidebarCollapsed, setUserSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen gap-3 w-[calc(100%-120px)]">
      <UserSidebar
        collapsed={userSidebarCollapsed}
        onToggle={() => setUserSidebarCollapsed(!userSidebarCollapsed)}
      />
      <section className="flex-1 p-4">
        <Outlet />
      </section>
    </div>
  );
}

function UserSidebar({ collapsed, onToggle }) {
  const location = useLocation();
  return (
    <aside
      className={cn(
        "relative flex flex-col h-full -ml-5 -mt-7 border-r text-sidebar-accent/70 transition-all duration-300",
        collapsed ? "w-16" : "w-52"
      )}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex size-6 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground shadow-lg hover:bg-sidebar-primary/90 transition-colors"
      >
        <ChevronLeft
          className={cn(
            "size-4 transition-transform",
            collapsed && "rotate-180"
          )}
        />
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <div className="mb-2">
          {!collapsed && (
            <span className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
              Main Menu
            </span>
          )}
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === ""}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-foreground hover:text-sidebar-primary",
                collapsed && "justify-center px-2",
                isActive && "bg-sidebar-foreground text-sidebar-primary"
              )
            }
          >
            <item.icon className="size-5 flex-shrink-0" />
            {!collapsed && (
              <span className="animate-fade-in">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
