import { Component, OnInit } from '@angular/core';
import { AlbumFull } from 'src/app/models/album/album-full';
import { Song } from 'src/app/models/song/song';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-create-edit-album',
  templateUrl: './create-edit-album.component.html',
  styleUrls: ['./create-edit-album.component.sass']
})
export class CreateEditAlbumComponent implements OnInit {
  album: AlbumFull = {} as AlbumFull;
  isModalShown = false;

  ngOnInit() {
    this.album = {
      iconURL: '',
      id: 0,
      name: 'Smoke',
      releaseYear: 1990,
      songs: {} as Song[],
      artist: { userName: 'Moricone' } as User,
      group: undefined
    };
  }

  showEditAlbumModal = () => {
    // this.previousPlaylistData = {
    //   name: this.playlist.name,
    //   description: this.playlist.description,
    //   accessType: this.playlist.accessType,
    //   iconURL: this.playlist.iconURL
    // };

    this.isModalShown = !this.isModalShown;
  };

  closeModal() {
    this.isModalShown = !this.isModalShown;

    // this.previousPlaylistData = {
    //   name: '',
    //   description: '',
    //   accessType: AccessType.default,
    //   iconURL: ''
    // };
  }
}
