import {AuthService} from "../../services/auth/auth.service";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {login, loginFailure, loginSuccess, register, registerFailure, registerSuccess} from "./auth.actions";
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
}
