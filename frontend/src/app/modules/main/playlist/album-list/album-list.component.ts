import { Component, Input, OnInit } from '@angular/core';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
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
    private _reactionService: ReactionService
  ) { }

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
