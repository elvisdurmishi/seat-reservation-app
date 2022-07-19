import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {Booking} from "../../../model/Booking";
import {getUsers} from "../../../ngrx/users/users.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {bookSeat} from "../../../ngrx/bookings/bookings.actions";
import {getBookings} from "../../../ngrx/bookings/bookings.selectors";
import {map, withLatestFrom} from "rxjs";
import {DateRange} from "../../../model/DateRange";
import {getUser} from "../../../ngrx/auth/auth.selectors";

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit, OnDestroy {
  @Input() booking!: Booking | null;
  @Input() seatId!: number | null;
  users$ = this.store.select(getUsers);
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
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
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);

    this.bookingForm = this.formBuilder.group({
      seatId: [''],
      userId: ['', {validators: [Validators.required]}],
      userName: [''],
      date: [{
        from: this.fromDate,
        to: this.toDate,
      }],
    })
  }

  ngOnInit(): void {
    const {seatId, booking, userId, userName, date} = this;
    this.formSeatId?.setValue(Number(seatId));

    this.bookings$ = this.store.select(getBookings).pipe(
      withLatestFrom(this.user$),
      map(([bookings, user]) => {
        bookings?.forEach((booking) => booking.seatId == this.seatId && (booking.userId !== user?.id)
          ? this.disabledDates = [...this.disabledDates, booking.date]
          : this.disabledDates = [...this.disabledDates])
        return this.disabledDates;
      })).subscribe();

    if(booking) {
      userId?.setValue(booking.userId);
      userName?.setValue(booking.userName);
      date?.setValue({...date?.getRawValue(), from: booking.date.from});
      this.fromDate = new NgbDate(booking.date.from.year, booking.date.from.month, booking.date.from.day);
      date?.setValue({...date?.getRawValue(), to: booking.date.to});
      this.toDate = new NgbDate(booking.date.to.year, booking.date.to.month, booking.date.to.day);
    }
  }

  ngOnDestroy(): void {
    this.bookings$.unsubscribe();
  }

  onDateSelection(dateRange: DateRange) {
    this.date?.setValue({...this.date?.getRawValue(), from: dateRange.from});
    this.date?.setValue({...this.date?.getRawValue(), to: dateRange.to});

    this.isInvalidDate(dateRange);
  }

  closeModal() {
    this.activeModal.close();
  }

  get userId() {
    return this.bookingForm.get('userId');
  }

  get userName() {
    return this.bookingForm.get('userName');
  }

  get formSeatId() {
    return this.bookingForm.get('seatId');
  }

  get date(){
    return this.bookingForm.get('date');
  }

  setUserName(user: string) {
    this.userName?.setValue(user);
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
      this.date?.setErrors({invalidRange: true})
      return true;
    }

    let currentFrom = new Date(from.year, from.month - 1, from.day);
    let currentTo = new Date(to.year, to.month - 1, to.day);

    return this.disabledDates.some((date) => {
      const {from, to} = date;
      let fromDate = new Date(from.year, from.month - 1, from.day);
      let toDate   = new Date(to.year, to.month - 1, to.day);

      let invalidRange = currentFrom <= fromDate && currentTo >= toDate;
      this.date?.setErrors({invalidRange: invalidRange})
      return invalidRange;
    })
  }
}
