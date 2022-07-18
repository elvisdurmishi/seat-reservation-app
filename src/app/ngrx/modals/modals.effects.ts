import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {of, switchMap} from "rxjs";
import {openBookingModal, openSeatModal} from "./modals.actions";
import {SeatModalComponent} from "../../components/modals/seat-modal/seat-modal.component";
import {BookingModalComponent} from "../../components/modals/booking-modal/booking-modal.component";

@Injectable()
export class ModalsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private modalService: NgbModal,
  ) {
  }

  openSeatModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openSeatModal),
      switchMap(({payload}) => {
        let modalRef = this.modalService.open(SeatModalComponent);
        modalRef.componentInstance.seat = payload.seat;
        return of(modalRef);
      })
    ), {dispatch: false}
  );

  openBookingModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openBookingModal),
      switchMap(({payload}) => {
        let modalRef = this.modalService.open(BookingModalComponent);
        modalRef.componentInstance.booking = payload.booking;
        return of(modalRef);
      })
    ), {dispatch: false}
  );
}
