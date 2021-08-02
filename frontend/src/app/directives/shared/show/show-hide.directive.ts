import {
  animate, AnimationBuilder, AnimationMetadata, style
} from '@angular/animations';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appShowHide]'
})
export class ShowHideDirective {
  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  toolbar!: HTMLElement;

  @Input()
  set show(show: boolean) {
    const metadata = show ? this.fadeIn() : this.fadeOut();

    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);
    player.play();
  }

  private fadeIn(): AnimationMetadata[] {
    return [
      style({ opacity: 0 }),
      animate('200ms ease-in', style({ opacity: 1 }))
    ];
  }

  private fadeOut(): AnimationMetadata[] {
    return [
      style({ opacity: '*' }),
      animate('200ms ease-in', style({ opacity: 0 }))
    ];
  }
}
