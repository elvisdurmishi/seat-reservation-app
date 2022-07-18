import {createReducer, on} from "@ngrx/store";
import {Booking} from "../../model/Booking";
import {loadBookings, loadBookingsFailure, loadBookingsSuccess} from "./bookings.actions";

export interface BookingsState {
  bookings: Booking[] | null,
  error: string | null,
  status: 'initial' | 'loading' | 'error' | 'success',
}

export const initialState: BookingsState = {
  bookings: null,
  error: null,
  status: 'initial',
}

export const bookingsReducer = createReducer(
  initialState,
  on(loadBookings, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(loadBookingsSuccess, (state, {payload}) => ({
    ...state,
    bookings: payload.bookings,
    error: null,
    status: 'success',
  })),
  on(loadBookingsFailure, (state) => ({
    ...state,
    error: `There was an error loading the data.`,
    status: 'error'
  })),
)
