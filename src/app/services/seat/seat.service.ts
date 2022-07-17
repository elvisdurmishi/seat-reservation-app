import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";
import {Seat} from "../../model/Seat";

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http:ServiceHelperService) { }

  loadSeats() {
    return this.http.getRequest(`/seats`, "/640")
  }

  saveSeat(seat: Seat) {
    if(seat.id) {
      return this.http.putRequest(`/seats/${seat.id}`, seat);
    }

    return this.http.postRequest(`/seats`, seat);
  }

  deleteSeat(seatId: number) {
    return this.http.deleteRequest(`/seats/${seatId}`);
  }

  loadFilteredSeats(filters: any) {
    return this.http.getRequest(`/seats` + this.buildQueryString(filters))
  }

  private buildQueryString(filters: any) {
    let query = '';

    Object.entries(filters).forEach(([key, value]) => {
      if(value && value !== 'all') {
        query += query.length > 0 ? `&${key}=${value}` : `?${key}=${value}`
      }
    })

    return query;
  }
}
