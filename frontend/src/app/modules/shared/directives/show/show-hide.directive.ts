import {
  animate, AnimationBuilder, AnimationMetadata, style
} from '@angular/animations';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appShowHide]'
})
export class ShowHideDirective {
  constructor(private _builder: AnimationBuilder, private _el: ElementRef) {}

  toolbar!: HTMLElement;

  @Input()
  set show(show: boolean) {
    const metadata = show ? this._fadeIn() : this._fadeOut();

    const factory = this._builder.build(metadata);
    const player = factory.create(this._el.nativeElement);
    player.play();
  }

  private _fadeIn = (): AnimationMetadata[] => [
    style({ opacity: 0 }),
    animate('200ms ease-in', style({ opacity: 1 }))
  ];

  private _fadeOut = (): AnimationMetadata[] => [
    style({ opacity: '*' }),
    animate('200ms ease-in', style({ opacity: 0 }))
  ];
}
