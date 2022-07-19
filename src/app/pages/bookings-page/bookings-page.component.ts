import { Component, OnInit } from '@angular/core';
import {
  getFilteredBookings,
  getSeatBookingError,
  getSeatBookings,
  getSeatBookingStatus
} from "../../ngrx/bookings/bookings.selectors";
import {iif, mergeMap, of} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../ngrx/app.state";

@Component({
  selector: 'app-bookings-page',
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.scss']
})
export class BookingsPageComponent implements OnInit {
  bookings$ = this.store.select(getFilteredBookings).pipe(
    mergeMap((bookings) =>
      iif(() => bookings === null, this.store.select(getSeatBookings), of(bookings)),
    ),
  )
  status$ = this.store.select(getSeatBookingStatus);
  error$ = this.store.select(getSeatBookingError);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
