import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {getSeats} from "../../../ngrx/seats/seats.selectors";
import {loadSeats} from "../../../ngrx/seats/seats.actions";
import {Seat} from "../../../model/Seat";
import {openSeatModal} from "../../../ngrx/modals/modals.actions";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {
  seats$ = this.store.select(getSeats);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadSeats());
  }

  ngOnInit(): void {
  }

  editSeat(seat: Seat) {
    this.store.dispatch(openSeatModal({payload: {seat: seat}}))
  }
}
