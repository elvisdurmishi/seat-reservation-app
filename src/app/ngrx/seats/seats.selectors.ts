import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {SeatsState} from "./seats.reducer";

export const selectSeats = (state: AppState) => state.seats;
export const getSeats = createSelector(
  selectSeats,
  (state: SeatsState) => state.seats
)
export const getSeatsStatus = createSelector(
  selectSeats,
  (state: SeatsState) => state.status
);
export const getSeatsError = createSelector(
  selectSeats,
  (state: SeatsState) => state.error
);
