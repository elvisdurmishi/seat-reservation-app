import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Seat} from "../../../model/Seat";

@Component({
  selector: 'app-seat-modal',
  templateUrl: './seat-modal.component.html',
  styleUrls: ['./seat-modal.component.scss'],
  providers: [NgbModalConfig]
})
export class SeatModalComponent implements OnInit {
  @Input() seat!: Seat | null;
  seatForm: FormGroup;

  ngOnInit(): void {
    const {seat} = this;
    if(seat) {
      this.seatForm.get('floor')?.setValue(seat.floor);
      this.seatForm.get('name')?.setValue(seat.name);
      this.seatForm.get('order')?.setValue(seat.order);
      this.seatForm.get('status')?.setValue(seat.status);
    }

  }

  constructor(
    private store: Store<AppState>,
    config: NgbModalConfig,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.seatForm = this.formBuilder.group({
      floor: [''],
      name: [''],
      order: [1],
      status: ['free'],
    })
  }

  closeModal() {
    this.activeModal.close();
  }
}
