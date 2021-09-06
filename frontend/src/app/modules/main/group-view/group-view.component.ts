import { PlatformLocation } from '@angular/common';
import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Subject, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AlbumEdit } from 'src/app/models/album/album-edit';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { GroupEdit } from 'src/app/models/group/group-edit';
import { GroupFull } from 'src/app/models/group/groupFull';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { AlbumService } from 'src/app/services/album.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.sass']
})
export class GroupViewComponent implements OnInit, OnDestroy {
  private readonly _scrollingSize: number = 240;
  private _userId: number;
  private _unsubscribe$ = new Subject<void>();

  @ViewChild('albums') albumsElement: ElementRef;
  @ViewChild('playlists') playlistsElement: ElementRef;

  group: GroupFull = {} as GroupFull;
  editedGroup: GroupEdit = {} as GroupEdit;
  topSongs: Song[] = [];
  groupPlaylists: PlaylistView[] = [];
  isSuccess: boolean = false;
  groupAlbums: AlbumForReadDTO[] = [];
  isGroupMember: boolean;
  isModalShown: boolean;
  newAlbum: AlbumEdit = {} as AlbumEdit;
  groupId: number;

  constructor(
    private _route: ActivatedRoute,
    private _groupService: GroupService,
    private _songService: SongsService,
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _albumsService: AlbumService,
    private _activateRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.getUserId();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() {
    this._activateRoute.params.subscribe((params: Params) => {
      this.groupId = params.id;
      this.loadData();
    });
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
    this._groupService.checkGroupMember(groupId)
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(
      (result) => {
        this.isGroupMember = result.body!;
      }
    );
    this._groupService.getGroup(groupId)
      .subscribe(
        (result) => {
          this.group = result;
          this.loadTopSongs();
          this.loadPlaylists();
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

  loadPlaylists() {
    this._playlistsService.getPlaylistsByGroupId(this.group.id)
      .subscribe(
        (result) => {
          this.groupPlaylists = result;
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
      case 'playlists':
        this.playlistsElement.nativeElement?.scrollBy({ left: scrollingSize, behavior: 'smooth' });
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

  redirectTo(){
    console.log("TST");
    this._router.navigateByUrl(`/perflowstudio/groups/${this.groupId}`);
  }

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }
}
