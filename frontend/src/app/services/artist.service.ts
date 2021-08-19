import { Injectable } from '@angular/core';
import { ArtistFull } from '../models/user/artist-full';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  routePrefix = '/api/Artists';

  constructor(private _httpService: HttpInternalService) { }

  getArtist(id: number) {
    return this._httpService.getRequest<ArtistFull>(`${this.routePrefix}/${id}`);
  }
}
