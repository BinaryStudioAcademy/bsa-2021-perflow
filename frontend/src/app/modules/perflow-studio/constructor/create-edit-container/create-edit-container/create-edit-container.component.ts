import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { ContainerFull } from 'src/app/models/constructor/container-full';
import { PageSectionFull } from 'src/app/models/constructor/page-section-full';
import { EntityType } from 'src/app/models/enums/entity-type';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { PageSectionEntityFull } from 'src/app/models/constructor/page-section-entity-full';
import { ConstructorService } from 'src/app/services/constructor.service';
import { switchMap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-edit-container',
  templateUrl: './create-edit-container.component.html',
  styleUrls: ['./create-edit-container.component.sass']
})
export class CreateEditContainerComponent implements OnInit, OnDestroy {
  container: ContainerFull = {} as ContainerFull;
  currentAccordionAlbumId: number = 0;
  editNamePosition: number = -1;
  maxPos: number;
  isModalShown: boolean = false;
  editedSection: PageSectionFull = {} as PageSectionFull;
  isLoading: boolean = true;

  private _unsubscribe$ = new Subject<void>();
  private _id: number | undefined;
  private _isEditMode: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _constructorService: ConstructorService,
    private _router: Router,
    private _snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.pipe(
      switchMap((params) => params.getAll('id'))
    ).subscribe((data) => {
      this._id = +data;
    });
    if (this._id) {
      this._isEditMode = true;
      this.startEditMode();
    }
    else {
      this._isEditMode = false;
      this.container = this.getBasicContainerFull();
      this.maxPos = Math.max(...this.container.pageSections.map((o: PageSectionFull) => o.position));
      this.isLoading = false;
    }
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  startEditMode = () => {
    this._constructorService.getContainer(this._id!).subscribe(
      (resp) => {
        this.container = resp.body!;
        this.maxPos = Math.max(...this.container.pageSections.map((o: PageSectionFull) => o.position));
        this.isLoading = false;
      }
    );
  };

  getBasicContainerFull = () => ({
    name: '',
    isPublished: false,
    showRecentlyPlayed: true,
    showMix: true,
    pageSections: this.getBasicSectionsFull()
  });

  getBasicSectionsFull = () => ([
    {
      position: 1,
      name: 'Accordion',
      pageSectionEntities: []
    },
    {
      position: 2,
      name: 'First section',
      pageSectionEntities: []
    },
    {
      position: 3,
      name: 'Second section',
      pageSectionEntities: []
    }
  ]);

  drop(event: CdkDragDrop<PageSectionFull[]>) {
    moveItemInArray(this.container.pageSections, event.previousIndex + 1, event.currentIndex + 1);
    Object.keys(this.container.pageSections).forEach(
      (i) => {
        const index = parseInt(i, 10);
        this.container.pageSections[index].position = index + 1;
      }
    );
  }

  getAccordionSection = () => this.container.pageSections.find((ps) => ps.position === 1)!;

  dropSearch(event: CdkDragDrop<any[]>) {
    if (!(event.container.id === event.previousContainer.id)) {
      const newEntity = event.previousContainer.data[event.previousIndex];
      let newEntityType: EntityType;
      if (this.instanceOfAlbum(newEntity)) {
        newEntityType = EntityType.album;
      }
      else if (this.instanceOfArtist(newEntity)) {
        newEntityType = EntityType.artist;
      }
      else {
        newEntityType = EntityType.playlist;
      }
      const newEntityPageSectionId = parseInt(event.container.id.slice(-1), 10) - 1;
      const newEntityPageSection = this.container.pageSections[newEntityPageSectionId];
      const newEntityPosition = newEntityPageSection.pageSectionEntities.length !== 0
        ? Math.max(...newEntityPageSection.pageSectionEntities
          .map((o: PageSectionEntityFull) => o.position)) + 1
        : 1;
      const newPageSectionEntity = {
        entityType: newEntityType,
        entity: newEntity,
        referenceId: newEntity.Id,
        pageSection: newEntityPageSection,
        position: newEntityPosition
      };
      this.container.pageSections[newEntityPageSectionId].pageSectionEntities
        .push(newPageSectionEntity);
    }
  }

  editName = (position: number) => {
    this.editNamePosition = position;
  };

  showEditSectionModal = (position: number) => {
    this.editedSection = [...this.container.pageSections].find((ps: PageSectionFull) => ps.position === position)!;
    this.isModalShown = !this.isModalShown;
  };

  onSubmitModal = (data: PageSectionFull) => {
    this.isModalShown = !this.isModalShown;
    const pageSectionIndex = this.container.pageSections
      .findIndex((ps: PageSectionFull) => ps.position === data.position);
    this.container.pageSections[pageSectionIndex] = data;
  };

  closeModal() {
    this.isModalShown = !this.isModalShown;
    this.editedSection = {
      position: -1,
      name: '',
      pageSectionEntities: []
    };
  }

  saveName = () => {
    this.editNamePosition = -1;
  };

  saveContainer = () => {
    if (this._id) {
      this._constructorService.updateContainer(this.container).subscribe(
        (resp) => {
          this._snackbarService.show({
            message: 'Your changes confirmed.',
            header: 'Container edited successfully!'
          });
          this._router.navigateByUrl('/perflowstudio/constructor');
        }
      );
    }
    else {
      this._constructorService.createContainer(this.container).subscribe(
        (resp) => {
          this._snackbarService.show({
            message: 'Now you can publish it.',
            header: 'Container created successfully!'
          });
          this._router.navigateByUrl('/perflowstudio/constructor');
        }
      );
    }
  };

  addNewSection = () => {
    if (this.maxPos < 10) {
      this.maxPos += 1;
      const newSection = {
        position: this.maxPos,
        name: 'Section',
        pageSectionEntities: []
      };
      this.container.pageSections.push(newSection);
    }
  };
  /* eslint-disable no-param-reassign */
  deleteSection = (position: number) => {
    const sectionIndex = this.container.pageSections.findIndex((ps: PageSectionFull) => ps.position === position);
    this.container.pageSections.splice(sectionIndex, 1);
    this.container.pageSections.forEach((ps: PageSectionFull) => {
      if (ps.position > position) {
        ps.position -= 1;
      }
    });
    this.maxPos -= 1;
  };

  /* eslint-enable no-param-reassign */
  instanceOfAlbum = (data: any): data is AlbumForReadDTO => 'releaseYear' in data;

  instanceOfArtist = (data: any): data is ArtistReadDTO => 'userName' in data;
}
