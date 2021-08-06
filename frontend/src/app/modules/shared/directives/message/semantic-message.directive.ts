import { AfterViewInit, Directive, ElementRef } from '@angular/core';

declare global {
  interface JQuery {
    transition(option: string): void;
  }
}

@Directive({
  selector: '[appSmMessage]'
})

export class SemanticMessageDirective implements AfterViewInit {
  constructor(private _message: ElementRef) { }

  ngAfterViewInit() {
    const element = $(this._message.nativeElement);
    element.on('click', () => element.closest('.message').transition('fade'));
  }
}
