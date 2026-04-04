export const AcademicStatus = {
  REGULAR: "Regular",
  IRREGULAR: "Irregular",
} as const;

export type AcademicStatus = (typeof AcademicStatus)[keyof typeof AcademicStatus];
