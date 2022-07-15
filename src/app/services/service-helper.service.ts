import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const httpOptions = (token: string = '') => {
  if(token !== '') {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }),
    }
  }

  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
};

@Injectable({
  providedIn: 'root'
})
export class ServiceHelperService {

  constructor(private http:HttpClient) { }

  postRequest(endpoint: string, body: object, token: string = '', authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.post<typeof model>(url + endpoint, body, httpOptions(token));
    }
    return this.http.post(url + endpoint, body, httpOptions(token));
  }

  deleteRequest(endpoint: string, body: object, token: string = '', authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.delete<typeof model>(url + endpoint, httpOptions(token));
    }
    return this.http.delete(url + endpoint, httpOptions(token));
  }

  putRequest(endpoint: string, body: object, token: string = '', authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.put<typeof model>(url + endpoint, body, httpOptions(token));
    }
    return this.http.put(url + endpoint, body, httpOptions(token));
  }

  getRequest(endpoint: string, token: string = '', authProtection: string | null = null, model: any = null) {
    let url = this.handleAuthProtectionRoutes(authProtection);

    if(model) {
      return this.http.get<typeof model>(url + endpoint, httpOptions(token));
    }
    return this.http.get(url + endpoint, httpOptions(token));
  }

  handleAuthProtectionRoutes(authProtection: string | null): string {
    let url = environment.API_URL;

    if(authProtection) {
      url += authProtection;
    }

    return url;
  }
}
