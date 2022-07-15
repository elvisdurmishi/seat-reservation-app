import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getRooms} from "../../../ngrx/rooms/rooms.selectors";
import {AppState} from "../../../ngrx/app.state";
import {map} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rooms$ = this.store.select(getRooms).pipe(map(data => data || []));

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
