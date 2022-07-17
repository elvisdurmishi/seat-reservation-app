import {Seat} from "../../model/Seat";
import {createReducer, on} from "@ngrx/store";
import {openSeatModal} from "./modals.actions";

export interface ModalsState {
  seat: Seat | null,
}

export const initialState: ModalsState = {
  seat: null,
}

export const modalsReducer = createReducer(
  initialState,
  on(openSeatModal, (state, {payload}) => ({
    ...state,
    seat: payload.seat,
  })),
)
