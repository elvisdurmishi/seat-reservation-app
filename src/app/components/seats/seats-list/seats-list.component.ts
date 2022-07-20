import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {getSeats} from "../../../ngrx/seats/seats.selectors";
import {map} from "rxjs";

@Component({
  selector: 'app-seats-list',
  templateUrl: './seats-list.component.html',
  styleUrls: ['./seats-list.component.scss']
})
export class SeatsListComponent implements OnInit {
  @Input() tab!: string;
  seats$;

  constructor(private store: Store<AppState>) {
    this.seats$ = this.store.select(getSeats).pipe(map((seats) => seats?.flatMap((seat) => seat.location === this.tab ? seat : [])));
  }

  ngOnInit(): void {
  }

}
