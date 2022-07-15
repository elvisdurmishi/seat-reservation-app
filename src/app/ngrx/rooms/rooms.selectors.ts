import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {RoomState} from "./rooms.reducer";

export const selectAuth = (state: AppState) => state.rooms;
export const getRoomState = createSelector(
  selectAuth,
  (state: RoomState) => state
)
export const getRooms = createSelector(
  selectAuth,
  (state: RoomState) => state.rooms
);
export const getRoomsStatus = createSelector(
  selectAuth,
  (state: RoomState) => state.status
);
export const getRoomsError = createSelector(
  selectAuth,
  (state: RoomState) => state.error
);
