import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { Album } from 'src/app/models/album/album';
import { AlbumFull } from 'src/app/models/album/album-full';
import { AlbumService } from 'src/app/services/album.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.sass']
})
export class AlbumDetailsComponent implements OnInit {
  private readonly _scrollingSize: number = 240;

  @ViewChild('albums') albumsElement: ElementRef;
  album: AlbumFull = {} as AlbumFull;
  anotherAlbums: Album[] = [];

  constructor(private _clipboardApi: ClipboardService, private _route: ActivatedRoute, private _service: AlbumService,
    private _router: Router, private _location: PlatformLocation) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
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

          const index = this.anotherAlbums.findIndex((a) => a.id === this.album.id);
          this.anotherAlbums.splice(index, 1);
        }
      );
  }

  scroll() {
    this.albumsElement.nativeElement?.scrollBy({ left: this._scrollingSize, behavior: 'smooth' });
  }

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
  }
}