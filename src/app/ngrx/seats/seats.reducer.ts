import {Seat} from "../../model/Seat";
import {createReducer, on} from "@ngrx/store";
import {
  clearFilterResults,
  deleteSeatSuccess,
  loadFilteredSeats, loadFilteredSeatsSuccess, loadSeatBookings, loadSeatBookingsFailure, loadSeatBookingsSuccess,
  loadSeats,
  loadSeatsFailure,
  loadSeatsSuccess,
  saveSeatSuccess
} from "./seats.actions";
import {Booking} from "../../model/Booking";

export interface SeatsState {
  seats: Seat[] | null,
  error: string | null,
  status: 'initial' | 'loading' | 'error' | 'success',
  filtered_seats: {
    seats: Seat[] | null,
    error: string | null,
    status: 'initial' | 'loading' | 'error' | 'success',
  },
  selected_seat: {
    id?: number,
    bookings: Booking[] | null,
    error: string | null,
    status: 'initial' | 'loading' | 'error' | 'success',
  }
}

export const initialState: SeatsState = {
  seats: null,
  error: null,
  status: 'initial',
  filtered_seats: {
    seats: null,
    error: null,
    status: 'initial'
  },
  selected_seat: {
    bookings: null,
    error: null,
    status: 'initial'
  }
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
  })),
  on(deleteSeatSuccess, (state, {payload}) => ({
    ...state,
    seats: payload.seats
  })),
  on(loadFilteredSeats, (state) => ({
    ...state,
    filtered_seats: {
      ...state.filtered_seats,
      status: 'loading'
    }
  })),
  on(loadFilteredSeatsSuccess, (state, {payload}) => ({
    ...state,
    filtered_seats: {
      ...state.filtered_seats,
      seats: payload.seats,
      error: null,
      status: 'success',
    }
  })),
  on(loadSeatsFailure, (state) => ({
    ...state,
    filtered_seats: {
      ...state.filtered_seats,
      error: `There was an error loading the data.`,
      status: 'error'
    }
  })),
  on(clearFilterResults, (state) => ({
    ...state,
    filtered_seats: {
      ...state.filtered_seats,
      seats: null,
      status: 'initial',
      error: null
    }
  })),
  on(loadSeatBookings, (state) => ({
    ...state,
    selected_seat: {
      ...state.selected_seat,
      status: 'loading'
    }
  })),
  on(loadSeatBookingsSuccess, (state, {payload}) => ({
    ...state,
    selected_seat: {
      ...state.selected_seat,
      bookings: payload.bookings,
      status: 'success',
      error: null
    }
  })),
  on(loadSeatBookingsFailure, (state, {error}) => ({
    ...state,
    selected_seat: {
      ...state.selected_seat,
      status: 'error',
      error: error
    }
  })),
)
