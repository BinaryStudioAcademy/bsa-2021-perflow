import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicantRowComponent } from './aplicant-row.component';

describe('AplicantRowComponent', () => {
  let component: AplicantRowComponent;
  let fixture: ComponentFixture<AplicantRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AplicantRowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicantRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
