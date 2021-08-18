import { Component } from '@angular/core';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';

@Component({
  selector: 'app-search-albums-result',
  templateUrl: './search-albums-result.component.html',
  styleUrls: ['./search-albums-result.component.sass']
})
export class SearchAlbumsResultComponent {
  album: AlbumForReadDTO = {
    id: 1,
    name: 'All this time',
    releaseYear: 2001,
    iconURL: 'https://upload.wikimedia.org/wikipedia/ru/6/66/Allthistime.jpg',
    author: {
      name: 'Sting',
      id: 1,
      isArtist: true
    }
  };
}
