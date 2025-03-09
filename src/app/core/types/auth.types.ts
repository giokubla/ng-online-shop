export interface SignUpDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
}

