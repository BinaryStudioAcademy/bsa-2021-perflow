import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AlbumForReadDTO } from '../models/album/albumForReadDTO';
// import { PlaylistView } from '../models/playlist/playlist-view';
// import { ArtistReadDTO } from '../models/user/ArtistReadDTO';
import { HttpInternalService } from './http-internal.service';
import { SearchParam } from '../models/search/search-param';
import { Song } from '../models/song/song';
import { FoundData } from '../models/search/found-data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private _httpService: HttpInternalService) {
  }

  getSongsByName = (data: SearchParam): Observable<Song[]> => {
    const httpParams = { ...data };
    return this._httpService.getRequest<Song[]>('/api/Search/songs', httpParams);
  };

  // getArtistByName = (data: SearchParam): Observable<ArtistReadDTO[]> => {
  //   const httpParams = { searchTerm: `${data.searchTerm}`, amount: `${data.amount}` };
  //   return this._httpService.getRequest<ArtistReadDTO[]>('/api/Search/artists', httpParams);
  // };

  // getAlbumsByName = (data: SearchParam): Observable<AlbumForReadDTO[]> => {
  //   const httpParams = { searchTerm: `${data.searchTerm}`, amount: `${data.amount}` };
  //   return this._httpService.getRequest<AlbumForReadDTO[]>('/api/Search/albums', httpParams);
  // };

  // getPlaylistsByName = (data: SearchParam): Observable<PlaylistView[]> => {
  //   const httpParams = { searchTerm: `${data.searchTerm}`, amount: `${data.amount}` };
  //   return this._httpService.getRequest<PlaylistView[]>('/api/Search/playlists', httpParams);
  // };

  getFoundData(searchTerm: string): Observable<FoundData> {
    return this._httpService.getRequest<FoundData>(`/api/Search/${searchTerm}`);
  }
}
