import { createReducer, on } from '@ngrx/store';
import { UserAdapter, UserState } from './User.state';
import { duplicateUserSuccess, fetchMenuSuccess, getRoleSuccess, getUserSuccess } from './User.action';

// Reducers are pure functions that handle state changes. 
// They take the current state i.e UserState, and the latest action i.e on duplicateUserSuccess/fetchMenuSuccess, to compute a new state.
const _userReducer = createReducer(
  // Current State - UserState
  UserState,
  // Latest Action - duplicateUserSuccess
  on(duplicateUserSuccess, (state, action) => {
    // Returns a New State
    return { ...state, isDuplicate: action.isDuplicate };
  }),
  on(fetchMenuSuccess, (state, action) => {
    return { ...state, menuList: action.menuList };
  }),
  on(getUserSuccess, (state, action) => {
    return UserAdapter.setAll(action.userlist, state);
  }),
  on(getRoleSuccess, (state, action) => {
    return { ...state, roleList: action.roleList };
  })
);

export function UserReducer(state: any, action: any) {
  return _userReducer(state, action);
}
