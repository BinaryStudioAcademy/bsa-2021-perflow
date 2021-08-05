import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditComponent } from './user-profile-edit.component';

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
