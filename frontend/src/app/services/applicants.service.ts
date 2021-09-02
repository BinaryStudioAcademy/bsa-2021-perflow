import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditUserRole } from '../models/applicants/edit-user-role';
import { EditUserApplicationStatus } from '../models/applicants/user-status-response';
import { UserWithStatus } from '../models/applicants/user-with-status';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {
  private readonly _routePrefix = '/api/Applicants';

  constructor(
    private _httpService: HttpInternalService
  ) { }

  getApplicants(): Observable<UserWithStatus[]> {
    return this._httpService.getRequest<UserWithStatus[]>(this._routePrefix);
  }

  setUserApplicationStatus(status: EditUserApplicationStatus) {
    return this._httpService.putRequest(this._routePrefix, status);
  }

  getArtistByName(term: string): Observable<UserWithStatus[]> {
    const httpParams = { term };
    return this._httpService.getRequest<UserWithStatus[]>(`${this._routePrefix}/usersSearch`, httpParams);
  }

  editUserRole(userRole: EditUserRole): Observable<EditUserRole> {
    return this._httpService.putRequest<EditUserRole>(`${this._routePrefix}/editRole`, userRole);
  }
}
