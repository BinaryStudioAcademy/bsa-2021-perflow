import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { groupToFormData, objectToFormData } from '../helpers/object-to-formData-converter';
import { CreatedGroup } from '../models/group/createdGroup';
import { Group } from '../models/group/group';
import { GroupEdit } from '../models/group/group-edit';
import { GroupFull } from '../models/group/groupFull';
import { ArtistReadDTO } from '../models/user/ArtistReadDTO';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public routePrefix = '/api/Groups';

  constructor(private _httpService: HttpInternalService) { }

  getGroupsByArtist(id: number): Observable<Group[]> {
    return this._httpService.getRequest<Group[]>(`${this.routePrefix}/artist/${id}`);
  }

  getGroup(id: number): Observable<GroupFull> {
    return this._httpService.getRequest<GroupFull>(`${this.routePrefix}/${id}`);
  }

  createGroup(group: CreatedGroup) {
    const formData = groupToFormData(group);

    return this._httpService.postRequest<ArtistReadDTO>(this.routePrefix, formData);
  }

  checkGroupMember(groupId: number) {
    return this._httpService.getFullRequest<boolean>(`${this.routePrefix}/isMember/${groupId}`);
  }

  editGroup(group: GroupEdit) {
    const formData = objectToFormData(group);

    return this._httpService.putFullRequest<GroupFull>(`${this.routePrefix}`, formData);
  }
}
