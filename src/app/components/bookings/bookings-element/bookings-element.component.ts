import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../../model/Booking";

@Component({
  selector: 'tr [app-bookings-element]',
  templateUrl: './bookings-element.component.html',
  styleUrls: ['./bookings-element.component.scss']
})
export class BookingsElementComponent implements OnInit {
  @Input() booking!: Booking;
  @Input() seatId?: number;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editBooking(booking: Booking) {
    this.onEdit.emit(booking);
  }

  deleteBooking(booking: Booking) {
    this.onDelete.emit(booking);
  }

  parseDate(date: any) {
    return date.day + '-' + date.month + '-' + date.year;
  }
}
