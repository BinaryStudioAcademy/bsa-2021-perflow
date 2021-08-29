import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainersPageComponent } from './containers-page.component';

describe('ContainersPageComponent', () => {
  let component: ContainersPageComponent;
  let fixture: ComponentFixture<ContainersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainersPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
