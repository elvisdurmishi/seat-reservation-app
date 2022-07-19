import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {ActivatedRoute} from "@angular/router";
import {
  clearBookingsList,
  clearFilterBookingsResults, clearMyFilteredBookingsResults,
  loadFilteredBookings, loadMyFilteredBookings,
  loadSeatBookings
} from "../../../ngrx/bookings/bookings.actions";
import {DateRange} from "../../../model/DateRange";
import {openBookingModal} from "../../../ngrx/modals/modals.actions";
import {getUser} from "../../../ngrx/auth/auth.selectors";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit, OnDestroy {
  @Input() bookings$: any;
  @Input() status$: any;
  @Input() error$: any;
  seatId: number;
  inProfile: boolean;
  userId: number | undefined;
  fromDate: any | null = null;
  toDate: any | null = null;
  user$;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.seatId = route.snapshot?.params['id'];
    this.inProfile = !route.snapshot?.params['id'];
    if(!this.inProfile) {
      this.store.dispatch(loadSeatBookings({payload: {seatId: this.seatId}}));
    }

    this.user$ = this.store.select(getUser).subscribe((user) => this.userId = user?.id);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBookingsList());
    this.user$.unsubscribe();
  }

  openBookingModal() {
    if(this.inProfile) {
      return;
    }

    this.store.dispatch(openBookingModal({payload: {booking: null, seatId: this.seatId}}));
  }

  onDateSelection(dateRange: DateRange) {
    this.fromDate = dateRange.from;
    this.toDate = dateRange.to;

    if(!this.inProfile) {
      this.store.dispatch(loadFilteredBookings({payload: {seatId: this.seatId, filters: dateRange}}))
      return;
    }

    this.store.dispatch(loadMyFilteredBookings({payload: {userId: this.userId, filters: dateRange}}))
  }

  clearFilters() {
    this.fromDate = null;
    this.toDate = null;
    if(!this.inProfile) {
      this.store.dispatch(clearFilterBookingsResults());
      return;
    }

    this.store.dispatch(clearMyFilteredBookingsResults());
  }
}
