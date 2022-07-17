export interface Seat {
  id: number,
  number: number,
  location: string,
  status: "free" | "busy"
}
