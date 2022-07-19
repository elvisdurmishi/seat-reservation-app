import {DateRange} from "./DateRange";

export interface Booking {
  id: number,
  userId: number,
  userName: string,
  seatId: number,
  date: DateRange,
}
