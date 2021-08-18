import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsResultComponent } from './artists-result.component';

describe('ArtistsResultComponent', () => {
  let component: ArtistsResultComponent;
  let fixture: ComponentFixture<ArtistsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
