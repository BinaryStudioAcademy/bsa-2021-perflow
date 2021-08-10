import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSongRowComponent } from './search-song-row.component';

describe('SearchSongRowComponent', () => {
  let component: SearchSongRowComponent;
  let fixture: ComponentFixture<SearchSongRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSongRowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSongRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
