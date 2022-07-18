import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {SeatService} from "../../services/seat/seat.service";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import {
  deleteSeat,
  deleteSeatFailure,
  deleteSeatSuccess,
  loadFilteredSeats,
  loadFilteredSeatsFailure,
  loadFilteredSeatsSuccess, loadSeatBookings, loadSeatBookingsFailure, loadSeatBookingsSuccess,
  loadSeats,
  loadSeatsFailure,
  loadSeatsSuccess,
  saveSeat,
  saveSeatFailure,
  saveSeatSuccess
} from "./seats.actions";
import {getSeats} from "./seats.selectors";
import {BookingService} from "../../services/booking/booking.service";
import {getBookings} from "../bookings/bookings.selectors";
import {DateRange} from "../../model/DateRange";

@Injectable()
export class SeatsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private seatService: SeatService,
    private bookingService: BookingService,
  ) {}

  loadSeats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSeats),
      switchMap(() =>
        from(this.seatService.loadSeats()).pipe(
          switchMap((seats) =>
            from(this.store.select(getBookings)).pipe(
              map((bookings) => {
                let newSeatsList = seats ? [...seats] : [];
                newSeatsList = newSeatsList.map((seat) =>
                  bookings?.some((booking) => booking.seatId === seat.id && this.inReservedDateRange(booking.date))
                    ? {...seat, status: 'busy'}
                    : {...seat, status: 'free'})
                return newSeatsList
              }),
            )
          ),
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
            let changedList = seats ? seats : [];
            if(!payload.seat.id) {
              changedList = [...changedList, data];
            } else {
              changedList = seats ? seats?.map(s => s.id === data.id ? data : s) : [];
            }

            return saveSeatSuccess({payload: {seats: changedList}});
          }),
          catchError((error) => {
            return of(saveSeatFailure(error));
          })
        ))
      )
    )
  )

  deleteSeat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSeat),
      withLatestFrom(this.store.select(getSeats)),
      switchMap(([{payload}, seats]) =>
        from(this.seatService.deleteSeat(payload.seatId).pipe(
          map(() => {
            let changedList = seats ? seats?.filter(s => s.id !== payload.seatId) : [];
            return deleteSeatSuccess({payload: {seats: changedList}});
          }),
          catchError((error) => {
            return of(deleteSeatFailure(error));
          })
        ))
      )
    )
  )

  filterSeats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredSeats),
      switchMap(({payload}) =>
        from(this.seatService.loadFilteredSeats(payload.filters)).pipe(
          switchMap((seats) =>
            from(this.store.select(getBookings)).pipe(
              map((bookings) => {
                let newSeatsList = seats ? [...seats] : [];
                newSeatsList = newSeatsList.map((seat) =>
                  bookings?.some((booking) => booking.seatId === seat.id && this.inReservedDateRange(booking.date))
                    ? {...seat, status: 'busy'}
                    : {...seat, status: 'free'})
                return payload.filters.status !== 'all'
                  ? newSeatsList.filter((seat) => seat.status === payload.filters.status)
                  : newSeatsList
              }),
            )
          ),
          map((data) => {
            return loadFilteredSeatsSuccess({payload: {seats: data}})
          }),
          catchError(() => of(loadFilteredSeatsFailure()))
        )
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

  inReservedDateRange(date: DateRange) {
    let today = new Date();
    const {from, to} = date;

    let fromDate = new Date(from.year, from.month - 1, from.day);
    let toDate   = new Date(to.year, to.month - 1, to.day);

    return today > fromDate && today < toDate;
  }
}
