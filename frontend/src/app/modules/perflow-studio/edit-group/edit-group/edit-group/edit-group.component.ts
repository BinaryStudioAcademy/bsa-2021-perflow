import { PlatformLocation } from '@angular/common';
import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Subject } from 'rxjs';
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
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.sass']
})
export class EditGroupComponent implements OnInit, OnDestroy {
  private readonly _scrollingSize: number = 240;
  private _userId: number;
  private _unsubscribe$ = new Subject<void>();

  @ViewChild('albums') albumsElement: ElementRef;
  @ViewChild('playlists') playlistsElement: ElementRef;

  group: GroupFull = {} as GroupFull;
  editedGroup: GroupEdit = {} as GroupEdit;
  topSongs: Song[] = [];
  groupPlaylists: PlaylistView[] = [];
  groupAlbums: AlbumForReadDTO[] = [];
  isGroupMember: boolean;
  isModalShown: boolean;
  newAlbum: AlbumEdit = {} as AlbumEdit;
  groupId: number;
  isPublishedFirst: boolean = true;

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
    private _router: Router,
    private _snackbarService: SnackbarService
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

  changeOrder(publishedFirst: boolean) {
    if (this.isPublishedFirst === publishedFirst) {
      return;
    }
    this.isPublishedFirst = publishedFirst;
    if (this.isPublishedFirst) {
      this.groupAlbums.sort((a) => (a.isPublished ? -1 : 1));
    }
    else {
      this.groupAlbums.sort((a) => (a.isPublished ? 1 : -1));
    }
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
    if (!this.isGroupMember) {
      this._albumsService.getAlbumsByArtist(this.group.id, AuthorType.group)
        .subscribe(
          (result) => {
            this.groupAlbums = result;
          }
        );
    }
    else {
      this._albumsService.getAlbumsByGroupUnpublished(this.group.id)
        .subscribe(
          (result) => {
            this.groupAlbums = result.body!.sort((a) => (a.isPublished ? -1 : 1));
          }
        );
    }
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

  isTextOverflow = (elementId: string): boolean => {
    const elem = document.getElementById(elementId);
    if (elem) {
      return (elem.offsetWidth < elem.scrollWidth);
    }
    return false;
  };

  scrollRight(id: string, scrollingSize: number = this._scrollingSize) {
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

  scrollLeft(id: string, scrollingSize: number = this._scrollingSize) {
    switch (id) {
      case 'albums':
        this.albumsElement.nativeElement?.scrollBy({ left: -scrollingSize, behavior: 'smooth' });
        break;
      case 'playlists':
        this.playlistsElement.nativeElement?.scrollBy({ left: -scrollingSize, behavior: 'smooth' });
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

  leaveGroup() {
    this._groupService.deleteMember(this.groupId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        () => {
          this._snackbarService.show({
            message: 'You successfully left the group.',
            header: 'Done!'
          });
          this._router.navigateByUrl('/home');
        }
      );
  }

  onSubmitModal = (data: GroupEdit) => {
    this.isModalShown = !this.isModalShown;
    this.editGroup(data);
  };

  editGroup = (group: GroupEdit) => {
    this.editedGroup = {
      ...group,
      name: group.name.trim() === '' ? 'Group name' : group.name
    };
    this._groupService.editGroup(this.editedGroup)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._groupService.getGroup(data.body!.id)
            .subscribe({
              next: (result) => {
                this.group = result;
              }
            });
        }
      });
  };

  startEditMode() {
    this.isModalShown = true;
  }

  closeModal() {
    this.isModalShown = !this.isModalShown;
  }

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);

    this._snackbarService.show({ message: 'Link copied to clipboard!' });
  }
}
