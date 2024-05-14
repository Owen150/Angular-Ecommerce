import { EntityState } from '@ngrx/entity';

// Signup 
export interface Users {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  status: boolean;
}

// Login
export interface Usercred {
  username: string;
  password: string;
}

// Get or Display user info on login
export interface Userinfo {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

// Check for duplicate user registration
export interface UserModel extends EntityState<Users> {
  isDuplicate: boolean;
}
