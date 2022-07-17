import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {getUser} from "../../../ngrx/auth/auth.selectors";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$ = this.store.select(getUser);
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
