import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPageComponent } from './other-page.component';

describe('OtherPageComponent', () => {
  let component: OtherPageComponent;
  let fixture: ComponentFixture<OtherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
