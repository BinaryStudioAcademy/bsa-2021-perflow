import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlbumsResultComponent } from './search-albums-result.component';

describe('SearchAlbumsResultComponent', () => {
  let component: SearchAlbumsResultComponent;
  let fixture: ComponentFixture<SearchAlbumsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchAlbumsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAlbumsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
