import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  foundSongs: Array<Song> = new Array<Song>();
  searchValue: string;

  private _searchTerms = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(private _songService: SongsService) {}

  ngOnInit() {
    this.setSearch();
  }

  setSearch() {
    this._searchTerms.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._songService.getSongsByName(term))
    ).subscribe({
      next: (data) => {
        this.foundSongs = data;
      }
    });
  }

  findSongsByName() {
    if (this.searchValue.trim() !== '') {
      this._searchTerms.next(this.searchValue);
    }
    else {
      this.foundSongs = [];
    }
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.foundSongs = new Array<Song>();
    }
  }
}
