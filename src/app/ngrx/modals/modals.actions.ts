import {createAction, props} from "@ngrx/store";
import {Seat} from "../../model/Seat";

export const openSeatModal = createAction(
  "[Dashboard] Open Seat Modal",
  props<{ payload: {seat: Seat | null } }>()
);
