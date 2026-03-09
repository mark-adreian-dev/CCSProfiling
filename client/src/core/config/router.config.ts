export const ROUTER_CONFIG = {
  AUTH: {
    BASE: "/login",
    URL:"/login"
  },
  PROTECTED: {
    DASHBOARD: {
      BASE: "/dashboard",
      URL: "/dashboard",
      ROUTES: {
        EVENTS: {
          BASE: "/events",
          URL: "/dashboard/events",
        }
      },
    },
  },
};