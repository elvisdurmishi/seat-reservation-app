export interface Seat {
  id: number,
  floor: string,
  name: string,
  order: number,
  status: "free" | "busy"
}
