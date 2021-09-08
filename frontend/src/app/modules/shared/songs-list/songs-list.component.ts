import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SongsService } from 'src/app/services/songs/songs.service';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { AlbumFull } from 'src/app/models/album/album-full';
import { Tag } from 'src/app/models/tag/tag';
import { Song } from '../../../models/song/song';
import { SongSortType } from '../../../models/song/song-sort-type';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.sass']
})
export class SongsListComponent implements OnInit, OnDestroy {
  public filterExplicit: boolean;
  public isLoading = false;

  private _unsubscribe$ = new Subject<void>();

  @Input() songs: Song[];
  @Input() tags: Tag[];
  @Input() highlightId: number;
  @Input() isDraggable = false;
  @Input() isEditable = false;
  @Input() isPlaying = false;
  @Input() playlist: Playlist | undefined;
  @Input() album: AlbumFull | undefined;
  @Input() isRemoveFromQueueShonw: boolean = false;
  @Input() isGroupMember: boolean = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();
  @Output() togglePlayEvent = new EventEmitter<void>();

  sortType: SongSortType | null = null;

  constructor(
    private _songService: SongsService,
    private _userService: UserService
  ) {

  }

  public ngOnInit() {
    this._userService.getUserSettings()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp) => {
          this.filterExplicit = resp.body?.showExplicitContent!;
        }
      );
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
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
