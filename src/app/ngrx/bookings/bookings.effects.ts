import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {
  bookSeat,
  bookSeatFailure,
  bookSeatSuccess,
  loadBookings,
  loadBookingsFailure,
  loadBookingsSuccess
} from "./bookings.actions";
import {BookingService} from "../../services/booking/booking.service";
import {getBookings} from "./bookings.selectors";

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

  bookSeat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookSeat),
      withLatestFrom(this.store.select(getBookings)),
      switchMap(([{payload}, bookings]) =>
        from(this.bookingService.bookSeat(payload.booking).pipe(
          map((data) => {
            let changedList = bookings ? bookings : [];
            if(!payload.booking.id) {
              changedList = [...changedList, data];
            } else {
              changedList = bookings ? bookings?.map(b => b.id === data.id ? data : b) : [];
            }

            return bookSeatSuccess({payload: {bookings: changedList}});
          }),
          catchError((error) => {
            return of(bookSeatFailure(error));
          })
        ))
      )
    )
  )
}
