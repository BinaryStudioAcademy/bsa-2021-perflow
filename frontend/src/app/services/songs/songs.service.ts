/* eslint-disable no-param-reassign */

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Song } from 'src/app/models/song/song';
import { SongWriteDTO } from 'src/app/models/song/song-write';
import { HttpInternalService } from '../http-internal.service';
import { SongOrder } from 'src/app/models/song/song-order';

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

  getSongsByName = (searchTerm: string): Observable<Song[]> => {
    const httpParams = { searchTerm: `${searchTerm}` };
    return this._httpService.getRequest<Song[]>('/api/songs/search', httpParams);
  };

  getSongById = (id: number) => this._httpService.getRequest<Song>(`/api/songs/${id}`);

  uploadSong = (songForWrite: SongWriteDTO, song: File) => this._uploadSongFile(song).pipe(
    map((response) => {
      songForWrite.blobId = response.blobId;
      return this._uploadSongInfo(songForWrite);
    })
  );

  private _uploadSongFile = (song: File) => {
    const formData = new FormData();

    formData.append('file', song, song.name);

    return this._httpService.postRequest<{ blobId: string }>(
      '/api/Songs/file/upload',
      formData
    );
  };

  private _uploadSongInfo = (songInfo: SongWriteDTO) => this._httpService.postRequest<Song>(
    '/api/Songs/upload',
    songInfo
  );

  deleteSong = (id: number) => this._httpService.deleteRequest(
    `/api/Songs/delete/${id}`
  );

  getTopSongsByAuthorId(id: number, count: number) {
    const httpParams = { count };
    return this._httpService.getRequest<Song[]>(`/api/songs/topSongs/${id}`, httpParams);
  }

  getTopSongsByLikes(amount: number) {
    return this._httpService.getRequest<Song[]>(`/api/songs/top/${amount}`);
  }
  checkIfSongLiked(id: number) {
    return this._httpService.getRequest<{ isLiked: boolean }>(`/api/songs/${id}/isLiked`);
  }

  updateSongInfo(song: Song) {
    const songForWrite = new SongWriteDTO();
    songForWrite.id = song.id;
    songForWrite.name = song.name;
    songForWrite.hasCensorship = song.hasCensorship;

    return this._httpService.putRequest<SongWriteDTO>('/api/songs', songForWrite);
  }

  updateOrders(songOrders: SongOrder[]){
    return this._httpService.putRequest<SongWriteDTO>('/api/songs/orders', songOrders);
  }
}
