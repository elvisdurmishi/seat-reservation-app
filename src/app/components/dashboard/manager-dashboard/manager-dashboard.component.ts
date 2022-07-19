import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {
  getFilteredSeats,
  getFilteredSeatsError,
  getFilteredSeatsStatus,
  getSeats, getSeatsError,
  getSeatsStatus
} from "../../../ngrx/seats/seats.selectors";
import {
  clearFilterResults,
  deleteSeat,
  loadFilteredSeats,
} from "../../../ngrx/seats/seats.actions";
import {Seat} from "../../../model/Seat";
import {openSeatModal} from "../../../ngrx/modals/modals.actions";
import {FormBuilder, FormGroup} from "@angular/forms";
import {iif, map, mergeMap, of} from "rxjs";
import {loadBookings} from "../../../ngrx/bookings/bookings.actions";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit, OnDestroy {
  seats$ = this.store.select(getFilteredSeats).pipe(
    mergeMap((seats) =>
      iif(() => seats === null, this.store.select(getSeats), of(seats)),
    ),
  )
  status$ = this.store.select(getFilteredSeatsStatus).pipe(
    mergeMap((status) =>
      iif(() => status === null, this.store.select(getSeatsStatus), of(status))
    )
  );
  error$ = this.store.select(getFilteredSeatsError).pipe(
    mergeMap((error) =>
      iif(() => error === null, this.store.select(getSeatsError), of(error))
    )
  );
  filtersForm: FormGroup;
  seatFilters$: any;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    ) {

    this.filtersForm = this.formBuilder.group({
      location: ['all'],
      status: ['all'],
    })

    this.store.dispatch(loadBookings());

    this.seatFilters$ = this.filtersForm.valueChanges.pipe(
      map((filters) => {
        return this.hasFilters(filters)
          ? this.store.dispatch(loadFilteredSeats({payload: {filters: filters}}))
          : this.store.dispatch(clearFilterResults())
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

  editSeat(seat: Seat) {
    this.store.dispatch(openSeatModal({payload: {seat: seat}}))
  }

  deleteSeat(seat: Seat) {
    this.store.dispatch(deleteSeat({payload: {seatId: seat.id}}));
  }

  ngOnDestroy(): void {
    this.seatFilters$.unsubscribe();
  }

  hasFilters(filters: object) {
    return Object.entries(filters).some(([key, value]) => {
      if(value !== 'all') {
        return true;
      }

      return;
    });
  }

  openSeatModal() {
    this.store.dispatch(openSeatModal({payload: {seat: null}}))
  }
}
