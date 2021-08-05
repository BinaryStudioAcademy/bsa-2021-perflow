import { Injectable } from '@angular/core';
import { ArtistReadDTO } from '../models/user/ArtistReadDTO';
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
    const response = this.httpService.getRequest<ArtistReadDTO[]>(`/api/ArtistReaction/${userId}`);
    return response;
  }
}
