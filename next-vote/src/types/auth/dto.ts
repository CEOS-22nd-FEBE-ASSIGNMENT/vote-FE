export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    userId: number;
    name: string;
    part: 'FRONTEND' | 'BACKEND';
    team: 'MODELLY' | 'DIGGINDIE' | 'CATCHUP' | 'MENUAL' | 'STORIX';
    accessToken: string;
  };
}

export interface ValidateResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    message: string;
    isValid: 'VALID' | 'INVALID';
  };
}

export interface RefreshResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    accessToken: string;
  };
}
