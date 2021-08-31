import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { take } from 'rxjs/operators';
import { PageSectionEntityFull } from 'src/app/models/constructor/page-section-entity-full';
import { WriteSearchHistory } from 'src/app/models/search/write-search-history';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-search-artists-result',
  templateUrl: './search-artists-result.component.html',
  styleUrls: ['./search-artists-result.component.sass']
})
export class SearchArtistsResultComponent {
  @Input() artists: Array<ArtistReadDTO> = new Array<ArtistReadDTO>();
  @Input() term: string;
  @Input() isCheckBox: boolean = false;
  @Input() currentArtists: PageSectionEntityFull[];

  @Output()
  addDeleteFromSection = new EventEmitter<ArtistReadDTO>();

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

  saveToSearchHistory = (artist: ArtistReadDTO) => {
    const history = {
      userId: this._userId,
      artistId: artist.id
    } as WriteSearchHistory;

    this._searchHistoryService.addSearchHistory(history)
      .pipe(take(1)).subscribe();
  };
  drop(event: CdkDragDrop<any[]>) {
    if (event.container.id === event.previousContainer.id) {
      // move inside same list
      moveItemInArray(this.artists, event.previousIndex, event.currentIndex);
    }
    else {
      // move between lists
    }
  }

  addDeleteFromSectionEvent(artist: ArtistReadDTO) {
    this.addDeleteFromSection.emit(artist);
  }

  isChecked(artist: ArtistReadDTO) {
    return this.currentArtists.findIndex((a) => a.referenceId === artist.id) !== -1;
  }
}
