import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserRegisterDto } from '../models/auth/user-register-dto';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public routePrefix = '/api/Users';

  constructor(private _httpService: HttpInternalService) { }

  public createUser(newUser: UserRegisterDto): Observable<HttpResponse<UserRegisterDto>> {
    return this._httpService.postFullRequest<UserRegisterDto>(`${this.routePrefix}`, newUser);
  }
}
