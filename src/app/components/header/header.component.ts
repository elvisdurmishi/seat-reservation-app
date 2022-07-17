import {Component, OnInit} from '@angular/core';
import {AppState} from "../../ngrx/app.state";
import {Store} from "@ngrx/store";
import {getUser} from "../../ngrx/auth/auth.selectors";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {logout} from "../../ngrx/auth/auth.actions";
import {openSeatModal} from "../../ngrx/modals/modals.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user$ = this.store.select(getUser);
  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(
    private store: Store<AppState>
  ) { }

  logout() {
    this.store.dispatch(logout());
  }

  ngOnInit(): void {}

  openSeatModal() {
    this.store.dispatch(openSeatModal({payload: {seat: null}}))
  }
}
