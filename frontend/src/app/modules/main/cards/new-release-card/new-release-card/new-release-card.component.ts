import { Component, Input } from '@angular/core';
import { AlbumAuthor } from 'src/app/models/user/album-author';

@Component({
  selector: 'app-new-release-card',
  templateUrl: './new-release-card.component.html',
  styleUrls: ['./new-release-card.component.sass']
})
export class NewReleaseCardComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() authors: Array<AlbumAuthor>;
  @Input() iconUrl: string;
}
