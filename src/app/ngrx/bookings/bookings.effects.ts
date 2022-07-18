import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {catchError, from, map, of, switchMap} from "rxjs";
import {loadBookings, loadBookingsFailure, loadBookingsSuccess} from "./bookings.actions";
import {BookingService} from "../../services/booking/booking.service";

@Injectable()
export class BookingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private bookingService: BookingService,
  ) {
  }

  loadBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBookings),
      switchMap(() =>
        from(this.bookingService.loadBookings()).pipe(
          map((data) => {
            return loadBookingsSuccess({payload: {bookings: data}})
          }),
          catchError(() => of(loadBookingsFailure()))
        )
      )
    )
  );
}
