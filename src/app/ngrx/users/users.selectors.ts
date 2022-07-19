import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {UsersState} from "./users.reducer";

export const selectUsers = (state: AppState) => state.users;
export const getUsers = createSelector(
  selectUsers,
  (state: UsersState) => state.users
)
