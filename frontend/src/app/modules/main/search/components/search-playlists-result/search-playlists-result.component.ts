import { Component } from '@angular/core';

@Component({
  selector: 'app-search-playlists-result',
  templateUrl: './search-playlists-result.component.html',
  styleUrls: ['./search-playlists-result.component.sass']
})
export class SearchPlaylistsResultComponent {
  name = 'Sting forever';
  image =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sting_21111985_06_700.jpg/250px-Sting_21111985_06_700.jpg';
  songs: string[] = [
    'If You Love Somebody Set Them Free',
    'Love Is the Seventh Wave',
    'Russians',
    'Childrens Crusade'
  ];
}
