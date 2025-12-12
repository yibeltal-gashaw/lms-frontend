import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Wrench,
  FileText,
  Settings,
  Users,
  Calendar,
  ChevronLeft,
  FlaskConical,
  LogOut,
  ClipboardCheck,
  BarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useRoleAccess } from "@/hooks/useRoleAccess";

const getRoleLabel = (role) => {
  const labels = {
    admin: "System Admin",
    department_head: "Department Head",
    technical_assistant: "Tech Assistant",
    general_service: "General Service",
    ict_director: "ICT Director",
    college_dean: "College Dean"
  };
  return labels[role] || role;
};

const getInitials = (firstName, lastName) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export function DashboardSidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
const { hasPermission } = useRoleAccess();

  const navItems = [
  {
    title: "Dashboard",
    url: "",
    icon: LayoutDashboard,
    show: hasPermission("canViewDashboard"),
  },
  {
    title: "Lab Assets",
    url: "assets",
    icon: Package,
    show: hasPermission("canViewAssets") || hasPermission("canViewDashboard"),
  },
  {
    title: "Service Requests",
    url: "services",
    icon: Wrench,
    show: hasPermission("canViewServiceRequests"),
  },
  {
    title: "Reports",
    url: "reports",
    icon: FileText,
    show: hasPermission("canViewReports"),
  },
  {
    title: "Schedule",
    url: "schedule",
    icon: Calendar,
    show: hasPermission("canViewSchedule"),
  },
  {
    title: "Analytics",
    url: "analytics",
    icon: BarChart,
    show: hasPermission("canViewAnalytics"),
  },
  {
    title: "Approvals",
    url: "/approvals",
    icon: ClipboardCheck,
    show: hasPermission("canApproveRequests"),
  },
  {
    title: "Users",
    url: "users",
    icon: Users,
    show: hasPermission("canManageUsers"),
  },
  { title: "Settings", url: "/settings", icon: Settings, show: true },
];
const filteredNavItems = navItems.filter((item) => item.show);

  return (
    <aside
      className={cn(
        " flex flex-col h-screen sticky top-0 text-sidebar border-r transition-colors duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16  items-center gap-3 border-b border-sidebar-foreground px-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <FlaskConical className="size-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-sm font-semibold text-sidebar-accent">
              Lab Manager
            </h1>
            <p className="text-xs text-sidebar-accent/60">LMS Dashboard</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
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
            <span className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-accent/50">
              Main Menu
            </span>
          )}
        </div>
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === ""}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-sidebar-accent/70 hover:bg-sidebar-foreground hover:text-sidebar-primary",
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

      {/* User Role Badge */}
      <div className="border-t border-sidebar-foreground p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg bg-sidebar-foreground/50 px-3 py-2.5",
            collapsed && "justify-center px-2"
          )}
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
            {user ? getInitials(user.firstName, user.lastName) : null}
          </div>
          {!collapsed && user && (
            <div className="animate-fade-in">
              <p className="text-sm font-medium text-sidebar-accent">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-sidebar-accent/60">
                {getRoleLabel(user.role)}
              </p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={logout}
        className={cn(
          "flex items-center gap-3 rounded-lg p-3 mx-2 mb-2 bg-sidebar-foreground/60 text-sm font-medium text-sidebar/70 transition-colors hover:bg-destructive/10 hover:text-destructive",
          collapsed && "justify-center px-2"
        )}
      >
        <LogOut className="h-4 w-4 flex-shrink-0" />
        {!collapsed && <span className="animate-fade-in">Logout</span>}
      </button>
    </aside>
  );
}
