import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";
import {Booking} from "../../model/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:ServiceHelperService) { }

  loadBookings() {
    return this.http.getRequest(`/bookings`, "/640")
  }

  loadSeatBookings(seatId: number) {
    return this.http.getRequest(`/bookings?seatId=${seatId}`, '/640')
  }

  bookSeat(booking: Booking) {
    if(booking.id) {
      return this.http.putRequest(`/bookings/${booking.id}`, booking);
    }

    return this.http.postRequest(`/bookings`, booking, '/660')
  }

  deleteBooking(bookingId: number) {
    return this.http.deleteRequest(`/bookings/${bookingId}`);
  }
}
