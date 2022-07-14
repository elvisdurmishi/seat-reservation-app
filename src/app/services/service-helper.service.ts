import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ServiceHelperService {

  constructor(private http:HttpClient) { }

  postRequest(endpoint: string, body: object, model: any = null) {
    if(model) {
      return this.http.post<typeof model>(environment.API_URL + endpoint, body, httpOptions);
    }
    return this.http.post(environment.API_URL + endpoint, body);
  }

  deleteRequest(endpoint: string, body: object, model: any = null) {
    if(model) {
      return this.http.delete<typeof model>(environment.API_URL + endpoint, body);
    }
    return this.http.delete(environment.API_URL + endpoint, body);
  }

  putRequest(endpoint: string, body: object, model: any = null) {
    if(model) {
      return this.http.put<typeof model>(environment.API_URL + endpoint, body, httpOptions);
    }
    return this.http.put(environment.API_URL + endpoint, body);
  }

  getRequest(endpoint: string, model: any = null) {
    if(model) {
      return this.http.get<typeof model>(environment.API_URL + endpoint);
    }
    return this.http.get(environment.API_URL + endpoint);
  }
}
