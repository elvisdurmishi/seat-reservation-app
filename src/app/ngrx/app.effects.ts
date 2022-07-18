import {AuthEffects} from "./auth/auth.effects";
import {SeatsEffects} from "./seats/seats.effects";
import {ModalsEffects} from "./modals/modals.effects";
import {BookingsEffects} from "./bookings/bookings.effects";

export const appEffects = [
  AuthEffects,
  SeatsEffects,
  ModalsEffects,
  BookingsEffects,
]
