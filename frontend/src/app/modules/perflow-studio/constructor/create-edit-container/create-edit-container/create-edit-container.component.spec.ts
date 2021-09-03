import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditContainerComponent } from './create-edit-container.component';

describe('CreateEditContainerComponent', () => {
  let component: CreateEditContainerComponent;
  let fixture: ComponentFixture<CreateEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditContainerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
