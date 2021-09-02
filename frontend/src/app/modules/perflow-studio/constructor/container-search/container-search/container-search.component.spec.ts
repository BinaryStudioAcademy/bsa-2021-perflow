import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSearchComponent } from './container-search.component';

describe('ContainerSearchComponent', () => {
  let component: ContainerSearchComponent;
  let fixture: ComponentFixture<ContainerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerSearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
