import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSearchModalComponent } from './container-search-modal.component';

describe('ContainerSearchModalComponent', () => {
  let component: ContainerSearchModalComponent;
  let fixture: ComponentFixture<ContainerSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerSearchModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
