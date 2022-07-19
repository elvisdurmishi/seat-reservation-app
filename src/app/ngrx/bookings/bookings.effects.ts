import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {
  bookSeat,
  bookSeatFailure,
  bookSeatSuccess,
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
import {getSeatBookings} from "./bookings.selectors";
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
      withLatestFrom(this.store.select(getSeatBookings)),
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
        from(this.bookingService.deleteBooking(payload.bookingId).pipe(
          map(() => {
            loadBookings();
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
