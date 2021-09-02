import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRowComponent } from './role-row.component';

describe('RoleRowComponent', () => {
  let component: RoleRowComponent;
  let fixture: ComponentFixture<RoleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleRowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
