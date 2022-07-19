import {createReducer, on} from "@ngrx/store";
import {Booking} from "../../model/Booking";
import {
  bookSeatSuccess,
  clearBookingsList, clearFilterBookingsResults,
  deleteBookingSuccess,
  loadBookings,
  loadBookingsFailure,
  loadBookingsSuccess,
  loadFilteredBookings, loadFilteredBookingsFailure,
  loadFilteredBookingsSuccess,
  loadSeatBookings,
  loadSeatBookingsFailure,
  loadSeatBookingsSuccess
} from "./bookings.actions";

export interface BookingsState {
  bookings: Booking[] | null,
  error: string | null,
  status: 'initial' | 'loading' | 'error' | 'success',
  selected_seat: {
    id?: number,
    bookings: Booking[] | null,
    error: string | null,
    status: 'initial' | 'loading' | 'error' | 'success',
  },
  filtered_bookings: {
    bookings: Booking[] | null,
    error: string | null,
    status: 'initial' | 'loading' | 'error' | 'success',
  }
}

export const initialState: BookingsState = {
  bookings: null,
  error: null,
  status: 'initial',
  selected_seat: {
    bookings: null,
    error: null,
    status: 'initial'
  },
  filtered_bookings: {
    bookings: null,
    error: null,
    status: 'initial'
  }
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
  on(bookSeatSuccess, (state, {payload}) => ({
    ...state,
    selected_seat: {
      ...state.selected_seat,
      bookings: payload.bookings,
      error: null,
      status: 'success',
    },
  })),
  on(deleteBookingSuccess, (state, {payload}) => ({
    ...state,
    selected_seat: {
      ...state.selected_seat,
      bookings: payload.bookings,
      status: 'success',
    },
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
  on(clearBookingsList, (state) => ({
    ...state,
    selected_seat: {
      ...state.selected_seat,
      bookings: null,
      status: 'initial',
      error: null,
    }
  })),
  on(loadFilteredBookings, (state) => ({
    ...state,
    filtered_bookings: {
      ...state.filtered_bookings,
      status: 'loading'
    }
  })),
  on(loadFilteredBookingsSuccess, (state, {payload}) => ({
    ...state,
    filtered_bookings: {
      ...state.filtered_bookings,
      bookings: payload.bookings,
      error: null,
      status: 'success',
    }
  })),
  on(loadFilteredBookingsFailure, (state) => ({
    ...state,
    filtered_bookings: {
      ...state.filtered_bookings,
      error: `There was an error loading the data.`,
      status: 'error'
    }
  })),
  on(clearFilterBookingsResults, (state) => ({
    ...state,
    filtered_bookings: {
      ...state.filtered_bookings,
      bookings: null,
      status: 'initial',
      error: null
    }
  })),
)
