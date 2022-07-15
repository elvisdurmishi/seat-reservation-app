import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducer";

export const selectAuth = (state: AppState) => state.auth;
export const getAuth = createSelector(
  selectAuth,
  (state: AuthState) => state
)
export const getUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
export const getAuthStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.status
);
export const getAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);
