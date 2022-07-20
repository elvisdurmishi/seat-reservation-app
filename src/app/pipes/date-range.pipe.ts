import { Pipe, PipeTransform } from '@angular/core';
import {DateRange} from "../model/DateRange";

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  transform(date: DateRange, ...args: unknown[]): unknown {
    return `From: ${date.from.day}-${date.from.month}-${date.from.year}
            To: ${date.to.day}-${date.to.month}-${date.to.year}`;
  }
}
