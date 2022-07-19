import {Component, OnDestroy, OnInit} from '@angular/core';
import {Booking} from "../../../../model/Booking";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../ngrx/app.state";
import {ActivatedRoute} from "@angular/router";
import {openBookingModal} from "../../../../ngrx/modals/modals.actions";
import {
  clearBookingsList, clearFilterBookingsResults,
  deleteBooking,
  loadFilteredBookings,
  loadSeatBookings
} from "../../../../ngrx/bookings/bookings.actions";
import {
  getFilteredBookings,
  getSeatBookingError,
  getSeatBookings,
  getSeatBookingStatus
} from "../../../../ngrx/bookings/bookings.selectors";
import {iif, mergeMap, of} from "rxjs";
import {DateRange} from "../../../../model/DateRange";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit, OnDestroy {
  bookings$ = this.store.select(getFilteredBookings).pipe(
    mergeMap((bookings) =>
      iif(() => bookings === null, this.store.select(getSeatBookings), of(bookings)),
    ),
  )
  status$ = this.store.select(getSeatBookingStatus);
  error$ = this.store.select(getSeatBookingError);
  seatId: number;
  fromDate: any | null = null;
  toDate: any | null = null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {
    this.seatId = route.snapshot.params['id'];
    this.store.dispatch(loadSeatBookings({payload: {seatId: this.seatId}}));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBookingsList());
  }

  openBookingModal() {
    this.store.dispatch(openBookingModal({payload: {booking: null, seatId: this.seatId}}));
  }

  editBooking(booking: Booking) {
    this.store.dispatch(openBookingModal({payload: {booking: booking, seatId: this.seatId}}))
  }

  deleteBooking(booking: Booking) {
    this.store.dispatch(deleteBooking({payload: {bookingId: booking.id}}))
  }

  parseDate(date: any) {
    return date.day + '-' + date.month + '-' + date.year;
  }

  onDateSelection(dateRange: DateRange) {
    this.fromDate = dateRange.from;
    this.toDate = dateRange.to;
    this.store.dispatch(loadFilteredBookings({payload: {seatId: this.seatId, filters: dateRange}}))
  }

  clearFilters() {
    this.fromDate = null;
    this.toDate = null;
    this.store.dispatch(clearFilterBookingsResults());
  }
}
