/* eslint-disable no-param-reassign */

import { Injectable } from '@angular/core';
import {
  filter, map, mergeMap
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Song } from 'src/app/models/song/song';
import { SongWriteDTO } from 'src/app/models/song/song-write';
import { SongOrder } from 'src/app/models/song/song-order';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  topSongs: Song[] = [];

  constructor(
    private _httpService: HttpInternalService
  ) { }

  public getLikedSongs() {
    return this._httpService.getRequest<Song[]>('/api/songs/liked');
  }

  public getLikedSongsCount() {
    return this._httpService.getRequest<number>('/api/songs/likedCount');
  }

  public getTopSongs(): Observable<Song[]> {
    return of(this.topSongs);
  }

  getSongById = (id: number) => this._httpService.getRequest<Song>(`/api/songs/${id}`);

  uploadSong(songInfo: SongWriteDTO, songFile: File) {
    return this._uploadSongInfo(songInfo).pipe(
      filter((song) => song !== undefined),
      mergeMap((song) => this._uploadSongFile(song.id, songFile).pipe(
        map(((_) => song))
      ))
    );
  }

  private _uploadSongFile = (songId: number, songFile: File) => {
    const formData = new FormData();

    formData.append('songFile', songFile, songFile.name);

    return this._httpService.postRequest(
      `/api/studio/songs/${songId}/file`,
      formData
    );
  };

  private _uploadSongInfo = (songInfo: SongWriteDTO) => this._httpService.postRequest<Song>(
    '/api/studio/songs',
    songInfo
  );

  deleteSong = (id: number) => this._httpService.deleteRequest(
    `/api/studio/songs/${id}`
  );

  getTopSongsByAuthorId(id: number, count: number, authorType: AuthorType) {
    const httpParams = { count, authorType };

    return this._httpService.getRequest<Song[]>(`/api/songs/topSongs/${id}`, httpParams);
  }

  getSongsByAlbumId(id: number) {
    return this._httpService.getRequest<Song[]>(`/api/songs/byAlbum/${id}`);
  }

  getTopSongsByLikes(amount: number) {
    return this._httpService.getRequest<Song[]>(`/api/songs/top/${amount}`);
  }
  checkIfSongLiked(id: number) {
    return this._httpService.getRequest<{ isLiked: boolean }>(`/api/songs/${id}/isLiked`);
  }

  setSongName(songId: number, value: string) {
    return this._httpService.putRequest(`/api/studio/songs/${songId}/name?value=${value}`, {});
  }

  setSongCensorship(songId: number, value: boolean) {
    return this._httpService.putRequest(`/api/studio/songs/${songId}/censorship?value=${value}`, {});
  }

  updateOrders(songOrders: SongOrder[]) {
    return this._httpService.putRequest<SongWriteDTO>('/api/studio/songs/orders', songOrders);
  }
}
