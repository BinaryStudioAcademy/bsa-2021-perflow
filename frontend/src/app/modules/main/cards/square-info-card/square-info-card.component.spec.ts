import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:frontend/src/app/modules/main/artists/artists.component.spec.ts
import { ArtistsComponent } from './artists.component';

describe('PlaylistComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistsComponent]
=======
import { SquareInfoCardComponent } from './square-info-card.component';

describe('SquareInfoCardComponent', () => {
  let component: SquareInfoCardComponent;
  let fixture: ComponentFixture<SquareInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquareInfoCardComponent]
>>>>>>> merge:frontend/src/app/modules/main/cards/square-info-card/square-info-card.component.spec.ts
    })
      .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:frontend/src/app/modules/main/artists/artists.component.spec.ts
    fixture = TestBed.createComponent(ArtistsComponent);
=======
    fixture = TestBed.createComponent(SquareInfoCardComponent);
>>>>>>> merge:frontend/src/app/modules/main/cards/square-info-card/square-info-card.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
