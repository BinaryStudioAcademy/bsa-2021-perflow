import { Component, Input, OnInit } from '@angular/core';
import { ConstructorRecentlyPlayedSong } from 'src/app/models/constructor/container-recently-played-song';
import { RecentlyPlayedSong } from 'src/app/models/recently-played/recent-song';

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
}
