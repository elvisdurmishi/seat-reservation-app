import {Row} from "./Row";

export interface Room {
  id?: number,
  name: string,
  rows: Row[],
  seats: number,
  layout: string
}
