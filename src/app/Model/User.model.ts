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

// Roles
export interface Roles{
  code: string,
  name: string
}

// Menus
export interface Menus{
  code: string,
  name: string
}

// Role Access
export interface RoleAccess{
  role: string,
  menu: string
}

// Initialize State Properties
// The UserModel will contain the defined States
export interface UserModel extends EntityState<Users> {
  isDuplicate: boolean;
  menuList: RoleAccess[]
}
