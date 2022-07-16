import {AuthState} from "./auth/auth.reducer";
import {RoomState} from "./rooms/rooms.reducer";

export interface AppState {
  auth: AuthState;
  room: RoomState;
}
