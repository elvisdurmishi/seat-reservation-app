import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from "../../../model/Seat";

@Component({
  selector: 'app-seats-table',
  templateUrl: './seats-table.component.html',
  styleUrls: ['./seats-table.component.scss']
})
export class SeatsTableComponent implements OnInit {
  @Input() status$!: any;
  @Input() error$!: any;
  @Input() seats$!: any;
  @Output() onSeatEdit = new EventEmitter();
  @Output() onSeatDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editSeat(seat: Seat){
    this.onSeatEdit.emit(seat);
  }

  deleteSeat(seat: Seat){
    this.onSeatDelete.emit(seat);
  }
}
