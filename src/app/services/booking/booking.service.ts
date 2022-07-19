import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";
import {Booking} from "../../model/Booking";
import {DateRange} from "../../model/DateRange";

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

  loadMySeatBookings(userId: number | undefined) {
    return this.http.getRequest(`/bookings?userId=${userId}`, '/640')
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

  loadFilteredBookings(seatId: number, date: DateRange) {
    return this.http.getRequest(`/bookings` + BookingService.buildQueryString(seatId, date, 'seat'))
  }

  loadMyFilteredBookings(userId: number | undefined, date: DateRange) {
    return this.http.getRequest(`/bookings` + BookingService.buildQueryString(userId, date, 'user'))
  }

  private static buildQueryString(id: number | undefined, date: DateRange, type: string) {
    let query = `?${type}Id=${id}`;
    query = query + `&date.from.year_gte=${date.from.year}&date.from.month_gte=${date.from.month}&date.from.day_gte=${date.from.day}`;

    if(date.to) {
      query = query + `&date.to.year_lte=${date.to.year}&date.to.month_lte=${date.to.month}&date.to.day_lte=${date.to.day}`;
    }

    return query;
  }
}
