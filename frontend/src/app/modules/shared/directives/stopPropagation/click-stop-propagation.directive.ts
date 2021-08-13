/*eslint class-methods-use-this: ["error", { "exceptMethods": ["onClick"] }] */

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickStopPropagation]'
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(event: any) {
    event.stopPropagation();
  }
}
