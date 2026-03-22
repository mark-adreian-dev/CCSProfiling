export const Sex = {
  MALE: "Male",
  FEMALE: "Female",
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];
