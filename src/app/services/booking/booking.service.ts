import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";

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
}
