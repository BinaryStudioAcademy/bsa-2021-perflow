import { Injectable } from '@angular/core';
import { UserDTO } from '../models/user/UserDTO';
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
    const response = this.httpService.getRequest<UserDTO[]>(`/api/ArtistReaction/${userId}`);
    return response;
  }
}
