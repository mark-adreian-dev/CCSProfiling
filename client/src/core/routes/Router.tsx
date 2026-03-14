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
const DashboardLayout = lazy(() => import("../presentation/layout/DashboardLayout").then((module) => ({ default: module.DashboardLayout })));
const FacultyLayout = lazy(() => import("../presentation/layout/FacultyLayout"));
const StudentLayout = lazy(() => import("../presentation/layout/StudentLayout"));

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
          <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.BASE} element={<DashboardLayout />}>
            {/* FACULTY SECTION */}
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.FACULTY.BASE} element={<FacultyLayout />}>
              <Route index element={<Navigate to={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.FACULTY.ROUTES.QUICK_FIND.BASE} replace />} />
              <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.FACULTY.ROUTES.QUICK_FIND.BASE} element={<FacultyPage />} />
            </Route>

            {/* STUDENT SECTION */}
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.BASE} element={<StudentLayout />}>
              <Route index element={<Navigate to={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.ROUTES.QUICK_FIND.BASE} replace />} />
              <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.ROUTES.QUICK_FIND.BASE} element={<>Student</>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
