export const Role = {
  STUDENT: "student",
  DEAN: "dean",
  CHAIR: "chair",
  FACULTY: "faculty",
  ADMIN: "admin",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
