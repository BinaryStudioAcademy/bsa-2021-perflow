import { Component, Input } from '@angular/core';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';

@Component({
  selector: 'app-search-playlists-result',
  templateUrl: './search-playlists-result.component.html',
  styleUrls: ['./search-playlists-result.component.sass']
})
export class SearchPlaylistsResultComponent {
  @Input() playlists: Array<PlaylistView> = new Array<PlaylistView>();
  @Input() term: string;

  saveToSearchHistory = (playlist: PlaylistView) => {

  };
}
