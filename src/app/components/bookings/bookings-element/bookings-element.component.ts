import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../../model/Booking";

@Component({
  selector: 'tr [app-bookings-element]',
  templateUrl: './bookings-element.component.html',
  styleUrls: ['./bookings-element.component.scss']
})
export class BookingsElementComponent implements OnInit {
  @Input() booking!: Booking;
  @Input() inProfile?: boolean;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editBooking(booking: Booking) {
    this.onEdit.emit(booking);
  }

  deleteBooking(booking: Booking) {
    if(!this.canDelete(booking)) {
      return;
    }

    this.onDelete.emit(booking);
  }

  parseDate(date: any) {
    return date.day + '-' + date.month + '-' + date.year;
  }

  canDelete(booking: Booking) {
    let today = new Date();
    const {to} = booking.date;

    let toDate   = new Date(to.year, to.month - 1, to.day);

    return today < toDate;
  }
}
