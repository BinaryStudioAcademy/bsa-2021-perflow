import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { AlbumAuthor } from 'src/app/models/user/album-author';
import { QueueService } from 'src/app/services/queue.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-new-release-card',
  templateUrl: './new-release-card.component.html',
  styleUrls: ['./new-release-card.component.sass']
})
export class NewReleaseCardComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() authors: Array<AlbumAuthor>;
  @Input() iconUrl: string;

  constructor(
    private _songsService: SongsService,
    private _queueService: QueueService
  ) { }

  public ngOnInit() {
    this.authors = this.authors.filter((author, i, arr) => arr.findIndex((t) => t.id === author.id) === i);
  }

  playAlbum = (id: number) => {
    this._songsService.getSongsByAlbumId(id)
      .subscribe((result) => {
        const songs = result;

        this.updateQueue(songs);
      })
  };

  updateQueue(songs: Song[]) {
    if (!songs.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(songs);

    const [first] = songs;

    this._queueService.initSong(first, true);
  }
}
