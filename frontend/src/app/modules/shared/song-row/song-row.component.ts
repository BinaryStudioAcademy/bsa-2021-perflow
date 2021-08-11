import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { Song } from 'src/app/models/song/song';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent {
  @Input() song: Song;
  @Input() number: number;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickLike = new EventEmitter<number>();

  clickItem(menu: string) {
    this.clickMenuItem.emit({ menuItem: menu, song: this.song });
  }

  clickLikeIcon(songId: number) {
    this.clickLike.emit(songId);
  }
}
