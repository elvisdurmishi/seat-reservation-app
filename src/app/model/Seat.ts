export interface Seat {
  id: number,
  roomId: number,
  rowOrder: number,
  seatOrder: 1,
  status: "free" | "busy" | "disabled",
  availability: {
    from: {
      year: number,
      month: number,
      day: number
    },
    to: {
      year: number,
      month: number,
      day: number
    }
  },
}
