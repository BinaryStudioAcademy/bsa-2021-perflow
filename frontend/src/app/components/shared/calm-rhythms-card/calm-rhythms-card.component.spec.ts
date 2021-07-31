import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalmRhythmsCardComponent } from './calm-rhythms-card.component';

describe('CalmRhythmsCardComponent', () => {
  let component: CalmRhythmsCardComponent;
  let fixture: ComponentFixture<CalmRhythmsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalmRhythmsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalmRhythmsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
