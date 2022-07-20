import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../model/Booking";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {openBookingModal} from "../../../ngrx/modals/modals.actions";
import {deleteBooking} from "../../../ngrx/bookings/bookings.actions";

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss']
})
export class BookingsTableComponent implements OnInit {
  @Input() bookings!: Booking[] | null;
  @Input() status$: any;
  @Input() error$: any;
  @Input() seatId?: number;
  @Input() inProfile?: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  editBooking(booking: Booking) {
    if(this.inProfile) {
      return;
    }
    this.store.dispatch(openBookingModal({payload: {booking: booking, seatId: booking.seatId}}))
  }

  deleteBooking(booking: Booking) {
    this.store.dispatch(deleteBooking({payload: {booking: booking}}))
  }
}
