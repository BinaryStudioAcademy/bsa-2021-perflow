import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistEditor } from 'src/app/models/playlist/playlist-editor';
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

  remove(pe: PlaylistEditor): Observable<PlaylistEditor> {
    return this._httpService.deleteRequest<PlaylistEditor>(this._endpoint, pe);
  }
}
