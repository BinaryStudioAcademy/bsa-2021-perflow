import { Component } from '@angular/core';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';

@Component({
  selector: 'app-search-playlists-result',
  templateUrl: './search-playlists-result.component.html',
  styleUrls: ['./search-playlists-result.component.sass']
})
export class SearchPlaylistsResultComponent {
  playlist = {
    id: 1,
    name: 'Sting forever',
    description: 'The best from Sting',
    iconURL:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/'
    + '7e/Sting_21111985_06_700.jpg/250px-Sting_21111985_06_700.jpg'
  } as PlaylistView;
}
