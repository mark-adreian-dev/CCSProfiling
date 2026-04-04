import { lazy, Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { ROUTER_CONFIG } from "../config/router.config";

// Keep route guards and config sync as they are small and critical for logic
import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";
import LoadingSpinner from "../presentation/components/custom/Loader/LoadingSpinner";
import FacultyPage from "@/features/Admin/Faculty/pages/FacultyPage";
import StudentsPage from "@/features/Admin/Students/pages/StudentsPage";
import InterestPage from "@/features/Admin/Interest/pages/InterestPage";
import StudentLayout from "../presentation/layout/StudentLayout";
import StudentProfilePage from "@/features/Student/StudentProfile/pages/StudentProfilePage";
import StudentDetailsPage from "@/features/Admin/Students/pages/StudentDetailsPage";
import FacultyDetailsPage from "@/features/Admin/Faculty/pages/FacultyDetailsPage";

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
          <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.BASE} element={<AdminLayout />}>
            {/* ADMIN SECTION */}
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.QUICK_FIND.BASE} element={<>Quick Find</>} />
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.FACULTY.BASE}>
              <Route index element={<FacultyPage />} />
              <Route
                path={`${ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.FACULTY.SUB_ROUTES.PROFILE.BASE}/:id`}
                element={<FacultyDetailsPage />}
              />
            </Route>
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.STUDENTS.BASE}>
              <Route index element={<StudentsPage />} />
              <Route
                path={`${ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.STUDENTS.SUB_ROUTES.PROFILE.BASE}/:id`}
                element={<StudentDetailsPage />}
              />
            </Route>
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.INTEREST.BASE} element={<InterestPage />} />
          </Route>
          <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.BASE} element={<StudentLayout />}>
            {/* Student SECTION */}
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.QUICK_FIND.BASE} element={<>Quick Find</>} />
            <Route path={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.PROFILE.BASE} element={<StudentProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
