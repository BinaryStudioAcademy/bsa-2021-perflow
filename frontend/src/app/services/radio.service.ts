import { Injectable } from '@angular/core';
import { Song } from '../models/song/song';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  routePrefix = '/api/Radio';

  constructor(private _httpService: HttpInternalService) { }

  getRadioBySongId(id: number) {
    return this._httpService.getRequest<Song[]>(`${this.routePrefix}/songRadio/${id}`);
  }

  getRadioByPlaylistId(id: number) {
    return this._httpService.getRequest<Song[]>(`${this.routePrefix}/playlistRadio/${id}`);
  }
}
