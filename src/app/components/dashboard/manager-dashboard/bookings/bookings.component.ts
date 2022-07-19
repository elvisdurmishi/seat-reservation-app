import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../../model/Booking";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../ngrx/app.state";
import {getSeatBookingError, getSeatBookings, getSeatBookingStatus} from "../../../../ngrx/seats/seats.selectors";
import {ActivatedRoute} from "@angular/router";
import {loadSeatBookings} from "../../../../ngrx/seats/seats.actions";
import {openBookingModal} from "../../../../ngrx/modals/modals.actions";
import {deleteBooking} from "../../../../ngrx/bookings/bookings.actions";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings$ = this.store.select(getSeatBookings);
  status$ = this.store.select(getSeatBookingStatus);
  error$ = this.store.select(getSeatBookingError);
  seatId: number;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {
    this.seatId = route.snapshot.params['id'];
    this.store.dispatch(loadSeatBookings({payload: {seatId: this.seatId}}));
  }

  ngOnInit(): void {
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
}
