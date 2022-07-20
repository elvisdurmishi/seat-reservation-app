import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {DateRange} from "../../../model/DateRange";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input() fromDate!: NgbDate | null;
  @Input() toDate!: NgbDate | null;
  @Input() disabledDates: DateRange[] = [];
  @Input() hasMinDate!: boolean;
  @Output() onDateSelection = new EventEmitter();
  hoveredDate: NgbDate | null = null;
  faCalendar = faCalendar;
  minDate: NgbDateStruct = this.calendar.getToday();
  maxDate: NgbDate = this.calendar.getNext(this.calendar.getToday(), 'd', 60);

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { }

  ngOnInit(): void {
    this.minDate = this.hasMinDate ? this.calendar.getToday() : this.calendar.getPrev(this.calendar.getToday(), 'd', 60);
  }

  onSelect(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && (date.equals(this.fromDate) || date.after(this.fromDate))) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.onDateSelection.emit({from: this.fromDate, to: this.toDate});
  }

  isDisabled = (date: NgbDate) => {
    return !!this.disabledDates.find(x => this.inReservedDateRange(x, date));
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  inReservedDateRange(date: DateRange, currentDate: NgbDate) {
    const {from, to} = date;
    let current = new Date(currentDate.year, currentDate.month - 1, currentDate.day);

    let fromDate = new Date(from.year, from.month - 1, from.day);
    let toDate   = new Date(to.year, to.month - 1, to.day);

    return current >= fromDate && current <= toDate;
  }
}
