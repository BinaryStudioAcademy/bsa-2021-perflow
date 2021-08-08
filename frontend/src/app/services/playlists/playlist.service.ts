import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistSongDTO } from 'src/app/models/playlist/playlistSongDTO';
import { Song } from 'src/app/models/song/song';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private readonly _endpoint: string = '/api/Playlists';
  constructor(private _httpService: HttpInternalService) { }

  getPlaylist(id: number): Observable<Playlist> {
    return this._httpService.getRequest<Playlist>(`${this._endpoint}/${id}`);
  }

  getPlaylistSongs(id: number): Observable<Song[]> {
    return this._httpService.getRequest<Song[]>(`${this._endpoint}/songs/${id}`);
  }

  createPlaylist(playlist: Playlist): Observable<Playlist> {
    return this._httpService.postRequest<Playlist>(this._endpoint, playlist);
  }

  editPlaylist(playlist: Playlist): Observable<Playlist> {
    return this._httpService.putRequest<Playlist>(this._endpoint, playlist);
  }

  addSongToPlaylist(playlistSongDTO: PlaylistSongDTO): Observable<PlaylistSongDTO> {
    return this._httpService.postRequest<PlaylistSongDTO>(`${this._endpoint}/songs`, playlistSongDTO);
  }

  deleteSongToPlaylist(playlistSongDTO: PlaylistSongDTO): Observable<PlaylistSongDTO> {
    return this._httpService.deleteRequest<PlaylistSongDTO>(`${this._endpoint}/songs`, playlistSongDTO);
  }

  deletePlaylist(id: number): Observable<number> {
    return this._httpService.deleteRequest<number>(`${this._endpoint}/${id}`);
  }
}