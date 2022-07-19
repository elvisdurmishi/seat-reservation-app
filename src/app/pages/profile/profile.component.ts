import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../ngrx/app.state";
import {getUser} from "../../ngrx/auth/auth.selectors";
import {
  getMyFilteredBookings, getMySeatBookingError,
  getMySeatBookings, getMySeatBookingStatus,
} from "../../ngrx/bookings/bookings.selectors";
import {iif, mergeMap, of} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = this.store.select(getUser);
  bookings$ = this.store.select(getMyFilteredBookings).pipe(
    mergeMap((bookings) =>
      iif(() => bookings === null, this.store.select(getMySeatBookings), of(bookings)),
    ),
  )
  status$ = this.store.select(getMySeatBookingStatus);
  error$ = this.store.select(getMySeatBookingError);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
