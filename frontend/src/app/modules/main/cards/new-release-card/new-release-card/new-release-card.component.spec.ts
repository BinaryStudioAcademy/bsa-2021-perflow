import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleaseCardComponent } from './new-release-card.component';

describe('NewReleaseCardComponent', () => {
  let component: NewReleaseCardComponent;
  let fixture: ComponentFixture<NewReleaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewReleaseCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReleaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
