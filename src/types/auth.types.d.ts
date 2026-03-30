interface LoginRequest{
  email:string,
  password:string
}

 interface LoginResponse{
  success: boolean;
  message: string;
  data: AuthUser;
  statusCode: number;
}

interface AuthUser{
  id:string,
  email:string,
  firstName:string,
  lastName:string,
  role:string,
  access_token:string
}

 interface RegisterRequest{
  email:string,
  password:string,
  firstName:string,
  lastName:string,
}

interface RegisterResponse{
  success: boolean;
  message: string;
  data: {
    id:string,
    email:string,
    firstName:string,
    lastName:string,
    role:string,
  };
  statusCode: number;
}

interface LogoutResponse{
  success: boolean;
  message: string;
  statusCode: number;
}

interface CurrentUserResponse{
  success: boolean;
  message: string;
  data: {
    _id:string;
    email:string;
    firstName:string;
    lastName:string;
    role:string;
  };
  statusCode: number;
}