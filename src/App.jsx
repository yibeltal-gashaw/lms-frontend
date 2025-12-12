import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { DashboardHome } from "@/pages/DashBoardHome";
import { ServiceRequests } from "@/pages/ServiceRequests";
import { Reports } from "@/pages/Reports";
import { Schedule } from "@/pages/Schedule";
import { LabAssets } from "@/pages/LabAssets";
import { Analytics } from "@/pages/Analytics";
import NotFound from "@/pages/NotFound";
import { Users } from "@/pages/Users";
import { Login } from "@/pages/Login";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Settings from "@/pages/Settings";
import { Approvals } from "@/pages/Approval";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Protected Route wrapper */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardHome />} />
          <Route path="assets" element={<LabAssets />} />
          <Route path="services" element={<ServiceRequests />} />
          <Route path="reports" element={<Reports />} />
          <Route path="schedule" element={<Schedule />} />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "admin",
                  "department_head",
                  "technical_assistant",
                ]}
              >
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/approvals"
            element={
              <ProtectedRoute
                allowedRoles={["department_head", "college_dean"]}
              >
                <Approvals />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Forbidden */}
        <Route path="/403" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
