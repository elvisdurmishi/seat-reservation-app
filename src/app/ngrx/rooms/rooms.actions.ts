import {createAction, props} from "@ngrx/store";
import {Room} from "../../model/Room";

export const loadRooms = createAction(
  "[Dashboard] Load Rooms"
)

export const loadRoomsSuccess = createAction(
  "[Dashboard] Load Rooms Success",
  props<{payload: {rooms: Room[]}}>()
)

export const loadRoomsFailure = createAction(
  "[Dashboard] Load Rooms Failure",
  props<{ error: string }>()
)
