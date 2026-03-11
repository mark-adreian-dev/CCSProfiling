import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTER_CONFIG } from "../config/router.config";
import { Role } from "../enums/roles.enums";
import { useGetUserQuery } from "../hooks/auth.hooks";

export default function ProtectedRoutes() {
  const { data: user } = useGetUserQuery();
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      if (user.role === Role.STUDENT) {
        navigate(ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.ROUTES.QUICK_FIND.URL);
      } else {
        navigate(ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.FACULTY.ROUTES.QUICK_FIND.URL);
      } 
    }
    else {
      navigate(ROUTER_CONFIG.AUTH.URL);
    }
  }, [navigate, user])

  return <Outlet />;
}
