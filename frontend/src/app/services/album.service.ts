import { Injectable } from '@angular/core';
import { Album } from '../models/album/album';
import { AlbumFull } from '../models/album/album-full';
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

  public getAlbum(id: number) {
    return this._httpService.getRequest<AlbumFull>(`${this.routePrefix}/${id}`);
  }

  public getAlbumsByArtist(artistId: number) {
    return this._httpService.getRequest<Album[]>(`${this.routePrefix}/byArtist/${artistId}`);
  }
}
