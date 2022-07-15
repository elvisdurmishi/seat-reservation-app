import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../model/Room";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  @Input() room!: Room;

  constructor() { }

  ngOnInit(): void {
  }

}
