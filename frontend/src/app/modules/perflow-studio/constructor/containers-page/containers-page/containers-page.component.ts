import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContainerView } from 'src/app/models/constructor/container-view';
import { ConstructorService } from 'src/app/services/constructor.service';

@Component({
  selector: 'app-containers-page',
  templateUrl: './containers-page.component.html',
  styleUrls: ['./containers-page.component.sass']
})
export class ContainersPageComponent implements OnInit {
  containers: ContainerView[] = [] as ContainerView[];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _constructorService: ConstructorService
  ) {

  }

  public ngOnInit() {
    this._constructorService.getAllContainersViews()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp) => {
          this.containers = resp.body!;
        }
      );
  }
}
