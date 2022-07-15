import { Injectable } from '@angular/core';
import {ServiceHelperService} from "../service-helper.service";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:ServiceHelperService) { }

  login(email: string, password: string) {
    return this.http.postRequest("/login", {
      email: email,
      password: password
    });
  }

  register(user: User) {
    return this.http.postRequest("/register", user);
  }

  loadUser(userId: string) {
    return this.http.getRequest(`/users/${userId}`, "/400")
  }
}
