import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(private http:ServiceHelperService) { }

  loadRooms() {
    return this.http.getRequest("/rooms", "/640");
  }
}
