import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {getSeats, getSeatsError, getSeatsStatus} from "../../../ngrx/seats/seats.selectors";
import {map} from "rxjs";
import {Seat} from "../../../model/Seat";

@Component({
  selector: 'app-seats-list',
  templateUrl: './seats-list.component.html',
  styleUrls: ['./seats-list.component.scss']
})
export class SeatsListComponent implements OnInit {
  @Input() tab!: string;
  @Output() onBookSeat = new EventEmitter();
  seats$;
  seatsStatus$ = this.store.select(getSeatsStatus);
  seatsError$ = this.store.select(getSeatsError);

  constructor(private store: Store<AppState>) {
    this.seats$ = this.store.select(getSeats).pipe(map((seats) => seats?.flatMap((seat) => seat.location === this.tab ? seat : [])));
  }

  ngOnInit(): void {
  }

  bookSeat(seat: Seat){
    this.onBookSeat.emit(seat);
  }
}
