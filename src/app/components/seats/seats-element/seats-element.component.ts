import {Component, Input, OnInit} from '@angular/core';
import {Seat} from "../../../model/Seat";
import {faChair} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {getSeatBookings} from "../../../ngrx/bookings/bookings.selectors";
import {clearBookingsList, loadSeatBookings} from "../../../ngrx/bookings/bookings.actions";
import {DateRange} from "../../../model/DateRange";

@Component({
  selector: 'span [app-seats-element]',
  templateUrl: './seats-element.component.html',
  styleUrls: ['./seats-element.component.scss']
})
export class SeatsElementComponent implements OnInit {
  @Input() seat!: Seat;
  seatBookings$ = this.store.select(getSeatBookings);
  faChair = faChair;
  timeout: any;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {}

  getSeatBookings() {
    if(this.seat.status === 'free') {
      this.store.dispatch(clearBookingsList());
      return;
    }

    if(this.timeout) {
      clearTimeout(this.timeout);
    }


    this.timeout = setTimeout(() => {
      this.store.dispatch(loadSeatBookings({payload: {seatId: this.seat.id}}))
    }, 100)
  }

  clearSeatBookings() {
    this.store.dispatch(clearBookingsList());
  }

  isActualBooking(date: DateRange) {
    let today = new Date();
    const {from, to} = date;

    let fromDate = new Date(from.year, from.month - 1, from.day);
    let toDate   = new Date(to.year, to.month - 1, to.day);

    return today > fromDate && today < toDate;
  }
}
