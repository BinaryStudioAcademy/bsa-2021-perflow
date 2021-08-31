import {
  Component, ElementRef, EventEmitter, Input, Output, ViewChild
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { PageSectionEntityFull } from 'src/app/models/constructor/page-section-entity-full';
import { PageSectionFull } from 'src/app/models/constructor/page-section-full';
import { EntityType } from 'src/app/models/enums/entity-type';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-container-search-modal',
  templateUrl: './container-search-modal.component.html',
  styleUrls: ['./container-search-modal.component.sass']
})
export class ContainerSearchModalComponent {
  userId: number;
  userName: string;
  isAuthorHidden: boolean = true;
  selectedIndex: number;

  @Input() editedSection: PageSectionFull = { } as PageSectionFull;
  @Input() isAccordion: boolean;

  @Output() isClosed = new EventEmitter<void>();
  @Output() editSection = new EventEmitter<PageSectionFull>();

  @ViewChild('section') selectElement: ElementRef<HTMLSelectElement>;

  constructor(
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
        this.userName = authState!.userName;
      });
  }

  public onSubmit() {
    this.editSection.emit(this.editedSection);
    /* this.editedAlbum.iconURL = this.tempIconURL;
    this.editedAlbum.icon = this.file;

    if (this.editedAlbum.authorType === AuthorType.artist) {
      this.editedAlbum.authorId = this.userId;
      this.editedAlbum.groupId = undefined;
    }
    else {
      this.editedAlbum.authorId = undefined;
    }

    this.editAlbum.emit(this.editedAlbum); */
  }
  /* eslint-disable no-param-reassign */
  public onEntityAddDelete(entity: any) {
    let newEntityType: EntityType;
    if (this.instanceOfAlbum(entity)) {
      newEntityType = EntityType.album;
    }
    else if (this.instanceOfArtist(entity)) {
      newEntityType = EntityType.artist;
    }
    else {
      newEntityType = EntityType.playlist;
    }
    const newEntityPageSectionId = this.editedSection.pageSectionEntities
      .findIndex((pse) => pse.entityType === newEntityType && pse.referenceId === entity.id);
    if (newEntityPageSectionId === -1) {
      const newEntityPosition = this.editedSection.pageSectionEntities.length !== 0
        ? Math.max(...this.editedSection.pageSectionEntities
          .map((o: PageSectionEntityFull) => o.position)) + 1
        : 1;
      const newPageSectionEntity = {
        entityType: newEntityType,
        entity,
        referenceId: entity.id,
        position: newEntityPosition
      };
      this.editedSection.pageSectionEntities.push(newPageSectionEntity);
    }
    else {
      const entityPosition = this.editedSection.pageSectionEntities[newEntityPageSectionId].position;
      this.editedSection.pageSectionEntities.forEach((pse) => {
        if (pse.position > entityPosition) {
          pse.position -= 1;
        }
      });
      this.editedSection.pageSectionEntities.splice(newEntityPageSectionId, 1);
    }
  }
  /* eslint-enabled no-param-reassign */
  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  cancelModal() {
    this.isClosed.emit();
  }

  instanceOfAlbum = (data: any): data is AlbumForReadDTO => 'releaseYear' in data;

  instanceOfArtist = (data: any): data is ArtistReadDTO => 'userName' in data;
}
