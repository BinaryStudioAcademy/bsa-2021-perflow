import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortOrderIconComponent } from './sort-order-icon.component';

describe('SortOrderIconComponent', () => {
  let component: SortOrderIconComponent;
  let fixture: ComponentFixture<SortOrderIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortOrderIconComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortOrderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
