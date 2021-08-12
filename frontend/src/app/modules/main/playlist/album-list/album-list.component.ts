import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.sass']
})
export class AlbumListComponent implements OnInit {
  @Input()
  userId: number = 1; // Temporary value
  albums!: AlbumForReadDTO[];

  constructor(
    private _reactionService: ReactionService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
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
