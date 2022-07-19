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

export const getSeatBookingStatus = createSelector(
  selectBookings,
  (state: BookingsState) => state.selected_seat.status
)

export const getSeatBookingError = createSelector(
  selectBookings,
  (state: BookingsState) => state.selected_seat.error
)
