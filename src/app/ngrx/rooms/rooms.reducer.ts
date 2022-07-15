import {createReducer, on} from "@ngrx/store";
import {
  loadRooms, loadRoomsFailure, loadRoomsSuccess,
} from "./rooms.actions";
import {Room} from "../../model/Room";

export interface RoomState {
  rooms: Room[] | null,
  error: string | null,
  status: 'initial' | 'loading' | 'error' | 'success',
}

export const initialState: RoomState = {
  rooms: null,
  error: null,
  status: 'initial',
}

export const roomReducer = createReducer(
  initialState,
  on(loadRooms, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(loadRoomsSuccess, (state, {payload}) => ({
    ...state,
    rooms: payload.rooms,
    error: null,
    status: 'success',
  })),
  on(loadRoomsFailure, (state, {error}) => ({
    ...state,
    error: `There was a problem loading the rooms. ${error}`,
    status: 'error'
  })),
)
