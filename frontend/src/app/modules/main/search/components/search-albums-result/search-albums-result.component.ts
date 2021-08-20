import { Component, Input } from '@angular/core';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';

@Component({
  selector: 'app-search-albums-result',
  templateUrl: './search-albums-result.component.html',
  styleUrls: ['./search-albums-result.component.sass']
})
export class SearchAlbumsResultComponent {
  @Input() albums: Array<AlbumForReadDTO> = new Array<AlbumForReadDTO>();
  @Input() term: string;
}
