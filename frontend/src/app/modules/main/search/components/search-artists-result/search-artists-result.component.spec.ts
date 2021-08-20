import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtistsResultComponent } from './search-artists-result.component';

describe('SearchArtistsResultComponent', () => {
  let component: SearchArtistsResultComponent;
  let fixture: ComponentFixture<SearchArtistsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchArtistsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchArtistsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
