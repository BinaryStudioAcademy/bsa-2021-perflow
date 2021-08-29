import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { ContainerFull } from 'src/app/models/constructor/container-full';
import { PageSectionFull } from 'src/app/models/constructor/page-section-full';
import { EntityType } from 'src/app/models/enums/entity-type';
import { ConstructorRecentlyPlayedSong } from 'src/app/models/constructor/container-recently-played-song';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';

@Component({
  selector: 'app-create-edit-container',
  templateUrl: './create-edit-container.component.html',
  styleUrls: ['./create-edit-container.component.sass']
})
export class CreateEditContainerComponent implements OnInit, OnDestroy {
  container: ContainerFull = {} as ContainerFull;
  accordionSection: PageSectionFull = {} as PageSectionFull;
  currentAccordionAlbumId: number = 0;
  editNamePosition: number = -1;
  maxPos: number;

  private _unsubscribe$ = new Subject<void>();
  private _id: number | undefined;
  private _isEditMode: boolean = false;

  showRecentlyPlayedSection: PageSectionFull = {
    position: -1,
    name: 'Recently played',
    pageSectionEntities: [
      {
        entityType: EntityType.song,
        entityId: undefined,
        entity:
          {
            name: 'Song Name',
            artist: 'Artist',
            group: null,
            album: { name: 'Album Name', iconURL: '' },
            playlist: null
          } as ConstructorRecentlyPlayedSong,
        position: 1
      },
      {
        entityType: EntityType.song,
        entityId: undefined,
        entity:
          {
            name: 'Song Name',
            artist: null,
            group: 'Group',
            album: { name: 'Album Name', iconURL: '' },
            playlist: null
          } as ConstructorRecentlyPlayedSong,
        position: 2
      },
      {
        entityType: EntityType.song,
        entityId: undefined,
        entity:
          {
            name: 'Song Name',
            artist: 'Artist',
            group: null,
            album: null,
            playlist: 'Playlist Name'
          } as ConstructorRecentlyPlayedSong,
        position: 3
      }
    ]
  };

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.container = this.getBasicContainerFull();
    this.accordionSection = this.getAccordionSectionData()!;
    this.maxPos = Math.max(...this.container.pageSections.map((o) => o.position));
    /* this._activatedRoute.paramMap.pipe(
      switchMap((params) => params.getAll('id'))
    ).subscribe((data) => {
      this._id = +data;
    }); */
    if (this._id) {
      this._isEditMode = true;
      // this.startEditMode();
    }
    else {
      this._isEditMode = false;
      // this.showEditAlbumModal();
    }
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getBasicContainerFull = () => ({
    name: 'New Container',
    isPublished: false,
    showRecentlyPlayed: true,
    showMix: true,
    pageSections: this.getBasicSectionsFull()
  });

  getBasicSectionsFull = () => ([
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
    /* {
      position: 4,
      name: "Third section",
      pageSectionEntities: []
    },
    {
      position: 5,
      name: "Fourth section",
      pageSectionEntities: []
    },
    {
      position: 6,
      name: "Fifth section",
      pageSectionEntities: []
    } */
  ]);

  getAccordionSectionData = () => ({
    position: 1,
    name: 'Accordion',
    pageSectionEntities: [
      {
        entityType: EntityType.album,
        entityId: undefined,
        entity: { name: 'TESTING NAME' },
        position: 1
      }
    ]
  });

  nextSlide = () => {

  };

  previousSlide = () => {

  };

  drop(event: CdkDragDrop<PageSectionFull[]>) {
    moveItemInArray(this.container.pageSections, event.previousIndex, event.currentIndex);
    // const orders = this.container.pageSections.map((s, index) => ({ previousPosition: s.position, currentPosition: index + 2 }));
  }

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
          .map((o) => o.position)) + 1
        : 1;
      const newPageSectionEntity = {
        entityType: newEntityType,
        entity: newEntity,
        entityId: newEntity.Id,
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

  saveName = () => {
    this.editNamePosition = -1;

    /* const subscription = this._songService.updateSongInfo(this.song).subscribe(() => {
      this.isEditing = false;
      subscription.unsubscribe();
    }); */
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
    const sectionIndex = this.container.pageSections.findIndex((ps) => ps.position === position);
    this.container.pageSections.splice(sectionIndex, 1);
    this.container.pageSections.forEach((ps) => {
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
