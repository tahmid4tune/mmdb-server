export interface JwtPayload {
  email: string;
  id: number;
  iat: number;
  sub: string;
  exp: number;
}

export interface JwtValidationResponse {
  email: string;
  userId: number;
}
