export const roleRoutes = {
  ADMIN: [
    "/admin",
    "/admin/users",
    "/admin/privileges",
    "/admin/password-reset",
  ],

  TECH_ASSISTANT: [
    "/ta/assets",
    "/ta/assets/update",
    "/ta/asset-request",
    "/ta/maintenance",
    "/ta/reports",
    "/ta/reports/upload",
  ],

  DEPARTMENT_HEAD: [
    "/dh/approve-requests",
    "/dh/request-college",
    "/dh/schedule",
    "/dh/report-request",
    "/dh/reports",
    "/dh/department-assets",
  ],

  COLLEGE: [
    "/college/approve-requests",
    "/college/report-request",
    "/college/reports",
  ],

  LAB_COORDINATOR: [
    "/lc/analytics",
    "/lc/reports",
    "/lc/department-report-request",
  ],

  GENERAL_SERVICE: [
    "/gs/services",
    "/gs/services/schedule",
  ],

  ICT: [
    "/ict/services",
    "/ict/services/schedule",
  ],

  GUEST: ["/login"],
};
