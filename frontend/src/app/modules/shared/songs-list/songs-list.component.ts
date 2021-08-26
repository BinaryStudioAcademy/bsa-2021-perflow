import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SongsService } from 'src/app/services/songs/songs.service';
import { UserService } from 'src/app/services/user.service';
import { Song } from '../../../models/song/song';
import { SongSortType } from '../../../models/song/song-sort-type';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.sass']
})
export class SongsListComponent {
  public filterExplicit: boolean;

  @Input() songs: Song[];
  @Input() highlightId: number;
  @Input() isDraggable = false;
  @Input() isEditable = false;
  @Input() isPlaying = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();
  @Output() togglePlayEvent = new EventEmitter<void>();

  sortType: SongSortType | null = null;

  constructor(
    private _songService: SongsService,
    private _userService: UserService
  ) {
    this._userService.getUserSettings().subscribe(
      (resp) => {
        this.filterExplicit = resp.body?.showExplicitContent!;
        if (!this.filterExplicit) {
          this.songs = this.songs?.filter((s) => !s.hasCensorship);
        }
      }
    );
  }

  drop(event: CdkDragDrop<Song[]>) {
    moveItemInArray(this.songs, event.previousIndex, event.currentIndex);

    const orders = this.songs.map((s, index) => ({ id: s.id, order: index }));

    const subscription = this._songService.updateOrders(orders).subscribe(() => {
      subscription.unsubscribe();
    });
  }

  setSortType(sortType: SongSortType | null) {
    this.sortType = sortType;
  }

  rowMenuClick = (data: { menuItem: string, song: Song }) => {
    this.clickMenuItem.emit(data);
  };

  clickDislikeIcon(songId: number) {
    this.clickDislike.emit(songId);
  }

  togglePlay = () => {
    this.togglePlayEvent.emit();
  };
}
