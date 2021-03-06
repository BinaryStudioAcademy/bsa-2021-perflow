import { Injectable } from '@angular/core';
import { AlbumView } from '../models/album/album-view';
import { AlbumForReadDTO } from '../models/album/albumForReadDTO';
import { Playlist } from '../models/playlist';
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
    return this.httpService.postClearRequest(
      '/api/SongReaction/like',
      { userId, songId }
    );
  }

  removeLike(songId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/SongReaction/removeLike',
      { userId, songId }
    );
  }

  getArtistsByUserId(userId: number) {
    return this.httpService.getRequest<ArtistReadDTO[]>(`/api/ArtistReaction/${userId}`);
  }

  getGroupsByUserId(userId: number) {
    return this.httpService.getRequest<ArtistReadDTO[]>(`/api/GroupReactions/${userId}`);
  }

  addArtistReaction(artistId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/ArtistReaction/like',
      { artistId, userId }
    );
  }

  removeArtistReaction(artistId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/ArtistReaction/removeLike',
      { artistId, userId }
    );
  }

  addGroupReaction(groupId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/GroupReactions/like',
      { groupId, userId }
    );
  }

  removeGroupReaction(groupId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/GroupReactions/removeLike',
      { groupId, userId }
    );
  }

  getAlbumsByUserId(userId: number) {
    return this.httpService.getRequest<AlbumForReadDTO[]>(`/api/AlbumReaction/${userId}`);
  }

  addAlbumReaction(albumId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/AlbumReaction/like',
      { albumId, userId }
    );
  }

  removeAlbumReaction(albumId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/AlbumReaction/removeLike',
      { albumId, userId }
    );
  }

  addPlaylistReaction(playlistId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/PlaylistReaction/like',
      { playlistId, userId }
    );
  }

  removePlaylistReaction(playlistId: number, userId: number) {
    return this.httpService.postClearRequest(
      '/api/PlaylistReaction/removeLike',
      { playlistId, userId }
    );
  }

  getLikedPlaylistsByTheUser(userId: number) {
    return this.httpService.getRequest<Playlist[]>(`/api/PlaylistReaction/liked/${userId}`);
  }

  getLikedAlbumssByTheUser(userId: number) {
    return this.httpService.getRequest<AlbumView[]>(`/api/AlbumReaction/liked/${userId}`);
  }
}
