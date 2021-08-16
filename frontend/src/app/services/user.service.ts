import { Injectable } from '@angular/core';
import { User } from '../models/user/user';
import { UserChangeIcon } from '../models/user/user-change-icon';
import { UserChangePassword } from '../models/user/user-change-password';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public routePrefix = '/api/Users';

  constructor(private _httpService: HttpInternalService) { }

  updateUser(user: User) {
    return this._httpService.putRequest<User>(this.routePrefix, user);
  }

  getUser(id: number) {
    return this._httpService.getRequest<User>(`${this.routePrefix}/${id}`);
  }

  getUserImage(id: number) {
    return this._httpService.getRequest<{imageUrl: string}>(`${this.routePrefix}/${id}/image`);
  }

  updateUserPassword(userChangePassword: UserChangePassword) {
    const route = `${this.routePrefix}/changePassword`;
    return this._httpService.putFullRequest<UserChangePassword>(route, userChangePassword);
  }

  updateUserIcon(user: UserChangeIcon) {
    return this._httpService.putRequest<UserChangeIcon>(`${this.routePrefix}/changeIcon`, user);
  }
}
