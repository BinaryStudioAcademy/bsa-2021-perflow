import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleInfoCardComponent } from './circle-info-card.component';

describe('CircleInfoCardComponent', () => {
  let component: CircleInfoCardComponent;
  let fixture: ComponentFixture<CircleInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleInfoCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
