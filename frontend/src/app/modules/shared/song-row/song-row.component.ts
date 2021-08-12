import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { SongInfo } from 'src/app/models/song/song-info';
import { HttpInternalService } from 'src/app/services/http-internal.service';
import { SongToolbarService } from 'src/app/services/song-toolbar.service';
import { SongsService } from 'src/app/services/songs/songs.service';
import { links } from '../mock-audio/links';

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

  constructor(
    private _songService: SongsService,
    private _toolbarService: SongToolbarService,
    private _httpService: HttpInternalService
  ) { }

  clickItem(menu: string) {
    this.clickMenuItem.emit({ menuItem: menu, song: this.song });
  }

  clickLikeIcon(songId: number) {
    this.clickLike.emit(songId);
  }

  playSong = (id: number) => {
    // This code works, it is commented temporary

    // this._songService.getSongById(id).subscribe((song) => {
    //   const testSong = new SongInfo(
    //     song.name,
    //     song.artist.userName,
    //     this._httpService.buildUrl(`/api/Songs/file?blobId=${song.blobId}`),
    //     song.iconURL
    //   );
    //   this._toolbarService.updateSong(testSong);
    // });

    const testSong = new SongInfo(
      this.song.name,
      this.song.artist.userName,
      links.find((s) => s.id === this.song.id)!.link,
      this.song.iconURL
    );
    this._toolbarService.updateSong(testSong);
  };
}
