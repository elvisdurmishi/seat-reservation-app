import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {SeatsState} from "./seats.reducer";

export const selectSeats = (state: AppState) => state.seats;
export const getSeats = createSelector(
  selectSeats,
  (state: SeatsState) => state.seats
)
export const getFilteredSeats = createSelector(
  selectSeats,
  (state: SeatsState) => state.filtered_seats.seats
)
export const getSeatsStatus = createSelector(
  selectSeats,
  (state: SeatsState) => state.status
);
export const getFilteredSeatsStatus = createSelector(
  selectSeats,
  (state: SeatsState) => state.filtered_seats.status
);
export const getSeatsError = createSelector(
  selectSeats,
  (state: SeatsState) => state.error
);
export const getFilteredSeatsError = createSelector(
  selectSeats,
  (state: SeatsState) => state.filtered_seats.error
);
