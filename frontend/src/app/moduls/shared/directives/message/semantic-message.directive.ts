import { Directive, ElementRef } from "@angular/core";

declare global {
  interface JQuery {
    transition(option: string): void;
  }
}

@Directive({
  selector: '[sm-message]'
})

export class SemanticMessageDirective {

  constructor(private message: ElementRef) { }

  ngAfterViewInit() {
    let element = $(this.message.nativeElement);
    element.on('click', () => element.closest('.message').transition('fade'));
  }

}
