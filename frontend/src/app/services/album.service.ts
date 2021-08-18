import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album/album';
import { AlbumEdit } from '../models/album/album-edit';
import { AlbumFull } from '../models/album/album-full';
import { AlbumView } from '../models/album/album-view';
import { HttpInternalService } from './http-internal.service';
import { AlbumPublicStatus } from '../models/album/аlbum-public-status';
import { NewReleaseView } from '../models/album/new-release-view';
import { AlbumForReadDTO } from '../models/album/albumForReadDTO';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public routePrefix = '/api/Albums';

  constructor(private _httpService: HttpInternalService) { }

  public getAllAlbums() {
    return this._httpService.getRequest<AlbumView[]>(`${this.routePrefix}`);
  }

  public getNewReleases() {
    return this._httpService.getFullRequest<NewReleaseView[]>(`${this.routePrefix}/new-releases`);
  }

  public getAlbum(id: number) {
    return this._httpService.getRequest<AlbumFull>(`${this.routePrefix}/${id}`);
  }

  public getAlbumsByArtist(artistId: number) {
    return this._httpService.getRequest<Album[]>(`${this.routePrefix}/byArtist/${artistId}`);
  }

  public getAlbumViewsByArtist(artistId: number) {
    return this._httpService.getRequest<AlbumForReadDTO[]>(`${this.routePrefix}/ViewsbyArtist/${artistId}`);
  }

  public createAlbum(album: AlbumEdit): Observable<AlbumEdit> {
    return this._httpService.postRequest<AlbumEdit>(this.routePrefix, album);
  }

  public getEditedAlbum(id: number): Observable<AlbumEdit> {
    return this._httpService.getRequest<AlbumEdit>(`${this.routePrefix}/${id}`);
  }

  public editAlbum(album: AlbumEdit): Observable<AlbumEdit> {
    return this._httpService.putRequest<AlbumEdit>(`${this.routePrefix}`, album);
  }

  public removeAlbum(id: number): Observable<number> {
    return this._httpService.deleteRequest<number>(`${this.routePrefix}/${id}`);
  }

  public changeAlbumPublicStatus(albumPublicStatus: AlbumPublicStatus): Observable<AlbumPublicStatus> {
    return this._httpService.putRequest<AlbumPublicStatus>(`${this.routePrefix}/publicStatus`, albumPublicStatus);
  }
}
