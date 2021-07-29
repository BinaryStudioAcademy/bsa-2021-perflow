import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongImageComponent } from './song-image.component';

describe('SongImageComponent', () =>
{
  let component: SongImageComponent;
  let fixture: ComponentFixture<SongImageComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [SongImageComponent]
    })
      .compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(SongImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});
