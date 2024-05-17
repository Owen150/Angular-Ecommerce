import { createReducer, on } from '@ngrx/store';
import { UserState } from './User.state';
import { duplicateUserSuccess, fetchMenuSuccess } from './User.action';

// Reducers are pure functions that handle state changes. 
// They take the current state i.e UserState, and the latest action i.e on duplicateUserSuccess/fetchMenuSuccess, to compute a new state.
const _userReducer = createReducer(
  UserState,
  on(duplicateUserSuccess, (state, action) => {
    return { ...state, isDuplicate: action.isDuplicate };
  }),
  on(fetchMenuSuccess, (state, action) => {
    return { ...state, menuList: action.menuList };
  })
);

export function UserReducer(state: any, action: any) {
  return _userReducer(state, action);
}
