import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _profileIconUpdate = new Subject<string>();

  profileIconUpdated$ = this._profileIconUpdate.asObservable();

  updateProfileIcon(iconURL: string) {
    this._profileIconUpdate.next(iconURL);
  }
}
