import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from "../../../model/Seat";

@Component({
  selector: 'tr [app-seats-table-element]',
  templateUrl: './seats-table-element.component.html',
  styleUrls: ['./seats-table-element.component.scss']
})
export class SeatsTableElementComponent implements OnInit {
  @Input() seat: any;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editSeat(seat: Seat) {
    this.onEdit.emit(seat);
  }

  deleteSeat(seat: Seat) {
    this.onDelete.emit(seat);
  }
}
