import { Component, Input, OnInit } from '@angular/core';
import { RecentlyPlayedSong } from 'src/app/models/recently-played/recent-song';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.sass']
})
export class SongCardComponent implements OnInit {
  @Input() song = {} as RecentlyPlayedSong;

  artist: string;
  podcast: string;
  artistRoute: string;
  podcastRoute: string;

  ngOnInit() {
    this.artist = this.song.group?.name ?? this.song.artist.userName;
    this.podcast = this.song.playlist?.name ?? this.song.album.name;

    this.artistRoute = this.song.group?.name
      ? `/groups/${this.song.group.id}` : `/artists/${this.song.artist.id}`;

    this.podcastRoute = this.song.playlist?.name
      ? `/playlists/view-playlist/${this.song.playlist.id}` : `/albums/${this.song.album.id}`;
  }
}
