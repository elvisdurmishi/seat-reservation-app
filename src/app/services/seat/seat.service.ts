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
}
