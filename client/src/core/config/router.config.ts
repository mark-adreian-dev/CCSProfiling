export const ROUTER_CONFIG = {
  AUTH: {
    BASE: "login",
    URL: "/login",
  },
  PROTECTED: {
    DASHBOARD: {
      BASE: "dashboard",
      URL: "/dashboard",
      ROUTES: {
        QUICK_FIND: {
          BASE: "quick-find",
          URL: "/dashboard/quick-find",
        },
        STUDENT: {
          BASE: "students",
          URL: "/dashboard/student",
          SUB_ROUTES: {},
        },
        FACULTY: {
          BASE: "faculty",
          URL: "/dashboard/faculty",
          SUB_ROUTES: {},
        },
      },
    },
  },
};
