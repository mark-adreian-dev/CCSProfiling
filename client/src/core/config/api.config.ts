const BASE = import.meta.env.VITE_API_URL;
const DOMAIN = import.meta.env.VITE_API_URL_DOMAIN;

export const API_CONFIG = {
  baseApiUrl: BASE,
  baseUrlDomain: DOMAIN,
  baseUrlForImage: `${DOMAIN}/storage`,

  endpoints: {
    AUTH: {
      LOGIN: `/login`,
      LOGOUT: `/auth/logout`,
      USER: `/auth/user`,
      CSRF: `/sanctum/csrf-cookie`,
    },

    USER: {
      FACULTIES: `/user/faculties`,
      STUDENTS: `/user/students`,
    },

    PROGRAMS: `/program/programs`,

    INTEREST: {
      BASE: `/interest/interests`,
      ADD_USER: `/interest/user-interests/add`,
      REMOVE_USER: `/interest/user-interests/remove`,
      CHART_DATA: `/interest/interests/chart`,
      REPORT: `/interest/interests/reports`,
    },

    AFFILIATION: `/affiliation/affiliations`,
    GRADE: `/grade/grades`,
    CURRICULUM: `/grade/curriculum`,
  },
};
