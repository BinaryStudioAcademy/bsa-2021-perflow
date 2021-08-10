import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { SongWriteDTO } from 'src/app/models/song/song-write';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  constructor(
    private _httpService: HttpInternalService
  ) { }

  public getLikedSongs() {
    return this._httpService.getRequest<Song[]>('/api/songs/liked');
  }

  getSongsByName = (searchTerm: string): Observable<Song[]> => {
    const httpParams = { searchTerm: `${searchTerm}` };
    return this._httpService.getRequest<Song[]>('/api/songs/search', httpParams);
  };

  getSongById = (id: number) => this._httpService.getRequest<Song>(`/api/songs/${id}`);

  uploadSong = (songForWrite: SongWriteDTO, song: File) => this._uploadSongInfo(songForWrite).pipe(
    map((response) => ({ response, obs: this._uploadSongFile(song, response.id) }))
  );

  private _uploadSongFile = (song: File, id: number) => {
    const formData = new FormData();

    formData.append('file', song, song.name);

    return this._httpService.postClearRequest<SongWriteDTO>(
      `/api/Songs/upload/${id}`,
      formData
    );
  };

  private _uploadSongInfo = (songInfo: SongWriteDTO) => this._httpService.postRequest<SongWriteDTO>(
    '/api/Songs/upload',
    songInfo
  );

  deleteSongInfo = (id: number) => this._httpService.deleteRequest(
    `/api/Songs/delete/${id}`
  );
}
