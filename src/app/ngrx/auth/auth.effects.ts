import {AuthService} from "../../services/auth/auth.service";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  loadUser, loadUserFailure,
  loadUserSuccess,
  login,
  loginFailure,
  loginSuccess, logout,
  register,
  registerFailure,
  registerSuccess
} from "./auth.actions";
import {catchError, from, map, of, switchMap, tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({payload}) =>
        from(this.authService.login(payload.email, payload.password)).pipe(
          map((data) => {
            this.cookieService.set("accessToken", data.accessToken);
            return loginSuccess({payload: {user: data.user, accessToken: data.accessToken}})
          }),
          tap(() => this.router.navigateByUrl("/")),
          catchError((error) => of(loginFailure(error)))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({payload}) =>
        from(this.authService.register(payload.user)).pipe(
          map((data) => registerSuccess({payload: {user: data.user, accessToken: data.accessToken}})),
          catchError((error) => of(registerFailure(error)))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        this.cookieService.delete("accessToken");
        return this.router.navigateByUrl("/login")
      })
    ),{ dispatch: false }
  )

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(({payload}) =>
        from(this.authService.loadUser(payload.userId)).pipe(
          map((data) => {
            return loadUserSuccess({payload: {user: data}})
          }),
          catchError((error) => of(loadUserFailure(error)))
        )
      )
    )
  );
}
