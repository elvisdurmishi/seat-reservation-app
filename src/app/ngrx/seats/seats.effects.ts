import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {SeatService} from "../../services/seat/seat.service";
import {catchError, from, map, of, switchMap} from "rxjs";
import {loadSeats, loadSeatsFailure, loadSeatsSuccess} from "./seats.actions";

@Injectable()
export class SeatsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private seatService: SeatService,
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSeats),
      switchMap(() =>
        from(this.seatService.loadSeats()).pipe(
          map((data) => {
            return loadSeatsSuccess({payload: {seats: data}})
          }),
          catchError(() => of(loadSeatsFailure()))
        )
      )
    )
  );
}
