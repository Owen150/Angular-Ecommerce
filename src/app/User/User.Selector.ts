import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../Model/User.model";
import { UserAdapter } from "./User.state";

// Selectors are pure functions used to select, derive, and compose pieces of a state
const getUserState = createFeatureSelector<UserModel>('user');

const userSelector = UserAdapter.getSelectors();

export const isDuplicateUser = createSelector(getUserState, (state) => state.isDuplicate);

export const getMenuByRole = createSelector(getUserState, (state) => state.menuList);

export const getUsersList = createSelector(getUserState, userSelector.selectAll);

export const getRolesList = createSelector(getUserState, (state) => state.roleList);

export const getUserByCode = createSelector(getUserState, (state) => state.userInfo);