import {authReducer} from "./auth/auth.reducer";
import {seatsReducer} from "./seats/seats.reducer";

export const appReducers = {
  auth: authReducer,
  seats: seatsReducer,
}
