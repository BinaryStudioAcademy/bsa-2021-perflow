import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareInfoCardComponent } from './square-info-card.component';

describe('SquareInfoCardComponent', () => {
  let component: SquareInfoCardComponent;
  let fixture: ComponentFixture<SquareInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
