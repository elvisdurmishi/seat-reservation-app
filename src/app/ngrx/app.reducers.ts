import {authReducer} from "./auth/auth.reducer";
import {seatsReducer} from "./seats/seats.reducer";
import {modalsReducer} from "./modals/modals.reducer";
import {bookingsReducer} from "./bookings/bookings.reducer";

export const appReducers = {
  auth: authReducer,
  seats: seatsReducer,
  modals: modalsReducer,
  bookings: bookingsReducer,
}
