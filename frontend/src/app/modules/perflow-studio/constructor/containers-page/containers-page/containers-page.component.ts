import { Component, OnInit } from '@angular/core';
import { ContainerView } from 'src/app/models/constructor/container-view';
import { ConstructorService } from 'src/app/services/constructor.service';

@Component({
  selector: 'app-containers-page',
  templateUrl: './containers-page.component.html',
  styleUrls: ['./containers-page.component.sass']
})
export class ContainersPageComponent implements OnInit {
  containers: ContainerView[] = [] as ContainerView[];

  constructor(
    private _constructorService: ConstructorService
  ) {

  }

  public ngOnInit() {
    this._constructorService.getAllContainersViews().subscribe(
      (resp) => {
        this.containers = resp.body!;
      }
    );
  }
}
