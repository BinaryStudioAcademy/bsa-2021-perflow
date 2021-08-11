import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:frontend/src/app/modules/main/albums/albums.component.spec.ts
import { AlbumsComponent } from './albums.component';

describe('PlaylistComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumsComponent]
=======
import { AlbumCardComponent } from './album-card.component';

describe('AlbumCardComponent', () => {
  let component: AlbumCardComponent;
  let fixture: ComponentFixture<AlbumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumCardComponent]
>>>>>>> merge:frontend/src/app/modules/album/components/album-card/album-card.component.spec.ts
    })
      .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:frontend/src/app/modules/main/albums/albums.component.spec.ts
    fixture = TestBed.createComponent(AlbumsComponent);
=======
    fixture = TestBed.createComponent(AlbumCardComponent);
>>>>>>> merge:frontend/src/app/modules/album/components/album-card/album-card.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
