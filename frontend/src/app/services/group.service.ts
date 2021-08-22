import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group/group';
import { GroupFull } from '../models/group/groupFull';
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
}
