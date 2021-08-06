import {
  AfterViewInit, Directive, ElementRef, Input
} from '@angular/core';

declare global {
  interface JQuery {
    calendar(options:object): void;
  }
}

@Directive({
  selector: '[appSmCalendar]'
})

export class SemanticCalendarDirective implements AfterViewInit {
  @Input() calendarType:string;

  constructor(private _calendar: ElementRef) { }

  ngAfterViewInit() {
    $(this._calendar.nativeElement)
      .calendar({
        on: 'click',
        type: this.calendarType,
        monthFirst: false,
        formatter: {
          date: (date:Date) => {
            if (!date) return '';
            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
          }
        }
      });
  }
}
