import {AuthState} from "./auth/auth.reducer";
import {SeatsState} from "./seats/seats.reducer";

export interface AppState {
  auth: AuthState;
  seats: SeatsState;
}
