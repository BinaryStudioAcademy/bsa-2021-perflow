import { Subject } from 'rxjs';
import { HubConnection } from '@microsoft/signalr';
import { takeUntil } from 'rxjs/operators';
import { HubFactoryService } from './hub-factory.service';
import { SnackbarService } from '../snackbar.service';

export abstract class BaseHubService {
  protected unsubscribe$ = new Subject<void>();

  protected hubConnection: HubConnection;

  protected constructor(
    private _hubFactory: HubFactoryService,
    private _snackbarService: SnackbarService
  ) { }

  protected abstract get hubUrl(): string;

  start() {
    this._hubFactory.createHub(this.hubUrl)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(async (connection) => {
        if (!connection) {
          return;
        }

        this.hubConnection = connection;

        await this.hubConnection
          .start()
          .catch((error) => {
            this._snackbarService.show({ type: 'error', header: 'Error occurred!', message: error });
          });

        await this.onStart();
      });
  }

  protected abstract onStart(): void | Promise<void>;

  async stop() {
    await this.hubConnection.stop();
    this.unsubscribe$.next();
  }
}
