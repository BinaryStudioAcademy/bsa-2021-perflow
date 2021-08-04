import { Directive, ElementRef } from '@angular/core';

declare global {
  interface JQuery {
    dropdown(): void;
  }
}

@Directive({
  selector: '[sm-dropdown]'
})
export class SemanticDropdownDirective {
  constructor(private dropdown: ElementRef) { }

  ngAfterViewInit() {
    (this.dropdown.nativeElement).dropdown();
  }
}
