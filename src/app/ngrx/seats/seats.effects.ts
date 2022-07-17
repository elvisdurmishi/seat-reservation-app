import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {SeatService} from "../../services/seat/seat.service";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {
  loadSeats,
  loadSeatsFailure,
  loadSeatsSuccess,
  saveSeat,
  saveSeatFailure,
  saveSeatSuccess
} from "./seats.actions";
import {getSeats} from "./seats.selectors";
import {Seat} from "../../model/Seat";

@Injectable()
export class SeatsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private seatService: SeatService,
  ) {}

  loadSeats$ = createEffect(() =>
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

  saveSeat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSeat),
      withLatestFrom(this.store.select(getSeats)),
      switchMap(([{payload}, seats]) =>
        from(this.seatService.saveSeat(payload.seat).pipe(
          map((data) => {
            let changedList = seats ? seats?.map(s => s.id === data.id ? data : s) : [];
            if(!payload.seat.id) {
              changedList = [...changedList, data];
            }
            return saveSeatSuccess({payload: {seats: changedList}});
          }),
          catchError((error) => {
            console.log("error", error);
            return of(saveSeatFailure(error));
          })
        ))
      )
    )
  )
}
