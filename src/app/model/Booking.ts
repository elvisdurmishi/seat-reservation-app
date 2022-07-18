import {DateRange} from "./DateRange";

export interface Booking {
  id?: number,
  userId: number,
  seatId: number,
  date: DateRange,
}
