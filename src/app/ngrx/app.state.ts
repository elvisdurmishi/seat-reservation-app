import {AuthState} from "./auth/auth.reducer";
import {SeatsState} from "./seats/seats.reducer";
import {ModalsState} from "./modals/modals.reducer";
import {BookingsState} from "./bookings/bookings.reducer";
import {UsersState} from "./users/users.reducer";

export interface AppState {
  auth: AuthState;
  seats: SeatsState;
  modals: ModalsState;
  bookings: BookingsState;
  users: UsersState;
}
