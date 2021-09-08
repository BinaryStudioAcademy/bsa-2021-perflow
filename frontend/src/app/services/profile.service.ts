import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profileIconUpdate = new Subject<string>();
  private _profileNameUpdate = new Subject<string>();

  profileIconUpdated$ = this._profileIconUpdate.asObservable();
  profileNameUpdated$ = this._profileNameUpdate.asObservable();

  updateProfileIcon(iconURL: string) {
    this._profileIconUpdate.next(iconURL);
  }

  updateProfileName(name: string) {
    this._profileNameUpdate.next(name);
  }
}
