export const AcademicYear = {
  FIRST_YEAR: 1,
  SECOND_YEAR: 2,
  THIRD_YEAR: 3,
  FOURTH_YEAR: 4,
  FIFTH_YEAR: 5,
} as const;

export type AcademicStatus = (typeof AcademicYear)[keyof typeof AcademicYear];
