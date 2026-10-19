// Represents the credentials entered on the login form.
export interface User {
  email: string;
  password: string;
}

// Represents the JWT returned by the authentication API.
export interface AuthResponse {
  token: string;
}

// Represents the user information stored inside the JWT.
export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  exp: number;
}
