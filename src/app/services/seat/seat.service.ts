import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http:ServiceHelperService) { }

  loadSeats() {
    return this.http.getRequest(`/seats`, "/640")
  }
}
