import {User} from "../../model/User";
import {createReducer, on} from "@ngrx/store";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./users.actions";

export interface UsersState {
  users: User[] | null,
  error: string | null,
  status: 'initial' | 'loading' | 'error' | 'success',
}

export const initialState: UsersState = {
  users: null,
  error: null,
  status: 'initial',
}

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(loadUsersSuccess, (state, {payload}) => ({
    ...state,
    users: payload.users,
    error: null,
    status: 'success',
  })),
  on(loadUsersFailure, (state) => ({
    ...state,
    error: `There was an error loading the data.`,
    status: 'error'
  })),
)
