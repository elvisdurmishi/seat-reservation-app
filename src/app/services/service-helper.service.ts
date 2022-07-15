import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ServiceHelperService {

  httpOptions() {
    let accessToken = this.cookieService.get("accessToken");

    if(accessToken !== '') {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        }),
      }
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
  };

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  postRequest(endpoint: string, body: object, authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.post<typeof model>(url + endpoint, body, this.httpOptions());
    }
    return this.http.post(url + endpoint, body, this.httpOptions());
  }

  deleteRequest(endpoint: string, body: object, authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.delete<typeof model>(url + endpoint, this.httpOptions());
    }
    return this.http.delete(url + endpoint, this.httpOptions());
  }

  putRequest(endpoint: string, body: object, authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.put<typeof model>(url + endpoint, body, this.httpOptions());
    }
    return this.http.put(url + endpoint, body, this.httpOptions());
  }

  getRequest(endpoint: string, authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.get<typeof model>(url + endpoint, this.httpOptions());
    }
    return this.http.get(url + endpoint, this.httpOptions());
  }

  handleAuthProtectionRoutes(authProtection: string | null): string {
    let url = environment.API_URL;

    if(authProtection) {
      url += authProtection;
    }

    return url;
  }
}
