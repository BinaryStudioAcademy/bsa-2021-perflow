import { AfterViewInit, Directive, ElementRef } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[appUIDropdown]'
})
export class UIDropdownDirective implements AfterViewInit {
  constructor(private _dropdown: ElementRef) {}

  ngAfterViewInit(): void {
    $(this._dropdown.nativeElement).dropdown();
  }
}
