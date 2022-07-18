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
import {catchError, concat, from, iif, map, mergeMap, of, switchMap, tap} from "rxjs";
import {getBookings} from "../../../ngrx/bookings/bookings.selectors";
import {DateRange} from "../../../model/DateRange";

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
    switchMap((seats) =>
      from(this.store.select(getBookings)).pipe(
        map((bookings) => {
          let newSeatsList = seats ? [...seats] : [];
          newSeatsList = newSeatsList.map((seat) =>
            bookings?.some((booking) => booking.seatId === seat.id && this.inReservedDateRange(booking.date))
              ? {...seat, status: 'busy'}
              : {...seat, status: 'free'})
          return newSeatsList
        }),
      )
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

  inReservedDateRange(date: DateRange) {
    let today = new Date();
    const {from, to} = date;

    let fromDate = new Date(from.year, from.month - 1, from.day);
    let toDate   = new Date(to.year, to.month - 1, to.day);

    return today > fromDate && today < toDate;
  }
}
