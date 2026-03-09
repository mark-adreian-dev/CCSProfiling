export const Sex = {
  MALE: "Male",
  FEMALE: "FEMALE",
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];
