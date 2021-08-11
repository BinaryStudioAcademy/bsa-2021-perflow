import { Injectable } from '@angular/core';
import { Artist } from '../models/user/artist';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  routePrefix = '/api/Artists';

  constructor(private _httpService: HttpInternalService) { }

  getArtist(id: number) {
    return this._httpService.getRequest<Artist>(`${this.routePrefix}/${id}`);
  }
}
