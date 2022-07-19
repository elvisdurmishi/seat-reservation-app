import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {BookingsState} from "./bookings.reducer";

export const selectBookings = (state: AppState) => state.bookings;
export const getBookings = createSelector(
  selectBookings,
  (state: BookingsState) => state.bookings
)
export const getSeatBookings = createSelector(
  selectBookings,
  (state: BookingsState) => state.selected_seat.bookings
)

export const getMySeatBookings = createSelector(
  selectBookings,
  (state: BookingsState) => state.my_bookings.bookings
)

export const getMySeatBookingStatus = createSelector(
  selectBookings,
  (state: BookingsState) => state.my_bookings.status
)

export const getMySeatBookingError = createSelector(
  selectBookings,
  (state: BookingsState) => state.my_bookings.error
)

export const getFilteredBookings = createSelector(
  selectBookings,
  (state: BookingsState) => state.filtered_bookings.bookings
)

export const getMyFilteredBookings = createSelector(
  selectBookings,
  (state: BookingsState) => state.my_filtered_bookings.bookings
)

export const getSeatBookingStatus = createSelector(
  selectBookings,
  (state: BookingsState) => state.selected_seat.status
)

export const getSeatBookingError = createSelector(
  selectBookings,
  (state: BookingsState) => state.selected_seat.error
)
