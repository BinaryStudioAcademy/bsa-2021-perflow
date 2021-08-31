import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistEditor } from 'src/app/models/playlist/playlist-editor';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistEditorsService {
  private readonly _endpoint: string = '/api/PlaylistEditors';
  constructor(private _httpService: HttpInternalService) { }

  add(pe: PlaylistEditor): Observable<PlaylistEditor> {
    return this._httpService.postRequest<PlaylistEditor>(this._endpoint, pe);
  }

  remove(pe: PlaylistEditor): Observable<PlaylistEditor> {
    return this._httpService.deleteRequest<PlaylistEditor>(this._endpoint, pe);
  }
}
