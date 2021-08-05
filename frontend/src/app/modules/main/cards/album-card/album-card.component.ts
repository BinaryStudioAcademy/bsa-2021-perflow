import { Component, Input } from '@angular/core';
import { Album } from '../../../../models/album';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.sass']
})
export class AlbumCardComponent {
  @Input() album! : Album;
}
