import {
  AfterViewInit, Directive, ElementRef, Input
} from '@angular/core';

declare global {
  interface JQuery {
    dropdown(action: string): void;
    dropdown(settings: object): void;
    dropdown(settings: string, object: any): void;
  }
}

@Directive({
  selector: '[appSmDropdown]'
})
export class SemanticDropdownDirective implements AfterViewInit {
  @Input() allowAdditions: boolean = false;
  @Input() showOnFocus: boolean = false;
  @Input() forceSelection: boolean = false;

  constructor(private _dropdown: ElementRef) { }

  ngAfterViewInit() {
    $(this._dropdown.nativeElement).dropdown({
      showOnFocus: this.showOnFocus,
      allowAdditions: this.allowAdditions,
      forceSelection: this.forceSelection
    });
  }
}
