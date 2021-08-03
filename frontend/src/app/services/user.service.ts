import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public routePrefix = '/api/Users';

  constructor(private _httpService: HttpInternalService) { }

  public updateUser(user: object): Observable<HttpResponse<object>> {
    return this._httpService.putFullRequest<object>(this.routePrefix, user);
  }
}