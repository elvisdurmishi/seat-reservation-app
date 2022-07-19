import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../../model/Booking";

@Component({
  selector: 'tbody [app-bookings-list]',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {
  @Input() bookings!: Booking[] | null;
  @Input() seatId?: number;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onBookingEdit(booking: Booking) {
    this.onEdit.emit(booking);
  }

  onBookingDelete(booking: Booking) {
    this.onDelete.emit(booking);
  }
}
