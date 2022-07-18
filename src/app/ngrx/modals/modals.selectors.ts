import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {ModalsState} from "./modals.reducer";

export const selectModals = (state: AppState) => state.modals;
export const getSeatModalData = createSelector(
  selectModals,
  (state: ModalsState) => state.seat
);
export const getBookingModalData = createSelector(
  selectModals,
  (state: ModalsState) => state.booking
);
