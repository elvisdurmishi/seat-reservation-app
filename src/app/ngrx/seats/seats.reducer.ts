import {Seat} from "../../model/Seat";
import {createReducer, on} from "@ngrx/store";
import {loadSeats, loadSeatsFailure, loadSeatsSuccess, saveSeatSuccess} from "./seats.actions";

export interface SeatsState {
  seats: Seat[] | null,
  error: string | null,
  status: 'initial' | 'loading' | 'error' | 'success',
}

export const initialState: SeatsState = {
  seats: null,
  error: null,
  status: 'initial',
}

export const seatsReducer = createReducer(
  initialState,
  on(loadSeats, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(loadSeatsSuccess, (state, {payload}) => ({
    ...state,
    seats: payload.seats,
    error: null,
    status: 'success',
  })),
  on(loadSeatsFailure, (state) => ({
    ...state,
    error: `There was an error loading the data.`,
    status: 'error'
  })),
  on(saveSeatSuccess, (state, {payload}) => ({
    ...state,
    seats: payload.seats
  }))
)
