import { Component, Input } from '@angular/core';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';

@Component({
  selector: 'app-search-artists-result',
  templateUrl: './search-artists-result.component.html',
  styleUrls: ['./search-artists-result.component.sass']
})
export class SearchArtistsResultComponent {
  @Input() artists: Array<ArtistReadDTO> = new Array<ArtistReadDTO>();
}
