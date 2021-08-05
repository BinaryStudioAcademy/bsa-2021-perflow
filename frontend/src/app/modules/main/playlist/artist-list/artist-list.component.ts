import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { UserRecord } from 'src/app/models/user/user-record';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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

  constructor(private _artistService: ArtistService, private _reactionService: ReactionService, private _authService: AuthService) { }

  ngOnInit(): void {
    this._artistService.getArtistsByUserId(this.userId).subscribe(
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
