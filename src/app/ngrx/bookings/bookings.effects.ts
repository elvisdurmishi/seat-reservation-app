import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {
  bookSeat,
  bookSeatFailure,
  deleteBooking,
  deleteBookingFailure,
  loadBookings,
  loadBookingsFailure,
  loadBookingsSuccess,
  loadFilteredBookings,
  loadFilteredBookingsFailure,
  loadFilteredBookingsSuccess,
  loadMyFilteredBookings, loadMyFilteredBookingsFailure, loadMyFilteredBookingsSuccess,
  loadMySeatBookings,
  loadMySeatBookingsFailure,
  loadMySeatBookingsSuccess,
  loadSeatBookings,
  loadSeatBookingsFailure,
  loadSeatBookingsSuccess
} from "./bookings.actions";
import {BookingService} from "../../services/booking/booking.service";
import {getUser} from "../auth/auth.selectors";

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
      switchMap(({payload}) =>
        from(this.bookingService.bookSeat(payload.booking).pipe(
          map(() => {
            this.store.dispatch(loadSeatBookings({payload: {seatId: payload.booking.seatId}}));
            return loadBookings();
          }),
          catchError((error) => {
            return of(bookSeatFailure(error));
          })
        ))
      )
    )
  )

  seatBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSeatBookings),
      switchMap(({payload}) =>
        from(this.bookingService.loadSeatBookings(payload.seatId)).pipe(
          map((data) => {
            return loadSeatBookingsSuccess({payload: {bookings: data}})
          }),
          catchError((error) => of(loadSeatBookingsFailure(error)))
        )
      )
    )
  )

  deleteBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBooking),
      withLatestFrom(this.store.select(getUser)),
      switchMap(([{payload}, user]) =>
        from(this.bookingService.deleteBooking(payload.booking.id).pipe(
          map(() => {
            this.store.dispatch(loadBookings());
            this.store.dispatch(loadSeatBookings({payload: {seatId: payload.booking.seatId}}));
            return loadMySeatBookings({payload: {userId: user?.id}});
          }),
          catchError((error) => {
            return of(deleteBookingFailure(error));
          })
        ))
      )
    )
  )

  filterBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredBookings),
      switchMap(({payload}) =>
        from(this.bookingService.loadFilteredBookings(payload.seatId, payload.filters)).pipe(
          map((data) => {
            return loadFilteredBookingsSuccess({payload: {bookings: data}})
          }),
          catchError(() => of(loadFilteredBookingsFailure()))
        )
      )
    )
  );

  mySeatBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMySeatBookings),
      switchMap(({payload}) =>
        from(this.bookingService.loadMySeatBookings(payload.userId)).pipe(
          map((data) => {
            return loadMySeatBookingsSuccess({payload: {bookings: data}})
          }),
          catchError(() => of(loadMySeatBookingsFailure))
        )
      )
    )
  )

  myFilteredBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMyFilteredBookings),
      switchMap(({payload}) =>
        from(this.bookingService.loadMyFilteredBookings(payload.userId, payload.filters)).pipe(
          map((data) => {
            return loadMyFilteredBookingsSuccess({payload: {bookings: data}})
          }),
          catchError(() => of(loadMyFilteredBookingsFailure()))
        )
      )
    )
  );
}
