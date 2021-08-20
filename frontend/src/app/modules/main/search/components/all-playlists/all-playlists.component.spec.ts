import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlaylistsComponent } from './all-playlists.component';

describe('AllPlaylistsComponent', () => {
  let component: AllPlaylistsComponent;
  let fixture: ComponentFixture<AllPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPlaylistsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
