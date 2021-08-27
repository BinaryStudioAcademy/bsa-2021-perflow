import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
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
}
