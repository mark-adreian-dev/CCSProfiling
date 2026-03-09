import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthLayout from "@/features/Authentication/layout/AuthLayout";
import { LoginForm } from "@/features/Authentication/components/LoginForm";
import DashboardLayout from "../presentation/layout/DashboardLayout";
import { ROUTER_CONFIG } from "../config/router.config";

export const Router = () => {
  return (
    <Routes>
      {/* Guest Only Routes */}
      <Route element={<AuthRoutes />}>
        <Route path={ROUTER_CONFIG.AUTH.BASE} element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
        </Route>
      </Route>

      {/* Authenticated Only Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.BASE} element={<DashboardLayout />}>

        </Route>
      </Route>

      {/* Public or Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
