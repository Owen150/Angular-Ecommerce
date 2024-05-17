import { createAction, props } from "@ngrx/store"
import { Menus, RoleAccess, Usercred, Users } from "../Model/User.model"

// User action variables
export const BEGIN_REGISTER = '[auth] begin register'

export const BEGIN_LOGIN='[auth] begin login'

export const DUPLICATE_USER='[user] duplicate user'
export const DUPLICATE_USER_SUCC='[user] duplicate user succ'

export const FETCH_MENU= '[user] fetch menu'
export const FETCH_MENU_SUCC= '[user] fetch menu succ'

// User Actions
export const beginRegister = createAction(BEGIN_REGISTER, props<{userdata: Users}>());

export const beginLogin=createAction(BEGIN_LOGIN,props<{usercred:Usercred}>());

// Checking the username variable for duplicate user registration - username is from the model
export const duplicateUser=createAction(DUPLICATE_USER,props<{username:string}>());
// Once the action is completed/successful, we will get the information that we are going to set in our state.
export const duplicateUserSuccess=createAction(DUPLICATE_USER_SUCC,props<{isDuplicate:boolean}>());

export const fetchMenu=createAction(FETCH_MENU,props<{userrole:string}>());
export const fetchMenuSuccess=createAction(FETCH_MENU_SUCC, props<{menuList:RoleAccess[]}>());