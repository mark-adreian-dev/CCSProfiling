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
        STUDENT: {
          BASE: "student",
          URL: "/dashboard/student",
          ROUTES: {
            QUICK_FIND: {
              BASE: "quick-find",
              URL: "/dashboard/student/quick-find",
            },
          },
        },
        FACULTY: {
          BASE: "faculty",
          URL: "/dashboard/faculty",
          ROUTES: {
            QUICK_FIND: {
              BASE: "quick-find",
              URL: "/dashboard/faculty/quick-find",
            },
          },
        },
      },
    },
  },
};
