import { Directive, ElementRef } from '@angular/core';

declare global {
  interface JQuery {
    dropdown(): void;
  }
}

@Directive({
  selector: '[appSmDropdown]'
})
export class SemanticDropdownDirective {
  constructor(private _dropdown: ElementRef) { }

  ngAfterViewInit() {
    $(this._dropdown.nativeElement).dropdown();
  }
}
