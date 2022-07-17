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
