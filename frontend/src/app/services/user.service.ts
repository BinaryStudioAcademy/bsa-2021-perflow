import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserRegister } from '../models/auth/user-register';
import { User } from '../models/user/user';
import { UserChangePassword } from '../models/user/user-change-password';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public routePrefix = '/api/Users';

  constructor(private _httpService: HttpInternalService) { }

  public updateUser(user: User): Observable<HttpResponse<User>> {
    return this._httpService.putFullRequest<User>(this.routePrefix, user);
  }

  public updateUserPassword(userChangePassword: UserChangePassword): Observable<HttpResponse<UserChangePassword>> {
    const route = `${this.routePrefix}/changePassword`;
    return this._httpService.putFullRequest<UserChangePassword>(route, userChangePassword);
  }

  public createUser(newUser: UserRegister): Observable<HttpResponse<UserRegister>> {
    return this._httpService.postFullRequest<UserRegister>(`${this.routePrefix}`, newUser);
  }
}
