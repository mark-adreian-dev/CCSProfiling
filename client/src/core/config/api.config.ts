export const API_CONFIG = {
  baseApiUrl: import.meta.env.VITE_API_URL,
  baseUrlDomain: import.meta.env.VITE_API_URL_DOMAIN,
  enpoints: {
    AUTH: {
      LOGIN: `/login`,
      LOGOUT: `/auth/logout`,
      USER: `/auth/user`,
      CSRF_TOKEN: `/sanctum/csrf-cookie`,
    },
    USER: {
      FACULTY: {
        GET_ALL: `/user/faculties`,
      },
      STUDENT: {
        GET_ALL: `/user/students`,
      },
    },
  },
};
