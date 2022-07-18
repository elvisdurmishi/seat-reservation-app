import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {BookingsState} from "./bookings.reducer";

export const selectBookings = (state: AppState) => state.bookings;
export const getBookings = createSelector(
  selectBookings,
  (state: BookingsState) => state.bookings
)
