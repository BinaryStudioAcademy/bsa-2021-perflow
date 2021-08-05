import { Component, Input, OnInit } from '@angular/core';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass']
})
export class ArtistListComponent implements OnInit {
  @Input()
  userId: number = 1; // Temporary value
  artists!: ArtistReadDTO[];

  constructor(
    private _reactionService: ReactionService
  ) { }

  ngOnInit(): void {
    this._reactionService.getArtistsByUserId(this.userId).subscribe(
      (response) => {
        this.artists = response;
      }
    );
  }

  deleteArtist(artist: ArtistReadDTO) {
    this._reactionService.removeArtistReaction(artist.id, this.userId).subscribe(
      () => {
        const index = this.artists.indexOf(artist);
        this.artists.splice(index, 1);
      }
    );
  }
}
