import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ConstructorRecentlyPlayedSong } from 'src/app/models/constructor/container-recently-played-song';
import { RecentlyPlayedSong } from 'src/app/models/recently-played/recent-song';
import { QueueService } from 'src/app/services/queue.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.sass']
})
export class SongCardComponent implements OnInit {
  @Input() song = {} as RecentlyPlayedSong | ConstructorRecentlyPlayedSong;

  artist: string;
  podcast: string;
  artistRoute: string;
  podcastRoute: string;

  constructor(
    private _songsService: SongsService,
    private _queueService: QueueService
  ) {}

  ngOnInit() {
    if (this.instanceOfRecentlyPlayedSong(this.song)) {
      this.artist = this.song.group?.name ?? this.song.artist.userName;
      this.podcast = this.song.playlist?.name ?? this.song.album.name;

      this.artistRoute = this.song.group?.name
        ? `/groups/${this.song.group.id}` : `/artists/${this.song.artist.id}`;

      this.podcastRoute = this.song.playlist?.name
        ? `/playlists/view-playlist/${this.song.playlist.id}` : `/albums/${this.song.album.id}`;
    }
    else {
      this.artist = this.song.artist ? this.song.artist! : this.song.group!;
      this.podcast = this.song.playlist ? this.song.playlist! : this.song.album!.name;
    }
  }

  instanceOfRecentlyPlayedSong = (data: any): data is RecentlyPlayedSong => 'id' in data;

  play() {
    if (!this.instanceOfRecentlyPlayedSong(this.song)) {
      return;
    }

    this._songsService.getSongById((this.song as RecentlyPlayedSong).id)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this._queueService.addSongToQueue(data);
          this._queueService.initSong(data, true);
        }
      });
  }
}
