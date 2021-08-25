import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { WriteSearchHistory } from 'src/app/models/search/write-search-history';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-search-playlists-result',
  templateUrl: './search-playlists-result.component.html',
  styleUrls: ['./search-playlists-result.component.sass']
})
export class SearchPlaylistsResultComponent {
  @Input() playlists: Array<PlaylistView> = new Array<PlaylistView>();
  @Input() term: string;

  private _userId: number;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _searchHistoryService: SearchHistoryService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  saveToSearchHistory = (playlist: PlaylistView) => {
    const history = {
      userId: this._userId,
      playlistId: playlist.id
    } as WriteSearchHistory;

    this._searchHistoryService.addSearchHistory(history)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: () => {
          this._unsubscribe$.next();
          this._unsubscribe$.complete();
        }
      });
  };
}
