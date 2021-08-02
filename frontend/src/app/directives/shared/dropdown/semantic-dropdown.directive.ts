import { Directive, ElementRef } from "@angular/core";
declare let $: any;

@Directive({
  selector: '[sm-dropdown]'
})
export class SemanticDropdownDirective {

  constructor(private dropdown: ElementRef) { }

  ngAfterViewInit(): void {
    $(this.dropdown.nativeElement).dropdown();
  }
}
