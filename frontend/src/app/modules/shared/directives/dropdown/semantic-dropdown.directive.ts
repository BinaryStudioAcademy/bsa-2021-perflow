import { AfterViewInit, Directive, ElementRef } from '@angular/core';

declare global {
  interface JQuery {
    dropdown(): void;
  }
}

@Directive({
  selector: '[appSmDropdown]'
})
export class SemanticDropdownDirective implements AfterViewInit {
  constructor(private _dropdown: ElementRef) { }

  ngAfterViewInit() {
    (this._dropdown.nativeElement).dropdown();
  }
}
