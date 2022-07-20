import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {Booking} from "../../../model/Booking";
import {getUsers} from "../../../ngrx/users/users.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {bookSeat, clearBookingsList, loadSeatBookings} from "../../../ngrx/bookings/bookings.actions";
import {map, withLatestFrom} from "rxjs";
import {DateRange} from "../../../model/DateRange";
import {getUser} from "../../../ngrx/auth/auth.selectors";
import {getSeatBookings} from "../../../ngrx/bookings/bookings.selectors";
import {User} from "../../../model/User";

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit, OnDestroy {
  @Input() booking!: Booking | null;
  @Input() seatId!: number;
  @Input() user!: User | null;
  users$ = this.store.select(getUsers);
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  bookingForm: FormGroup;
  disabledDates: DateRange[] = [];
  user$ = this.store.select(getUser);
  bookings$: any;

  constructor(
    private store: Store<AppState>,
    private activeModal: NgbActiveModal,
    private calendar: NgbCalendar,
    private formBuilder: FormBuilder,
  ) {

    this.bookingForm = this.formBuilder.group({
      seatId: [''],
      userId: ['', {validators: [Validators.required], disabled: true}],
      userName: [''],
      date: [{
        from: this.fromDate,
        to: this.toDate,
      }],
    })
  }

  ngOnInit(): void {
    const {seatId, user, booking, formUserId, formUserName, formDate} = this;
    this.formSeatId?.setValue(Number(seatId));
    this.formUserId?.setValue(user?.id?.toString());
    this.formUserName?.setValue(user?.name);

    this.store.dispatch(clearBookingsList());
    this.store.dispatch(loadSeatBookings({payload: {seatId: seatId}}));

    this.bookings$ = this.store.select(getSeatBookings).pipe(
      withLatestFrom(this.user$),
      map(([bookings, user]) => {
        bookings?.forEach((booking) => (booking.userId != user?.id || booking.id)
          ? this.disabledDates = [...this.disabledDates, booking.date]
          : this.disabledDates = [...this.disabledDates])
        return this.disabledDates;
      })).subscribe();

    if(booking) {
      formUserId?.setValue(booking.userId);
      formUserName?.setValue(booking.userName);

      formDate?.setValue({...formDate?.getRawValue(), from: booking.date.from});
      this.fromDate = new NgbDate(booking.date.from.year, booking.date.from.month, booking.date.from.day);
      formDate?.setValue({...formDate?.getRawValue(), to: booking.date.to});
      this.toDate = new NgbDate(booking.date.to.year, booking.date.to.month, booking.date.to.day);
    }
  }

  ngOnDestroy(): void {
    this.bookings$.unsubscribe();
  }

  onDateSelection(dateRange: DateRange) {
    this.formDate?.setValue({...this.formDate?.getRawValue(), from: dateRange.from});
    this.formDate?.setValue({...this.formDate?.getRawValue(), to: dateRange.to});

    this.isInvalidDate(dateRange);
  }

  closeModal() {
    this.activeModal.close();
  }

  get formUserId() {
    return this.bookingForm.get('userId');
  }

  get formUserName() {
    return this.bookingForm.get('userName');
  }

  get formSeatId() {
    return this.bookingForm.get('seatId');
  }

  get formDate(){
    return this.bookingForm.get('date');
  }

  setUserName(user: string) {
    this.formUserName?.setValue(user);
  }

  saveBooking() {
    if(this.hasErrors()) {
      return;
    }

    let booking = Object.assign({}, this.booking, this.bookingForm.getRawValue());
    this.store.dispatch(bookSeat({payload: {booking: booking}}));
    this.closeModal();
  }

  hasErrors(){
    return Object.entries(this.bookingForm.getRawValue()).some(([key]) => {
      return !this.bookingForm.get(key)?.valid;
    })
  }

  isInvalidDate(date: DateRange) {
    const {from, to} = date;

    if(!to) {
      this.formDate?.setErrors({invalidRange: true})
      return true;
    }

    let currentFrom = new Date(from.year, from.month - 1, from.day);
    let currentTo = new Date(to.year, to.month - 1, to.day);

    return this.disabledDates.some((date) => {
      const {from, to} = date;
      let fromDate = new Date(from.year, from.month - 1, from.day);
      let toDate   = new Date(to.year, to.month - 1, to.day);

      let invalidRange = currentFrom <= fromDate && currentTo >= toDate;
      this.formDate?.setErrors(invalidRange ? {invalidRange: invalidRange} : null)
      return invalidRange;
    })
  }
}
