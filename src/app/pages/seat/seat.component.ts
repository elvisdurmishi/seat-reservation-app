import { Component, OnInit } from '@angular/core';
import {
  getFilteredSeats,
  getFilteredSeatsError,
  getFilteredSeatsStatus,
  getSeats, getSeatsError,
  getSeatsStatus
} from "../../ngrx/seats/seats.selectors";
import {iif, map, mergeMap, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../ngrx/app.state";
import {loadBookings} from "../../ngrx/bookings/bookings.actions";
import {clearFilterResults, deleteSeat, loadFilteredSeats} from "../../ngrx/seats/seats.actions";
import {Seat} from "../../model/Seat";
import {openSeatModal} from "../../ngrx/modals/modals.actions";

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {
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

  ngOnDestroy(): void {
    this.resetFilters();
    this.seatFilters$.unsubscribe();
  }

  editSeat(seat: Seat) {
    this.store.dispatch(openSeatModal({payload: {seat: seat}}))
  }

  deleteSeat(seat: Seat) {
    this.store.dispatch(deleteSeat({payload: {seatId: seat.id}}));
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

  get location() {
    return this.filtersForm.get('location');
  }

  get status() {
    return this.filtersForm.get('status');
  }

  resetFilters() {
    this.store.dispatch(clearFilterResults());
    this.location?.setValue('all');
    this.status?.setValue('all');
  }
}
