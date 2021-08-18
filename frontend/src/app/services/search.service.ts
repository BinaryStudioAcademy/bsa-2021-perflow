import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumForReadDTO } from '../models/album/albumForReadDTO';
import { PlaylistView } from '../models/playlist/playlist-view';
import { ArtistReadDTO } from '../models/user/ArtistReadDTO';
import { HttpInternalService } from './http-internal.service';
import { SearchParam } from '../models/search/search-param';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private _httpService: HttpInternalService) {
  }

  getArtistByName = (data: SearchParam): Observable<ArtistReadDTO[]> => {
    const httpParams = { searchTerm: `${data.searchTerm}`, amount: `${data.amount}` };
    return this._httpService.getRequest<ArtistReadDTO[]>('/api/Search/artists', httpParams);
  };

  getAlbumsByName = (data: SearchParam): Observable<AlbumForReadDTO[]> => {
    const httpParams = { searchTerm: `${data.searchTerm}`, amount: `${data.amount}` };
    return this._httpService.getRequest<AlbumForReadDTO[]>('/api/Search/albums', httpParams);
  };

  getPlaylistsByName = (data: SearchParam): Observable<PlaylistView[]> => {
    const httpParams = { searchTerm: `${data.searchTerm}`, amount: `${data.amount}` };
    return this._httpService.getRequest<PlaylistView[]>('/api/Search/playlists', httpParams);
  };
}
