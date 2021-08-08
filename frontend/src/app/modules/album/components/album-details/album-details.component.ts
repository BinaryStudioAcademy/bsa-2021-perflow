import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album/album';
import { AlbumFull } from 'src/app/models/album/album-full';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.sass']
})
export class AlbumDetailsComponent implements OnInit {
  album: AlbumFull = {} as AlbumFull;
  anotherAlbums: Album[] = [];

  constructor(private _route: ActivatedRoute, private _service: AlbumService) { }

  async ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this._service.getAlbum(this._route.snapshot.params.id)
      .subscribe(
        (result) => {
          this.album = result;
          this.loadAnotherAlbums();
        }
      );
  }

  loadAnotherAlbums() {
    const artistId = this.album?.artist?.id ?? this.album?.group?.id;

    this._service.getAlbumsByArtist(artistId as number)
      .subscribe(
        (result) => {
          this.anotherAlbums = result;
        }
      );
  }
}
