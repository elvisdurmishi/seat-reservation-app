import {createAction, props} from "@ngrx/store";
import {Seat} from "../../model/Seat";
import {Booking} from "../../model/Booking";

export const openSeatModal = createAction(
  "[Manager Dashboard] Open Seat Modal",
  props<{ payload: {seat: Seat | null } }>()
);

export const openBookingModal = createAction(
  "[Manager Dashboard] Open Booking Modal",
  props<{payload: {booking: Booking | null, seatId: number}}>()
)
