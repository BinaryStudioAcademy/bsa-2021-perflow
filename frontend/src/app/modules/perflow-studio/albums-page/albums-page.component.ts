import { Component, Input, OnInit } from '@angular/core';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { AlbumService } from 'src/app/services/album.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.sass']
})
export class AlbumsPageComponent implements OnInit {
  @Input()
  userId: number;
  albums!: AlbumForReadDTO[];

  constructor(
    private _albumService: AlbumService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable().subscribe(
      (value) => {
        this.userId = value!.id;
      }
    );
  }

  ngOnInit(): void {
    this._albumService.getAlbumsByArtist(this.userId).subscribe(
      (response) => {
        this.albums = response;
      }
    );
  }
}
