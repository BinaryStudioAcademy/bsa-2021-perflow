import { Injectable } from '@angular/core';
import { AlbumForReadDTO } from '../models/album/albumForReadDTO';
import { ArtistReadDTO } from '../models/user/ArtistReadDTO';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  httpService: HttpInternalService;

  constructor(httpService: HttpInternalService) {
    this.httpService = httpService;
  }

  likeSong(songId: number, userId: number) {
    const response = this.httpService.postClearRequest(
      '/api/SongReaction/like',
      { userId, songId }
    );
    return response;
  }

  removeLike(songId: number, userId: number) {
    const response = this.httpService.postClearRequest(
      '/api/SongReaction/removeLike',
      { userId, songId }
    );
    return response;
  }

  getArtistsByUserId(userId: number) {
    const response = this.httpService.getRequest<ArtistReadDTO[]>(`/api/ArtistReaction/${userId}`);
    return response;
  }

  addArtistReaction(artistId: number, userId: number) {
    const response = this.httpService.postClearRequest(
      '/api/ArtistReaction/like',
      { artistId, userId }
    );
    return response;
  }

  removeArtistReaction(artistId: number, userId: number) {
    const response = this.httpService.postClearRequest(
      '/api/ArtistReaction/removeLike',
      { artistId, userId }
    );
    return response;
  }

  getAlbumsByUserId(userId: number) {
    const response = this.httpService.getRequest<AlbumForReadDTO[]>(`/api/AlbumReaction/${userId}`);
    return response;
  }

  addAlbumReaction(albumId: number, userId: number) {
    const response = this.httpService.postClearRequest(
      '/api/AlbumReaction/like',
      { albumId, userId }
    );
    return response;
  }

  removeAlbumReaction(albumId: number, userId: number) {
    const response = this.httpService.postClearRequest(
      '/api/AlbumReaction/removeLike',
      { albumId, userId }
    );
    return response;
  }
}
