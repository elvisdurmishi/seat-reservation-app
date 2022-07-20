import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../ngrx/app.state";
import {loadBookings} from "../../ngrx/bookings/bookings.actions";
import {Seat} from "../../model/Seat";
import {openBookingModal} from "../../ngrx/modals/modals.actions";
import {getUser} from "../../ngrx/auth/auth.selectors";
import {map} from "rxjs";
import {User} from "../../model/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user!: User | null;
  user$;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadBookings());
    this.user$ = this.store.select(getUser).pipe(map((user) => this.user = user)).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  bookSeat(seat: Seat, floor: string) {
    this.store.dispatch(openBookingModal({payload: {booking: null, seatId: seat.id, user: this.user}}))
  }
}
