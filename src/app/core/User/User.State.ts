import { createEntityAdapter } from '@ngrx/entity';
import { UserModel, Users } from '../Store/Models/User.model';

export const UserAdapter = createEntityAdapter<Users>();

// Set Initial states
export const UserState: UserModel = UserAdapter.getInitialState({
  isDuplicate: false,
  menuList: [],
  roleList: [],
  userInfo: {
    id: 0,
    username: '',
    email: '',
    name: '',
    role: '',
    status: false,
  },
});
