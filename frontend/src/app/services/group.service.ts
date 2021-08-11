import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group/group';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private _httpService: HttpInternalService) { }

  getAllGroups(): Observable<Group[]> {
    return this._httpService.getRequest<Group[]>('/api/Groups');
  }
}
