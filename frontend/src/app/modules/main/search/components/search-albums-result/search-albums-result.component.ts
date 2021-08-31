import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { take } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { PageSectionEntityFull } from 'src/app/models/constructor/page-section-entity-full';
import { WriteSearchHistory } from 'src/app/models/search/write-search-history';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-search-albums-result',
  templateUrl: './search-albums-result.component.html',
  styleUrls: ['./search-albums-result.component.sass']
})
export class SearchAlbumsResultComponent {
  @Input() albums: Array<AlbumForReadDTO> = new Array<AlbumForReadDTO>();
  @Input() term: string;
  @Input() isCheckBox: boolean = false;
  @Input() currentAlbums: PageSectionEntityFull[];

  @Output()
  addDeleteFromSection = new EventEmitter<AlbumForReadDTO>();

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

  saveToSearchHistory = (album: AlbumForReadDTO) => {
    const history = {
      userId: this._userId,
      albumId: album.id
    } as WriteSearchHistory;

    this._searchHistoryService.addSearchHistory(history)
      .pipe(take(1)).subscribe();
  };
  drop(event: CdkDragDrop<any[]>) {
    if (event.container.id === event.previousContainer.id) {
      // move inside same list
      moveItemInArray(this.albums, event.previousIndex, event.currentIndex);
    }
    else {
      // move between lists
    }
  }

  addDeleteFromSectionEvent(album: AlbumForReadDTO) {
    this.addDeleteFromSection.emit(album);
  }

  isChecked(album: AlbumForReadDTO) {
    return this.currentAlbums.findIndex((a) => a.referenceId === album.id) !== -1;
  }
}
