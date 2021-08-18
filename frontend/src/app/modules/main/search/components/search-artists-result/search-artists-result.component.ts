import { Component } from '@angular/core';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';

@Component({
  selector: 'app-search-artists-result',
  templateUrl: './search-artists-result.component.html',
  styleUrls: ['./search-artists-result.component.sass']
})
export class SearchArtistsResultComponent {
  artist: ArtistReadDTO = {
    id!: 1,
    userName!: 'Sting',
    iconURL!:
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid'
    + '=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGh1bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  };
}
