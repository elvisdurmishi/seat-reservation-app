import {createAction, props} from "@ngrx/store";
import {Booking} from "../../model/Booking";

export const loadBookings = createAction(
  "[Dashboard] Load Bookings",
);

export const loadBookingsSuccess = createAction(
  "[Dashboard] Load Bookings Success",
  props<{ payload: { bookings: Booking[] } }>()
)

export const loadBookingsFailure = createAction(
  "[Dashboard] Load Bookings Failure",
)

export const bookSeat = createAction(
  "[Dashboard] Book Seat",
  props<{ payload: {booking: Booking} }>()
)

export const bookSeatSuccess = createAction(
  "[Dashboard] Book Seat Success",
  props<{ payload: {bookings: Booking[]} }>()
)

export const bookSeatFailure = createAction(
  "[Dashboard] Book Seat Failure",
  props<{ error: string }>()
)
