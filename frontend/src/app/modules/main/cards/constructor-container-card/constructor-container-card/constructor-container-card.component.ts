import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Router } from '@angular/router';
import { ContainerView } from 'src/app/models/constructor/container-view';
import { ConstructorService } from 'src/app/services/constructor.service';

@Component({
  selector: 'app-constructor-container-card',
  templateUrl: './constructor-container-card.component.html',
  styleUrls: ['./constructor-container-card.component.sass']
})
export class ConstructorContainerCardComponent {
  @Input()
  container: ContainerView = {} as ContainerView;

  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(
    private _constructorService: ConstructorService,
    private _router: Router
  ) { }

  publishContainer = () => {
    this._constructorService.publishContainer(this.container).subscribe();
    this._router.navigateByUrl('/home');
  };

  redirectTo() {
    this.clickEmiter.emit();
    this._router.navigateByUrl(`/perflowstudio/constructor/edit/${this.container.id}`);
  }
}
