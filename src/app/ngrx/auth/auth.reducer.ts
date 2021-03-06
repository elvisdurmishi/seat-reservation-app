import {createReducer, on} from "@ngrx/store";
import {
  loadAccessTokenCookie, loadUser, loadUserFailure, loadUserSuccess,
  login,
  loginFailure,
  loginSuccess, logout,
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
  })),
  on(logout, (state) => ({
    ...state,
    user: initialState.user,
    accessToken: initialState.accessToken,
    error: initialState.error,
    status: initialState.status,
  })),
  on(loadUser, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(loadUserSuccess, (state, {payload}) => ({
    ...state,
    user: payload.user,
    error: null,
    status: 'success',
  })),
  on(loadUserFailure, (state) => ({
    ...state,
    error: null,
    status: 'error',
  })),
)
