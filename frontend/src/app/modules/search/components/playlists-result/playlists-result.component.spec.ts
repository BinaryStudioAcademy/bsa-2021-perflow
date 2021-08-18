import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsResultComponent } from './playlists-result.component';

describe('PlaylistsResultComponent', () => {
  let component: PlaylistsResultComponent;
  let fixture: ComponentFixture<PlaylistsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
