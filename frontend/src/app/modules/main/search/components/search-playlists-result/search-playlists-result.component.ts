import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { take } from 'rxjs/operators';
import { PageSectionEntityFull } from 'src/app/models/constructor/page-section-entity-full';
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
  @Input() isCheckBox: boolean = false;
  @Input() currentPlaylists: PageSectionEntityFull[];

  @Output()
  addDeleteFromSection = new EventEmitter<PlaylistView>();
  private _userId: number;

  constructor(
    private _searchHistoryService: SearchHistoryService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(take(1))
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
      .pipe(take(1)).subscribe();
  };

  drop(event: CdkDragDrop<any[]>) {
    if (event.container.id === event.previousContainer.id) {
      // move inside same list
      moveItemInArray(this.playlists, event.previousIndex, event.currentIndex);
    }
    else {
      // move between lists
    }
  }

  addDeleteFromSectionEvent(playlist: PlaylistView) {
    this.addDeleteFromSection.emit(playlist);
  }

  isChecked(playlist: PlaylistView) {
    return this.currentPlaylists.findIndex((pl) => pl.referenceId === playlist.id) !== -1;
  }
}
