import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.sass']
})
export class ArtistListComponent implements OnInit, OnDestroy {
  @Input()
  userId: number = 1; // Temporary value
  artists!: ArtistReadDTO[];
  groups!: ArtistReadDTO[];

  private _unsubscribe$ = new Subject<void>();

  constructor(private _reactionService: ReactionService, private _authService: AuthService) {
    this._authService.getAuthStateObservableFirst()
      .pipe(
        filter((state) => !!state)
      )
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
  }

  ngOnDestroy(){
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this._reactionService.getArtistsByUserId(this.userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (response) => {
          this.artists = response;
        }
      );
    this._reactionService.getGroupsByUserId(this.userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (response) => {
          this.groups = response;
        }
      )
  }

  deleteArtist(artist: ArtistReadDTO) {
    this._reactionService.removeArtistReaction(artist.id, this.userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        () => {
          const index = this.artists.indexOf(artist);
          this.artists.splice(index, 1);
        }
      );
  }

  deleteGroup(group: ArtistReadDTO) {
    this._reactionService.removeGroupReaction(group.id, this.userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        () => {
          const index = this.groups.indexOf(group);
          this.groups.splice(index, 1);
        }
      );
  }
}
