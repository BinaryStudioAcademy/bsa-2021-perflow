import { Component, Input } from '@angular/core';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.sass']
})
export class AlbumsPageComponent {
  @Input()
  userId: number;
  albums!: AlbumForReadDTO[];

  constructor(
    private _reactionService: ReactionService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable().subscribe(
      (value) => {
        this.userId = value!.id;
      }
    );
  }

  ngOnInit(): void {
    this._reactionService.getAlbumsByUserId(this.userId).subscribe(
      (response) => {
        this.albums = response;
      }
    );
  }

  deleteAlbum(album: AlbumForReadDTO) {
    this._reactionService.removeAlbumReaction(album.id, this.userId).subscribe(
      () => {
        const index = this.albums.indexOf(album);
        this.albums.splice(index, 1);
      }
    );
  }
}
