import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContainerView } from 'src/app/models/constructor/container-view';
import { ConfirmationPageService } from 'src/app/services/confirmation-page.service';
import { ConstructorService } from 'src/app/services/constructor.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-constructor-container-card',
  templateUrl: './constructor-container-card.component.html',
  styleUrls: ['./constructor-container-card.component.sass']
})
export class ConstructorContainerCardComponent {
  private _unsubscribe$ = new Subject<void>();

  @Input()
  container: ContainerView = {} as ContainerView;

  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(
    private _constructorService: ConstructorService,
    private _router: Router,
    private _snackbarService: SnackbarService,
    private _confirmationService: ConfirmationPageService
  ) { }

  publishContainer = () => {
    this._constructorService.publishContainer(this.container)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
    this._router.navigateByUrl('/home');
  };

  deleteContainer = () => {
    this._constructorService.deleteContainer(this.container.id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp) => {
          this._snackbarService.show({
            header: 'Success!',
            message: 'Container successfully deleted.'
          });
          this._router.navigateByUrl('/perflowstudio/constructor');
        }
      );
  };

  initConfirmDeleteConstructor() {
    this._confirmationService
      .initConfirmation(
        'Are you sure you want to delete this container?',
        () => {
          this.deleteContainer();
        },
        () => {}
      );
  }

  redirectTo() {
    this.clickEmiter.emit();
    this._router.navigateByUrl(`/perflowstudio/constructor/edit/${this.container.id}`);
  }
}
