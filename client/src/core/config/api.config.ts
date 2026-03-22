export const API_CONFIG = {
  baseApiUrl: import.meta.env.VITE_API_URL,
  baseUrlDomain: import.meta.env.VITE_API_URL_DOMAIN,
  baseUrlForImage: `${import.meta.env.VITE_API_URL_DOMAIN}/storage/`,
  enpoints: {
    AUTH: {
      LOGIN: `/login`,
      LOGOUT: `/auth/logout`,
      USER: `/auth/user`,
      CSRF_TOKEN: `/sanctum/csrf-cookie`,
    },
    USER: {
      FACULTY: {
        GET: `/user/faculties`,
        ADD: `/user/faculties`,
      },
      STUDENT: {
        GET: `/user/students`,
        ADD: `/user/students`,
      },
    },
  },
};
