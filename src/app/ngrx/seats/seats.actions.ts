import {createAction, props} from "@ngrx/store";
import {Seat} from "../../model/Seat";

export const loadSeats = createAction(
  "[Dashboard] Load Seats",
);

export const loadSeatsSuccess = createAction(
  "[Dashboard] Load Seats Success",
  props<{ payload: { seats: Seat[] } }>()
)

export const loadSeatsFailure = createAction(
  "[Dashboard] Load Seats Failure",
)

export const saveSeat = createAction(
  "[Manager Dashboard] Save Seat",
  props<{ payload: {seat: Seat} }>()
)

export const saveSeatSuccess = createAction(
  "[Manager Dashboard] Save Seat Success",
  props<{ payload: {seats: Seat[]} }>()
)

export const saveSeatFailure = createAction(
  "[Manager Dashboard] Save Seat Failure",
  props<{ error: string }>()
)

export const deleteSeat = createAction(
  "[Manager Dashboard] Delete Seat",
  props<{ payload: {seatId: number}}>()
)

export const deleteSeatSuccess = createAction(
  "[Manager Dashboard] Delete Seat Success",
  props<{ payload: {seats: Seat[]} }>()
)

export const deleteSeatFailure = createAction(
  "[Manager Dashboard] Delete Seat Failure",
  props<{ error: string }>()
)

export const loadFilteredSeats = createAction(
  "[Manager Dashboard] Load Filtered Seats",
  props<{ payload: { filters: any } }>()
)

export const loadFilteredSeatsSuccess = createAction(
  "[Manager Dashboard] Load Filtered Seats Success",
  props<{ payload: { seats: Seat[] } }>()
)


export const loadFilteredSeatsFailure = createAction(
  "[Manager Dashboard] Load Filtered Seats Failure",
)

export const clearFilterResults = createAction(
  "[Manager Dashboard] Clear Filter Results",
)
