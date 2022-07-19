import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:ServiceHelperService) { }

  loadUsers() {
    return this.http.getRequest(`/users`, "/640")
  }
}
