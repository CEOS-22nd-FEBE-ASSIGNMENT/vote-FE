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
    team: 'MODELLY' | 'DIGGINDIE' | 'CATCHUP' | 'GROOMEASY' | 'STORIX';
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

export interface SignupRequest {
  loginId: string;
  password: string;
  email: string;
  part: 'FRONTEND' | 'BACKEND';
  name: string;
  team: 'MODELLY' | 'DIGGINDIE' | 'CATCHUP' | 'GROOMEASY' | 'STORIX';
}

export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    loginId: string;
    name: string;
  };
}

export interface CheckAvailableResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    field: string;
    value: string;
    available: boolean;
  };
}

export interface SignupRequest {
  loginId: string;
  password: string;
  email: string;
  part: 'FRONTEND' | 'BACKEND';
  name: string;
  team: 'MODELLY' | 'DIGGINDIE' | 'CATCHUP' | 'GROOMEASY' | 'STORIX';
}

export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    loginId: string;
    name: string;
  };
}

export interface CheckAvailableResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    field: string;
    value: string;
    available: boolean;
  };
}
