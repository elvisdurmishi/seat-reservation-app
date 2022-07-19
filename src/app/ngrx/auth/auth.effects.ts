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
import {catchError, from, map, of, switchMap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {loadSeats} from "../seats/seats.actions";
import {User} from "../../model/User";
import {loadUsers} from "../users/users.actions";
import {loadMySeatBookings} from "../bookings/bookings.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  dispatchAlternativeActions(user: User) {
    this.store.dispatch(loadSeats());
    this.store.dispatch(loadMySeatBookings({payload: {userId: user?.id}}));
    if(user.role === 'manager') {
      this.store.dispatch(loadUsers());
    }
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({payload}) =>
        from(this.authService.login(payload.email, payload.password)).pipe(
          map((data) => {
            this.cookieService.set("accessToken", data.accessToken);
            return loginSuccess({payload: {user: data.user, accessToken: data.accessToken}});
          }),
          catchError((error) => {
            return of(loginFailure(error));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      switchMap(({payload}) => {
        this.dispatchAlternativeActions(payload.user);
        return this.router.navigate(['/']);
      })
    ), { dispatch: false }
  )

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginFailure),
      switchMap(() => {
        this.cookieService.delete("accessToken");
        return this.router.navigate(['/login'])
      })
    ), { dispatch: false }
  )

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
        return this.router.navigate(['/login'])
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
          catchError((error) => {
            return of(loadUserFailure(error));
          })
        )
      )
    )
  );

  loadUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserSuccess),
      switchMap(({payload}) => {
        this.dispatchAlternativeActions(payload.user);
        return this.router.navigate(['/']);
      })
    ), { dispatch: false }
  )

  loadUserError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserFailure),
      switchMap(() => {
        this.cookieService.delete("accessToken");
        return this.router.navigate(["/login"]);
      })
    ), { dispatch: false }
  )
}
