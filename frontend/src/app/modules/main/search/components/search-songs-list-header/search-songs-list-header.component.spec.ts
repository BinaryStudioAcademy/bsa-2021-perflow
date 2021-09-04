import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSongsListHeaderComponent } from './search-songs-list-header.component';

describe('SongsListHeaderComponent', () => {
  let component: SearchSongsListHeaderComponent;
  let fixture: ComponentFixture<SearchSongsListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSongsListHeaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSongsListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
