import { lazy, Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { ROUTER_CONFIG } from "../config/router.config";

// Keep route guards and config sync as they are small and critical for logic
import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";
import LoadingSpinner from "../presentation/components/custom/Loader/LoadingSpinner";
import FacultyPage from "@/features/Faculty/pages/FacultyPage";

// Lazy Loaded Layouts and Components
const AuthLayout = lazy(() => import("@/features/Authentication/layout/AuthLayout"));
const LoginForm = lazy(() => import("@/features/Authentication/components/LoginForm").then((module) => ({ default: module.LoginForm })));
const AdminLayout = lazy(() => import("../presentation/layout/AdminLayout"));

export const Router = () => {
  return (
    /* Suspense provides a fallback UI while the lazy components are being fetched */
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        {/* Guest Only Routes */}
        <Route element={<AuthRoutes />}>
          <Route path={ROUTER_CONFIG.AUTH.BASE} element={<AuthLayout />}>
            <Route index element={<LoginForm />} />
          </Route>
        </Route>

        {/* Authenticated Only Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.BASE} element={<AdminLayout />}>
            {/* ADMIN SECTION */}
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.FACULTY.BASE} element={<FacultyPage />} />
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.BASE} element={<FacultyPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
