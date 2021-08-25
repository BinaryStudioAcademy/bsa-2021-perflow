import { HttpResponse } from '@angular/common/http';
import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlaylistName } from 'src/app/models/playlist/playlist-name';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { CreatePlaylistService } from '../../shared/playlist/create-playlist/create-playlist.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnDestroy, OnInit {
  playlists: PlaylistName[] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistsService: PlaylistsService,
    private _createdPlaylistService: CreatePlaylistService
  ) {
  }

  public ngOnInit() {
    this.getUserCreatedPlaylists();

    this._createdPlaylistService.playlistChanged$.subscribe((playlist) => {
      const playlistIndex = this.playlists.findIndex((pl) => pl.id === playlist?.id);
      if (playlistIndex === -1) {
        this.playlists.push(playlist!);
      }
      else {
        this.playlists[playlistIndex] = playlist!;
      }
    });

    this._createdPlaylistService.playlistDeleted$
      .subscribe((id) => {
        this.playlists = this.playlists.filter((pl) => pl.id !== id);
      });
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public async getUserCreatedPlaylists() {
    this._playlistsService
      .getUserCreatedPlaylists()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<PlaylistName[]>) => {
          this.playlists = resp.body!;
        }
      );
  }

  public createPlaylist = () => { };

  @ViewChild('ddmenu') menu: ElementRef;
  editedPlaylist = {} as PlaylistName;
  isEditPlaylistMode: boolean = false;
  tempPlaylist = {} as PlaylistName;

  plSettingsClick = (pl: PlaylistName, e: MouseEvent) => {
    const menu = (this.menu.nativeElement as HTMLDivElement);
    const height = window.innerHeight - e.y;
    this.tempPlaylist = pl;

    if (height > 500) {
      menu.style.top = `${e.y + 10}px`;
      menu.style.left = `${e.x + 5}px`;
    }
    if (height < 500) {
      menu.style.bottom = `${height}px`;
      menu.style.left = `${e.x + 5}px`;
    }
    menu.classList.toggle('show');
  };

  clickOnMenuItem(item: string) {
    (this.menu.nativeElement as HTMLDivElement).classList.toggle('show');
    this.editedPlaylist = this.tempPlaylist;

    switch (item) {
      case 'Rename':
        this.renamePlaylist();
        break;
      case 'Create similar playlist':
        break;
      default:
        break;
    }
  }

  renamePlaylist() {
    this.isEditPlaylistMode = true;
  }

  clickOutside() {
    (this.menu.nativeElement as HTMLDivElement).classList.remove('show');
    const temp = this.playlists.find((p) => p.id === this.editedPlaylist.id);
    temp!.name = this.editedPlaylist.name;
  }

  clickOutsidePlaylistName() {
    this.isEditPlaylistMode = !this.isEditPlaylistMode;
    this.editedPlaylist = {} as PlaylistName;
  }
}
