import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {Booking} from "../../../model/Booking";
import {getUsers} from "../../../ngrx/users/users.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {bookSeat} from "../../../ngrx/bookings/bookings.actions";

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
  @Input() booking!: Booking | null;
  @Input() seatId!: number | null;
  users$ = this.store.select(getUsers);
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  bookingForm: FormGroup;

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
    this.formSeatId?.setValue(seatId);


    if(booking) {
      userId?.setValue(booking.userId);
      userName?.setValue(booking.userName);
      date?.setValue({...date?.getRawValue(), from: booking.date.from});
      this.fromDate = new NgbDate(booking.date.from.year, booking.date.from.month, booking.date.from.day);
      date?.setValue({...date?.getRawValue(), to: booking.date.to});
      this.toDate = new NgbDate(booking.date.to.year, booking.date.to.month, booking.date.to.day);
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.date?.setValue({...this.date?.getRawValue(), from: date});
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && (date.equals(this.fromDate) || date.after(this.fromDate))) {
      this.date?.setValue({...this.date?.getRawValue(), to: date});
      this.toDate = date;
    } else {
      this.date?.setValue({...this.date?.getRawValue(), to: null});
      this.date?.setValue({...this.date?.getRawValue(), from: date});
      this.toDate = null;
      this.fromDate = date;
    }
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
}
