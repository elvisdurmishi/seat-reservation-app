import {createAction, props} from "@ngrx/store";
import {User} from "../../model/User";

export const loadAccessTokenCookie = createAction(
  "[Auth] Load Access Token Cookie",
  props<{payload: {accessToken: string }}>()
)

export const login = createAction(
  "[Auth] Login",
  props<{ payload: { email: string, password: string } }>()
);

export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{ payload: { user: User, accessToken: string } }>()
)

export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ error: string }>()
)

export const register = createAction(
  "[Auth] Register",
  props<{
    payload: {
      user: User
    }
  }>()
)

export const registerSuccess = createAction(
  "[Auth] Register Success",
  props<{ payload: { user: User, accessToken: string } }>()
)

export const registerFailure = createAction(
  "[Auth] Register Failure",
  props<{ error: string }>()
)

export const logout = createAction(
  "[Auth] Logout"
)

export const loadUser = createAction(
  "[Auth] Load User",
  props<{payload: { userId: string }}>()
)

export const loadUserSuccess = createAction(
  "[Auth] Load User Success",
  props<{ payload: { user: User } }>()
)

export const loadUserFailure = createAction(
  "[Auth] Load User Failure",
  props<{ error: string }>()
)
