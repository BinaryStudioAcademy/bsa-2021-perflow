import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTagsModalComponent } from './edit-tags-modal.component';

describe('EditTagsModalComponent', () => {
  let component: EditTagsModalComponent;
  let fixture: ComponentFixture<EditTagsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTagsModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTagsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
