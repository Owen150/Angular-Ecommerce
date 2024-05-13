import { createReducer, on } from '@ngrx/store';
import { UserState } from './User.state';
import { duplicateUserSuccess } from './User.action';

// Reducers are pure functions that handle state changes. 
// They take the current state and the latest action to compute a new state.

const _userReducer = createReducer(
  UserState,
  on(duplicateUserSuccess, (state, action) => {
    return { ...state, isDuplicate: action.isDuplicate };
  })
);

export function UserReducer(state: any, action: any) {
  return _userReducer(state, action);
}
