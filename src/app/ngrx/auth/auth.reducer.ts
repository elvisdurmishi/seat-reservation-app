import {createReducer, on} from "@ngrx/store";
import {
  loadAccessTokenCookie,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess
} from "./auth.actions";
import {User} from "../../model/User";

export interface AuthState {
  user: User | null,
  accessToken: string | null,
  error: string | null,
  status: 'initial' | 'loading' | 'error' | 'success',
}

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  error: null,
  status: 'initial',
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
  on(loginFailure, (state, {error}) => ({
    ...state,
    error: `The provided data is invalid. ${error}`,
    status: 'error'
  })),
  on(register, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(registerSuccess, (state, {payload}) => ({
    ...state,
    user: payload.user,
    accessToken: payload.accessToken,
    error: null,
    status: 'success',
  })),
  on(registerFailure, (state, {error}) => ({
    ...state,
    error: `The provided data is invalid. ${error}`,
    status: 'error'
  }))
)
