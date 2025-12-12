import { useAuth } from "@/contexts/AuthContext";

const rolePermissions = {
  admin: {
    canViewDashboard: false,
    canViewAssets: false,
    canCreateServiceRequests: false,
    canViewServiceRequests: false,
    canApproveRequests: false,
    canManageUsers: true,
    canViewReports: false,
    canCreateReports: false,
    canViewAnalytics: false,
    canViewSchedule: false,
  },
  department_head: {
    canViewDashboard: true,
    canViewAssets: false,
    canRegisterAssets:false,
    canCreateServiceRequests: true,
    canApproveRequests: true,
    canManageUsers: false,
    canViewReports: true,
    canCreateReports: true,
    canViewAnalytics: true,
    canViewSchedule: true,
    canCreateSchedule: true,
  },

  technical_assistant: {
    canViewDashboard: true,
    canViewAssets: true,
    canRegisterAssets: true,
    canCreateServiceRequests: true,
    canApproveRequests: false,
    canManageUsers: false,
    canViewReports: true,
    canCreateReports: true,
    canViewAnalytics: false,
    canViewSchedule: true,
    canCreateSchedule: false,
  },
  college_dean: {
    canViewDashboard: true,
    canViewAssets: true,
    canRegisterAssets: false,
    canCreateServiceRequests: true,
    canApproveRequests: true,
    canManageUsers: false,
    canViewReports: true,
    canCreateReports: true,
    canViewAnalytics: true,
    canViewSchedule: true,
    canCreateSchedule: false,
  },
  general_service:{
    canViewDashboard: false,
    canViewAssets: false,
    canRegisterAssets: false,
    canCreateServiceRequests: false,
    canApproveRequests: false,
    canManageUsers: false,
    canViewReports: true,
    canCreateReports: true,
    canViewAnalytics: false,
    canViewSchedule: false,
  },
  ict_director:{
    canViewDashboard: false,
    canViewAssets: false,
    canRegisterAssets: false,
    canCreateServiceRequests: false,
    canApproveRequests: false,
    canManageUsers: false,
    canViewReports: true,
    canCreateReports: true,
    canViewAnalytics: false,
    canViewSchedule: false,
  }
};

export function useRoleAccess() {
  const { user } = useAuth();

  if (!user) {
    return {
      permissions: null,
      hasPermission: () => false,
      role: null,
    };
  }

  const permissions = rolePermissions[user.role];

  const hasPermission = (permission) => {
    return permissions[permission];
  };

  return {
    permissions,
    hasPermission,
    role: user.role,
  };
}
