import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuProfileComponent } from './main-menu-profile.component';

describe('MainMenuProfileComponent', () => {
  let component: MainMenuProfileComponent;
  let fixture: ComponentFixture<MainMenuProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuProfileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
