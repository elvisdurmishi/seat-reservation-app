import {Seat} from "../../model/Seat";
import {createReducer, on} from "@ngrx/store";
import {openBookingModal, openSeatModal} from "./modals.actions";
import {Booking} from "../../model/Booking";

export interface ModalsState {
  seat: Seat | null,
  booking: Booking | null,
}

export const initialState: ModalsState = {
  seat: null,
  booking: null,
}

export const modalsReducer = createReducer(
  initialState,
  on(openSeatModal, (state, {payload}) => ({
    ...state,
    seat: payload.seat,
  })),
  on(openBookingModal, (state, {payload}) => ({
    ...state,
    booking: payload.booking,
  })),
)
