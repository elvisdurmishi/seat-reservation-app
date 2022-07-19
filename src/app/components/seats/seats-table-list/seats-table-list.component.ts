import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from "../../../model/Seat";

@Component({
  selector: 'tbody [app-seats-table-list]',
  templateUrl: './seats-table-list.component.html',
  styleUrls: ['./seats-table-list.component.scss']
})
export class SeatsTableListComponent implements OnInit {
  @Input() seats$: any;
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSeatEdit(seat: Seat){
    this.onEdit.emit(seat);
  }

  onSeatDelete(seat: Seat){
    this.onDelete.emit(seat);
  }
}
