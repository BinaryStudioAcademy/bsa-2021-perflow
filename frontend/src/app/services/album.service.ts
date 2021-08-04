import { Injectable } from '@angular/core';
import { AlbumView } from '../models/album/album-view';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public routePrefix = '/api/Albums';

  constructor(private _httpService: HttpInternalService) { }

  public getNewReleases() {
    return this._httpService.getFullRequest<AlbumView[]>(`${this.routePrefix}/new-releases`);
  }
}
