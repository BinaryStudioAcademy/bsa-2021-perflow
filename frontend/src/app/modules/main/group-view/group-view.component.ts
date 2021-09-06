import { PlatformLocation } from '@angular/common';
import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { GroupFull } from 'src/app/models/group/groupFull';
import { Song } from 'src/app/models/song/song';
import { AlbumService } from 'src/app/services/album.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.sass']
})
export class GroupViewComponent implements OnInit {
  private readonly _scrollingSize: number = 240;
  private _userId: number;

  @ViewChild('albums') albumsElement: ElementRef;
  @ViewChild('playlists') playlistsElement: ElementRef;

  group: GroupFull = {} as GroupFull;
  topSongs: Song[] = [];
  isSuccess: boolean = false;
  groupAlbums: AlbumForReadDTO[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _songService: SongsService,
    private _queueService: QueueService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _albumsService: AlbumService
  ) {
    this.getUserId();
  }

  ngOnInit() {
    this.loadData();
  }

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this._userId = state!.id;
        }
      );
  }

  loadData() {
    const groupId = this._route.snapshot.params.id;

    this._groupService.getGroup(groupId)
      .subscribe(
        (result) => {
          this.group = result;
          this.loadTopSongs();
          this.loadAlbums();
        }
      );
  }

  loadTopSongs() {
    this._songService.getTopSongsByAuthorId(this.group.id, 10, AuthorType.group)
      .subscribe(
        (result) => {
          this.topSongs = result;
        }
      );
  }

  loadAlbums() {
    this._albumsService.getAlbumsByArtist(this.group.id, AuthorType.group)
      .subscribe(
        (result) => {
          this.groupAlbums = result;
        }
      );
  }

  likeGroup() {
    this._reactionService.addGroupReaction(this.group.id, this._userId)
      .subscribe(
        () => {
          this.group.isLiked = true;
        }
      );
  }

  dislikeGroup() {
    this._reactionService.removeGroupReaction(this.group.id, this._userId)
      .subscribe(
        () => {
          this.group.isLiked = false;
        }
      );
  }

  scroll(id: string, scrollingSize: number = this._scrollingSize) {
    switch (id) {
      case 'albums':
        this.albumsElement.nativeElement?.scrollBy({ left: scrollingSize, behavior: 'smooth' });
        break;
      default:
        break;
    }
  }

  playArtist = () => {
    if (!this.topSongs.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(this.topSongs);

    const [first] = this.topSongs;

    this._queueService.initSong(first, true);
  };

  addToQueue = () => {
    if (!this.topSongs.length) {
      return;
    }

    if (!QueueService.isInitialized) {
      const [first] = this.topSongs;
      this._queueService.initSong(first);
    }
  };

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }
}
