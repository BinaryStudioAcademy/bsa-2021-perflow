import { Injectable } from '@angular/core';
import { CreatedTags } from 'src/app/models/tag/created-tags';
import { SongTags } from 'src/app/models/tag/song-tags';
import { CreatedTag } from '../../models/tag/created-tag';
import { Tag } from '../../models/tag/tag';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  public routePrefix = '/api/Tags';

  constructor(private _httpService: HttpInternalService) { }

  getAllTags() {
    return this._httpService.getRequest<Tag[]>(this.routePrefix);
  }

  createTag(tag: CreatedTag) {
    return this._httpService.postRequest<Tag>(this.routePrefix, tag);
  }

  createTags(tags: CreatedTags) {
    return this._httpService.postRequest<Tag[]>(`${this.routePrefix}/createTags`, tags);
  }

  addTagsToSong(songTags: SongTags) {
    return this._httpService.postRequest(`${this.routePrefix}/addTagsToSong`, songTags);
  }
}
