import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSongsResultComponent } from './search-songs-result.component';

describe('SearchSongsResultComponent', () => {
  let component: SearchSongsResultComponent;
  let fixture: ComponentFixture<SearchSongsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSongsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSongsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
