import {
  AfterViewChecked, Directive, ElementRef, OnDestroy, OnInit
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appHideScrollButtons]'
})
export class HideScrollButtonsDirective implements OnInit, OnDestroy, AfterViewChecked {
  private _resizeObservable$: Observable<Event>;
  private _resizeSubscription$: Subscription;
  private _el: HTMLElement;

  constructor(private _elRef: ElementRef) {
    this._el = <HTMLElement>_elRef.nativeElement;
  }

  ngOnInit() {
    this._resizeObservable$ = fromEvent(window, 'resize');
    this._resizeSubscription$ = this._resizeObservable$.subscribe((evt) => {
      this.displayHideArrowButton();
    });
  }

  ngAfterViewChecked(): void {
    this.displayHideArrowButton();
  }

  ngOnDestroy() {
    this._resizeSubscription$.unsubscribe();
  }

  displayHideArrowButton() {
    const arrowLeft = this._el!.previousElementSibling;
    const arrowRight = this._el!.nextElementSibling;

    if (this._el?.scrollWidth! / (this._el?.clientWidth! + arrowLeft?.clientWidth! + arrowRight?.clientWidth!) > 1) {
      arrowLeft?.classList.remove('hidden');
      arrowRight?.classList.remove('hidden');
    }
    else {
      arrowLeft?.classList.add('hidden');
      arrowRight?.classList.add('hidden');
    }
  }
}
