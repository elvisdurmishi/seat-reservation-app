export interface Seat {
  id: number,
  number: number,
  location: "main" | "second",
  status?: "free" | "busy"
}
