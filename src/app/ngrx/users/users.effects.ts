import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {UsersService} from "../../services/users/users.service";
import {catchError, from, map, of, switchMap} from "rxjs";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./users.actions";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private usersService: UsersService,
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        from(this.usersService.loadUsers()).pipe(
          map((data) => {
            return loadUsersSuccess({payload: {users: data}})
          }),
          catchError(() => of(loadUsersFailure()))
        )
      )
    )
  );
}
