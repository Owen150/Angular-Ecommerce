import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../Model/User.model";

// Selectors are pure functions used to select, derive, and compose pieces of a state
const getUserState = createFeatureSelector<UserModel>('user');

export const isDuplicateUser = createSelector(getUserState, (state) => state.isDuplicate);
export const getMenuByRole = createSelector(getUserState, (state) => state.menuList);