import { Injectable } from '@angular/core';
import { User } from '../models/user/User';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  httpService: HttpInternalService;

  constructor(httpService: HttpInternalService) {
    this.httpService = httpService;
  }

  getArtistsByUserId(userId: number) {
    const response = this.httpService.getRequest<User[]>(`/api/ArtistReaction/${userId}`);
    return response;
  }
}
