import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../ngrx/app.state";
import {loadBookings} from "../../ngrx/bookings/bookings.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadBookings());
  }

  ngOnInit(): void {
  }

}
