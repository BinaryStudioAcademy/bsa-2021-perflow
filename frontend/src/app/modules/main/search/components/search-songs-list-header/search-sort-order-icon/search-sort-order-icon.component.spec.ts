import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortOrderIconComponent } from './search-sort-order-icon.component';

describe('SortOrderIconComponent', () => {
  let component: SearchSortOrderIconComponent;
  let fixture: ComponentFixture<SearchSortOrderIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSortOrderIconComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSortOrderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
