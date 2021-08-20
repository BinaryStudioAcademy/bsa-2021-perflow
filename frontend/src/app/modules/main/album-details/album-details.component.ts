import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { AlbumFull } from 'src/app/models/album/album-full';
import { AlbumService } from 'src/app/services/album.service';
import { ClipboardService } from 'ngx-clipboard';
import { ReactionService } from 'src/app/services/reaction.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.sass']
})
export class AlbumDetailsComponent implements OnInit {
  private readonly _scrollingSize: number = 240;
  private _userId: number;

  @ViewChild('albums') albumsElement: ElementRef;
  album: AlbumFull = {} as AlbumFull;
  anotherAlbums: AlbumForReadDTO[] = [];
  isAuthor: boolean;

  constructor(
    private _clipboardApi: ClipboardService,
    private _route: ActivatedRoute,
    private _service: AlbumService,
    private _reactionService: ReactionService,
    private _router: Router,
    private _location: PlatformLocation,
    private _authService: AuthService
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;

    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._service.getAlbum(this._route.snapshot.params.id)
      .subscribe(
        (result) => {
          this.album = result;
          this.isAuthor = this._userId === (this.album?.artist?.id ?? this.album?.group?.id);

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

  likeAlbum() {
    this._reactionService.addAlbumReaction(this.album.id, this._userId)
      .subscribe(
        () => {
          this.album.isLiked = true;
        }
      );
  }

  dislikeAlbum() {
    this._reactionService.removeAlbumReaction(this.album.id, this._userId)
      .subscribe(
        () => {
          this.album.isLiked = false;
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
