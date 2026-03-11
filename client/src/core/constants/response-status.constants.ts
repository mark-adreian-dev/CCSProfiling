export const RESPONSE_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  UNPROCESSABLE: 422,
  CSRF_TOKEN_MISMATCH: 419,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
} as const;

export type ResponseStatus = (typeof RESPONSE_STATUS)[keyof typeof RESPONSE_STATUS];
