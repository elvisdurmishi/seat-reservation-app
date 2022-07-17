import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Seat} from "../../../model/Seat";
import {saveSeat} from "../../../ngrx/seats/seats.actions";

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
      this.seatForm.get('number')?.setValue(seat.number);
      this.seatForm.get('location')?.setValue(seat.location);
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
      number: [''],
      location: [''],
      status: ['free'],
    })
  }

  closeModal() {
    this.activeModal.close();
  }

  saveSeat() {
    let seat = Object.assign({}, this.seat, this.seatForm.getRawValue());
    this.store.dispatch(saveSeat({payload: {seat: seat}}));
    this.closeModal();
  }
}
