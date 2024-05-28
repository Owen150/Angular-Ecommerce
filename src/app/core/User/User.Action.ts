import { createAction, props } from "@ngrx/store"
import { Menus, RoleAccess, Roles, Usercred, Userinfo, Users } from "../Store/Models/User.model"

// User action variables
export const BEGIN_REGISTER = '[auth] begin register'
export const BEGIN_LOGIN ='[auth] begin login'

export const DUPLICATE_USER ='[user] duplicate user'
export const DUPLICATE_USER_SUCC ='[user] duplicate user succ'

export const FETCH_MENU = '[user] fetch menu'
export const FETCH_MENU_SUCC  = '[user] fetch menu succ'

export const GET_USERS = '[user] get users'
export const GET_USERS_SUCC = '[user] get users succ'

export const GET_ROLES='[role] get roles'
export const GET_ROLE_SUCC='[role] get role succ'

export const GET_USERBYCODE='[user] get userbycode'
export const GET_USERBYCODE_SUCC='[user] get userbycode succ'

export const UPDATE_ROLE='[user] update role'


// User Actions
export const beginRegister = createAction(BEGIN_REGISTER, props<{userdata: Users}>());
export const beginLogin=createAction(BEGIN_LOGIN,props<{usercred:Usercred}>());

// Checking the username variable for duplicate user registration - username is from the model
export const duplicateUser=createAction(DUPLICATE_USER,props<{username:string}>());
// Once the action is completed/successful, we will get the information that we are going to set in our state.
export const duplicateUserSuccess=createAction(DUPLICATE_USER_SUCC,props<{isDuplicate:boolean}>());

export const fetchMenu=createAction(FETCH_MENU,props<{userrole:string}>());
export const fetchMenuSuccess=createAction(FETCH_MENU_SUCC, props<{menuList:RoleAccess[]}>());

export const getUsers = createAction(GET_USERS);
export const getUserSuccess = createAction(GET_USERS_SUCC, props<{userlist: Users[]}>());

export const getRoles=createAction(GET_ROLES);
export const getRoleSuccess=createAction(GET_ROLE_SUCC,props<{roleList:Roles[]}>());

export const getuserbycode=createAction(GET_USERBYCODE,props<{username:string}>())
export const getUserByCodeSuccess=createAction(GET_USERBYCODE_SUCC,props<{userInfo:Userinfo}>());

export const updateuserrole=createAction(UPDATE_ROLE,props<{userRole:string,userId:number}>());