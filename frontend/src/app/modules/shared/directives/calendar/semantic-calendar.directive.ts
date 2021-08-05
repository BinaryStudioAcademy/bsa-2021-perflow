import { Directive, ElementRef, Input } from "@angular/core";

declare global {
  interface JQuery {
    calendar(options:object): void;
  }
}

@Directive({
  selector: '[sm-calendar]'
})

export class SemanticCalendarDirective {
  @Input() calendarType:string;

  constructor(private dropdown: ElementRef) { }

  ngAfterViewInit() {
    $(this.dropdown.nativeElement)
    .calendar({
      on:'click',
      type:this.calendarType,
      monthFirst: false,
      formatter: {
        date: (date:Date) => {
          if (!date) return '';
          var day = date.getDate() <10 ? `0${date.getDate()}`: date.getDate();
          var month = date.getMonth() + 1<10? `0${date.getMonth() + 1}`: date.getMonth() + 1;
          var year = date.getFullYear();
          return year + '-' + month + '-' + day;
        }
      }
    });
  }

}
