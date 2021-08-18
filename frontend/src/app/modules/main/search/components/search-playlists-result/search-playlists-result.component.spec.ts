import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlaylistsResultComponent } from './search-playlists-result.component';

describe('SearchPlaylistsResultComponent', () => {
  let component: SearchPlaylistsResultComponent;
  let fixture: ComponentFixture<SearchPlaylistsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPlaylistsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlaylistsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
