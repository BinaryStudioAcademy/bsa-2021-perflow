import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { playlistToFormData } from 'src/app/helpers/object-to-formData-converter';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistForSave } from 'src/app/models/playlist/playlist-for-save';
import { PlaylistName } from 'src/app/models/playlist/playlist-name';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { PlaylistSongDTO } from 'src/app/models/playlist/playlistSongDTO';
import { Song } from 'src/app/models/song/song';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private readonly _endpoint: string = '/api/Playlists';
  constructor(private _httpService: HttpInternalService) { }

  getPlaylists() {
    return this._httpService.getFullRequest<Playlist[]>(`${this._endpoint}`);
  }

  getUserCreatedPlaylists() {
    return this._httpService.getFullRequest<PlaylistName[]>(`${this._endpoint}/created`);
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this._httpService.getRequest<Playlist>(`${this._endpoint}/${id}`);
  }

  getPlaylistSongs(id: number): Observable<Song[]> {
    return this._httpService.getRequest<Song[]>(`${this._endpoint}/songs/${id}`);
  }

  createPlaylist(playlist: Playlist): Observable<Playlist> {
    return this._httpService.postRequest<Playlist>(this._endpoint, playlist);
  }

  editPlaylist(playlist: PlaylistForSave): Observable<Playlist> {
    const formData = playlistToFormData(playlist);
    return this._httpService.putRequest<Playlist>(this._endpoint, formData);
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

  getPlaylistsByAuthorId(authorId: number) {
    return this._httpService.getRequest<PlaylistView[]>(`${this._endpoint}/byAuthor/${authorId}`);
  }

  getPlaylistsByGroupId(groupId: number) {
    return this._httpService.getRequest<PlaylistView[]>(`${this._endpoint}/byGroup/${groupId}`);
  }

  editPlaylistName(playlist: PlaylistName): Observable<PlaylistName> {
    return this._httpService.putRequest<PlaylistName>(`${this._endpoint}/editName`, playlist);
  }

  copyPlaylist(playlist: PlaylistName): Observable<PlaylistName> {
    return this._httpService.postRequest<PlaylistName>(`${this._endpoint}/copy`, playlist);
  }

  checkSongInPlaylist(playlist: PlaylistSongDTO): Observable<boolean> {
    return this._httpService.postRequest<boolean>(`${this._endpoint}/checkSong`, playlist);
  }

  getYourMix() {
    return this._httpService.getRequest<PlaylistView[]>(`${this._endpoint}/userMix`);
  }

  changeAccessType(playlist: PlaylistName) {
    return this._httpService.putRequest<PlaylistName>(`${this._endpoint}/changeAccessType`, playlist);
  }

  getRecommendations() {
    return this._httpService.getRequest<PlaylistView[]>(`${this._endpoint}/recommendations`);
  }
}
