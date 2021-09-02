import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupModalComponent } from './group-modal.component';

describe('GroupModalComponent', () => {
  let component: GroupModalComponent;
  let fixture: ComponentFixture<GroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
