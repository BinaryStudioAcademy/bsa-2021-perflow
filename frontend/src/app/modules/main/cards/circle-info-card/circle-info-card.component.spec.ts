import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:frontend/src/app/modules/main/cards/playlist-card/playlist-card.component.spec.ts
import { PlaylistCardComponent } from './playlist-card.component';

describe('CalmRhythmsCardComponent', () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistCardComponent]
=======
import { CircleInfoCardComponent } from './circle-info-card.component';

describe('CircleInfoCardComponent', () => {
  let component: CircleInfoCardComponent;
  let fixture: ComponentFixture<CircleInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleInfoCardComponent]
>>>>>>> merge:frontend/src/app/modules/main/cards/circle-info-card/circle-info-card.component.spec.ts
    })
      .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:frontend/src/app/modules/main/cards/playlist-card/playlist-card.component.spec.ts
    fixture = TestBed.createComponent(PlaylistCardComponent);
=======
    fixture = TestBed.createComponent(CircleInfoCardComponent);
>>>>>>> merge:frontend/src/app/modules/main/cards/circle-info-card/circle-info-card.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
