import {
  AfterViewInit, Directive, ElementRef, Input
} from '@angular/core';

declare global {
  interface JQuery {
    calendar(options: object): void;
  }
}

@Directive({
  selector: '[appSmCalendar]'
})

export class SemanticCalendarDirective implements AfterViewInit {
  private _minDaysCount: number = 10;

  @Input()
  calendarType: string;

  @Input()
  dateId: string;

  constructor(private _calendar: ElementRef) { }

  private _addLeadingZero(value: number): string {
    return (value < this._minDaysCount) ? `0${value}` : `${value}`;
  }

  private _formatDate(date: Date): string {
    const day = this._addLeadingZero(date.getDate());
    const month = this._addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  ngAfterViewInit() {
    $(this._calendar.nativeElement)
      .calendar({
        on: 'click',
        onChange: (date: Date) => {
          $(`#${this.dateId}`).val(this._formatDate(date));
        },
        type: this.calendarType
      });
  }
}
