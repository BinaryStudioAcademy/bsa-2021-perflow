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
    const response = this.httpService.postRequest<boolean>(
      '/api/SongReaction/like',
      { userId, songId }
    );
    return response;
  }
}
