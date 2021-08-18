import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsResultComponent } from './songs-result.component';

describe('SongsResultComponent', () => {
  let component: SongsResultComponent;
  let fixture: ComponentFixture<SongsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
