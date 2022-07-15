import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadAccessTokenCookie, loadUser} from "./ngrx/auth/auth.actions";
import {CookieService} from "ngx-cookie-service";
import {parseJwt} from "./utility/utility.functions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'seat-reservation-app';

  constructor(private store: Store, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    let accessToken = this.cookieService.get("accessToken");
    if(accessToken !== '') {
      this.store.dispatch(loadAccessTokenCookie({payload: {accessToken: accessToken}}))
      let parsedToken = parseJwt(accessToken);
      this.store.dispatch(loadUser({payload: {userId: parsedToken.sub}}))
    }
  }
}
