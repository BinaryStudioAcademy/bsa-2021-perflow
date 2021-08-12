import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Artist } from 'src/app/models/shared/artist.model';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  topArtists: Artist[] = [];

  constructor(
    private _httpService: HttpInternalService
  ) {}

  public getTopArtists(): Observable<Artist[]> {
    return of(this.topArtists);
  }
}
