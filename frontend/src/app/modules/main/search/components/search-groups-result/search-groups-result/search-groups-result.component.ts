import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { take } from 'rxjs/operators';
import { PageSectionEntityFull } from 'src/app/models/constructor/page-section-entity-full';
import { WriteSearchHistory } from 'src/app/models/search/write-search-history';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-search-groups-result',
  templateUrl: './search-groups-result.component.html',
  styleUrls: ['./search-groups-result.component.sass']
})
export class SearchGroupsResultComponent {
  @Input() groups: Array<ArtistReadDTO> = new Array<ArtistReadDTO>();
  @Input() term: string;
  @Input() isCheckBox: boolean = false;
  @Input() currentGroups: PageSectionEntityFull[];

  @Output()
  addDeleteFromSection = new EventEmitter<ArtistReadDTO>();

  private _userId: number;

  constructor(
    private _searchHistoryService: SearchHistoryService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(take(1))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  saveToSearchHistory = (group: ArtistReadDTO) => {
    const history = {
      userId: this._userId,
      groupId: group.id
    } as WriteSearchHistory;

    this._searchHistoryService.addSearchHistory(history)
      .pipe(take(1)).subscribe();
  };
  drop(event: CdkDragDrop<any[]>) {
    if (event.container.id === event.previousContainer.id) {
      // move inside same list
      moveItemInArray(this.groups, event.previousIndex, event.currentIndex);
    }
    else {
      // move between lists
    }
  }

  addDeleteFromSectionEvent(group: ArtistReadDTO) {
    this.addDeleteFromSection.emit(group);
  }

  isChecked(group: ArtistReadDTO) {
    return this.currentGroups.findIndex((a) => a.referenceId === group.id) !== -1;
  }
}
