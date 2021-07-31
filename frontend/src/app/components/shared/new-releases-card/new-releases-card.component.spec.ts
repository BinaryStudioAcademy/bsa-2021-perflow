import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleasesCardComponent } from './new-releases-card.component';

describe('NewReleasesCardComponent', () => {
  let component: NewReleasesCardComponent;
  let fixture: ComponentFixture<NewReleasesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReleasesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReleasesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
