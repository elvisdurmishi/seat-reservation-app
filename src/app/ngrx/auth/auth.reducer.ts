import {createReducer, on} from "@ngrx/store";
import {loadAccessTokenCookie, login, loginFailure, loginSuccess} from "./auth.actions";
import {User} from "../../model/User";

export interface AuthState {
  user: User | null,
  accessToken: string | null,
  error: string | null,
  status: 'loading' | 'error' | 'success',
}

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  error: null,
  status: 'loading',
}

export const authReducer = createReducer(
  initialState,
  on(loadAccessTokenCookie, (state, {payload}) => ({
    ...state,
    accessToken: payload.accessToken
  })),
  on(login, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(loginSuccess, (state, {payload}) => ({
    ...state,
    user: payload.user,
    accessToken: payload.accessToken,
    error: null,
    status: 'success',
  })),
  on(loginFailure, (state) => ({
    ...state,
    error: "There was a problem loading the user.",
    status: 'error'
  }))
)
