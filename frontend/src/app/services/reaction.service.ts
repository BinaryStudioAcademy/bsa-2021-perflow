import { Injectable } from '@angular/core';
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
}
