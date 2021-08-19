import { HttpResponse } from '@angular/common/http';
import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserChangeSettings } from 'src/app/models/user/user-change-settings';
import { UserSettings } from 'src/app/models/user/user-settings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit, OnDestroy {
  userSettings: UserSettings;
  qualityString: string;

  private _unsubscribe$ = new Subject<void>();

  constructor(private _userService: UserService) {}

  public ngOnInit() {
    this.getUserSettings();
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public getUserSettings() {
    this._userService
      .getUserSettings()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<UserSettings>) => {
          this.userSettings = resp.body!;
          switch (this.userSettings.quality) {
            case 0:
              this.qualityString = 'Low';
              break;
            case 1:
              this.qualityString = 'Medium';
              break;
            case 2:
              this.qualityString = 'High';
              break;
            case 3:
              this.qualityString = 'Very high';
              break;
            default:
              break;
          }
        }
      );
  }

  public updateUserSettings(userSettings: UserChangeSettings) {
    this._userService
      .updateUserSettings(userSettings)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
  }

  public changeLanguage(value: string) {
    this.userSettings.language = value;
    this.updateUserSettings(this.userSettings);
  }

  public changeQuality(value: number) {
    this.userSettings.quality = value;
    this.updateUserSettings(this.userSettings);
  }

  public changeShowExplicitContent() {
    this.userSettings.showExplicitContent = !this.userSettings.showExplicitContent;
    this.updateUserSettings(this.userSettings);
  }

  public changeAutoplay() {
    this.userSettings.autoplay = !this.userSettings.autoplay;
    this.updateUserSettings(this.userSettings);
  }

  public changeShowNewReleases() {
    this.userSettings.showNewReleases = !this.userSettings.showNewReleases;
    this.updateUserSettings(this.userSettings);
  }

  public changeShowFriendsPlaying() {
    this.userSettings.showFriendsPlaying = !this.userSettings.showFriendsPlaying;
    this.updateUserSettings(this.userSettings);
  }
}
