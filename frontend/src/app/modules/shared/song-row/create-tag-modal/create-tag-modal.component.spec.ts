import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTagModalComponent } from './create-tag-modal.component';

describe('CreateTagModalComponent', () => {
  let component: CreateTagModalComponent;
  let fixture: ComponentFixture<CreateTagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTagModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
