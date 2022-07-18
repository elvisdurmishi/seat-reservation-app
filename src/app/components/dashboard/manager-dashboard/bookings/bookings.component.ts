import { Component, OnInit } from '@angular/core';
import {Booking} from "../../../../model/Booking";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../ngrx/app.state";
import {getSeatBookingError, getSeatBookings, getSeatBookingStatus} from "../../../../ngrx/seats/seats.selectors";
import {ActivatedRoute} from "@angular/router";
import {loadSeatBookings} from "../../../../ngrx/seats/seats.actions";
import {openBookingModal} from "../../../../ngrx/modals/modals.actions";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings$ = this.store.select(getSeatBookings);
  status$ = this.store.select(getSeatBookingStatus);
  error$ = this.store.select(getSeatBookingError);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) {
    let params = route.snapshot.params;
    this.store.dispatch(loadSeatBookings({payload: {seatId: params['id']}}));
  }

  ngOnInit(): void {
  }

  openBookingModal() {
    this.store.dispatch(openBookingModal({payload: {booking: null}}));
  }

  editBooking(booking: Booking) {
    console.log("booking", booking);
  }

  deleteBooking(booking: Booking) {
    console.log("booking", booking);
  }

  parseDate(date: any) {
    return date.day + '-' + date.month + '-' + date.year;
  }
}
