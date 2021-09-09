import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tag } from 'src/app/models/tag/tag';

@Injectable({
  providedIn: 'root'
})
export class SongTagsService {
  private _tagSubject = new Subject<Tag>();

  tagSubjectState$ = this._tagSubject.asObservable();

  update(tag: Tag) {
    this._tagSubject.next(tag);
  }
}
