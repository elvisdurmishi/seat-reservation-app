import {Booking} from "./Booking";

export interface User {
  id?: number,
  role: string,
  name: string,
  email: string,
  password?: string,
  bookings: Booking[]
}
