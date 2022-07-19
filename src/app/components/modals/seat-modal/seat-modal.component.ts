import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../ngrx/app.state";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Seat} from "../../../model/Seat";
import {saveSeat} from "../../../ngrx/seats/seats.actions";
import {getSeats} from "../../../ngrx/seats/seats.selectors";
import {map} from "rxjs";

@Component({
  selector: 'app-seat-modal',
  templateUrl: './seat-modal.component.html',
  styleUrls: ['./seat-modal.component.scss'],
  providers: [NgbModalConfig]
})
export class SeatModalComponent implements OnInit, OnDestroy {
  @Input() seat!: Seat | null;
  seatForm: FormGroup;
  seats$;
  busyNumbers: number[] = [];

  ngOnInit(): void {
    const {seat} = this;
    if(seat) {
      this.seatForm.get('number')?.setValue(seat.number);
      this.seatForm.get('location')?.setValue(seat.location);
    }
  }

  ngOnDestroy() {
    this.seats$.unsubscribe();
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
      number: [1, {validators: [Validators.required, Validators.min(1), Validators.max(100)]}],
      location: ['main'],
    })

    this.seats$ = this.store.select(getSeats).pipe(
      map((seats) => {
        let result = seats?.flatMap((seat) => seat.location == this.location?.getRawValue() ? seat.number : [])
        return result ? result : [];
      })
    ).subscribe((val) => this.busyNumbers = val);
  }

  closeModal() {
    this.activeModal.close();
  }

  saveSeat() {
    if(this.hasErrors()) {
      return;
    }

    let seat = Object.assign({}, this.seat, this.seatForm.getRawValue());
    this.store.dispatch(saveSeat({payload: {seat: seat}}));
    this.closeModal();
  }

  get number() {
    return this.seatForm.get('number');
  }

  get location() {
    return this.seatForm.get('location');
  }

  hasErrors(){
    this.number?.setErrors(this.isInvalidSeat() ? {invalidSeat: true} : null)

    return Object.entries(this.seatForm.getRawValue()).some(([key]) => {
      return !this.seatForm.get(key)?.valid;
    })
  }

  isInvalidSeat() {
    return this.busyNumbers.indexOf(this.number?.getRawValue()) > -1
  }
}
