import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistEditor } from 'src/app/models/playlist/playlist-editor';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistEditorsService {
  private readonly _endpoint: string = '/api/PlaylistEditors';
  constructor(private _httpService: HttpInternalService) { }

  getCollaborators(playlistId: number): Observable<ArtistReadDTO[]> {
    return this._httpService.getRequest<ArtistReadDTO[]>(`${this._endpoint}/${playlistId}`);
  }

  add(pe: PlaylistEditor): Observable<PlaylistEditor> {
    return this._httpService.postRequest<PlaylistEditor>(this._endpoint, pe);
  }

  addCollaborators(playlistId: number, pes: Array<ArtistReadDTO>): Observable<Array<ArtistReadDTO>> {
    return this._httpService.postRequest<Array<ArtistReadDTO>>(`${this._endpoint}/addCollaborators/${playlistId}`, pes);
  }

  remove(pe: PlaylistEditor): Observable<PlaylistEditor> {
    return this._httpService.deleteRequest<PlaylistEditor>(this._endpoint, pe);
  }

  removePlaylist(playlistId: number): Observable<number> {
    return this._httpService.deleteRequest<number>(`${this._endpoint}/${playlistId}`);
  }

  getCollaborativePlaylists(userId: number): Observable<PlaylistView[]> {
    return this._httpService.getRequest<PlaylistView[]>(`${this._endpoint}/collaborativePlaylists/${userId}`);
  }

  getCollaborativePlaylistsOfCurrentUser(): Observable<PlaylistView[]> {
    return this._httpService.getRequest<PlaylistView[]>(`${this._endpoint}/collaborativePlaylists`);
  }
}
