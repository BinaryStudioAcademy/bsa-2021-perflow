import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserRegister } from '../models/auth/user-register';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public routePrefix = '/api/Users';

  constructor(private _httpService: HttpInternalService) { }

  public createUser(newUser: UserRegister): Observable<HttpResponse<UserRegister>> {
    return this._httpService.postFullRequest<UserRegister>(`${this.routePrefix}`, newUser);
  }
}
