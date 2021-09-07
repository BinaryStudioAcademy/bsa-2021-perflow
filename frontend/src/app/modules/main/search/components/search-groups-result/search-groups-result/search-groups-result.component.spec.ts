import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGroupsResultComponent } from './search-groups-result.component';

describe('SearchGroupsResultComponent', () => {
  let component: SearchGroupsResultComponent;
  let fixture: ComponentFixture<SearchGroupsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchGroupsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGroupsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
