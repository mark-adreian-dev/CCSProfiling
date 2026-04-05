export const ROUTER_CONFIG = {
  AUTH: {
    BASE: "login",
    URL: "/login",
  },
  PROTECTED: {
    DASHBOARD: {
      ROUTES: {
        ADMIN: {
          BASE: "admin/dashboard",
          QUICK_FIND: {
            BASE: "quick-find",
            URL: "/admin/dashboard/quick-find",
          },
          STUDENTS: {
            BASE: "students",
            URL: "/admin/dashboard/students",
            SUB_ROUTES: {
              PROFILE: {
                BASE: "profile",
                URL: "/admin/dashboard/students/profile",
              },
            },
          },
          FACULTY: {
            BASE: "faculty",
            URL: "/admin/dashboard/faculty",
            SUB_ROUTES: {
              PROFILE: {
                BASE: "profile",
                URL: "/admin/dashboard/faculty/profile",
              },
            },
          },
          INTEREST: {
            BASE: "interests",
            URL: "/admin/dashboard/interests",
            SUB_ROUTES: {},
          },
          CURRICULUM: {
            BASE: "curriculum",
            URL: "/admin/dashboard/curriculum",
            SUB_ROUTES: {},
          },
        },
        STUDENT: {
          BASE: "student/dashboard",
          QUICK_FIND: {
            BASE: "quick-find",
            URL: "/student/dashboard/quick-find",
          },
          PROFILE: {
            BASE: "profile",
            URL: "/student/dashboard/profile",
          },
        },
      },
    },
  },
};
