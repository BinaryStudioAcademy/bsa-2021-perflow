import { Directive, ElementRef, Input } from "@angular/core";
declare let $: any;

@Directive({
  selector: '[sm-popup]'
})
export class SemanticPopupDirective {
  @Input() positon: string;
  @Input() delay: number;


  constructor(private dropdown: ElementRef) { }

  ngAfterViewInit(): void {
    $(this.dropdown.nativeElement).popup({
      position: this.positon,
      delay: {
        show: this.delay
      }
    });
  }

}