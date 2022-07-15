import {authReducer} from "./auth/auth.reducer";
import {roomReducer} from "./rooms/rooms.reducer";

export const appReducers = {
  auth: authReducer,
  rooms: roomReducer,
}
