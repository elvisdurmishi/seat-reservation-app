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

export const deleteBooking = createAction(
  "[Manager Dashboard] Delete Booking",
  props<{ payload: {bookingId: number}}>()
)

export const deleteBookingSuccess = createAction(
  "[Manager Dashboard] Delete Booking Success",
  props<{ payload: {bookings: Booking[]} }>()
)

export const deleteBookingFailure = createAction(
  "[Manager Dashboard] Delete Booking Failure",
  props<{ error: string }>()
)


export const loadSeatBookings = createAction(
  "[Dashboard] Load Seat Bookings",
  props<{payload: { seatId: number }}>()
)

export const loadSeatBookingsSuccess = createAction(
  "[Dashboard] Load Seat Bookings Success",
  props<{payload: { bookings: Booking[] }}>()
)

export const loadSeatBookingsFailure = createAction(
  "[Dashboard] Load Seat Bookings Failure",
  props<{ error: string }>()
)

export const clearBookingsList = createAction(
  "[Dashboard] Clear Booking List",
)

export const loadFilteredBookings = createAction(
  "[Manager Dashboard] Load Filtered Bookings",
  props<{ payload: { seatId: number, filters: any } }>()
)

export const loadFilteredBookingsSuccess = createAction(
  "[Manager Dashboard] Load Filtered Bookings Success",
  props<{ payload: { bookings: Booking[] } }>()
)


export const loadFilteredBookingsFailure = createAction(
  "[Manager Dashboard] Load Filtered Bookings Failure",
)

export const clearFilterBookingsResults = createAction(
  "[Manager Dashboard] Clear Filter Bookings Results",
)

export const loadMySeatBookings = createAction(
  "[User Bookings] Load My Seat Bookings",
  props<{payload: { userId: number | undefined}}>()
)

export const loadMySeatBookingsSuccess = createAction(
  "[User Bookings] Load My Seat Bookings Success",
  props<{payload: { bookings: Booking[] }}>()
)

export const loadMySeatBookingsFailure = createAction(
  "[User Bookings] Load My Seat Bookings Failure",
  props<{ error: string }>()
)


export const loadMyFilteredBookings = createAction(
  "[User Bookings] Load My Filtered Bookings",
  props<{ payload: { userId: number | undefined, filters: any } }>()
)

export const loadMyFilteredBookingsSuccess = createAction(
  "[User Bookings] Load My Filtered Bookings Success",
  props<{ payload: { bookings: Booking[] } }>()
)


export const loadMyFilteredBookingsFailure = createAction(
  "[User Bookings] Load My Filtered Bookings Failure",
)

export const clearMyFilteredBookingsResults = createAction(
  "[User Bookings] Clear My Filtered Bookings Results",
)
