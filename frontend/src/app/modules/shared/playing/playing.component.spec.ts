import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingComponent } from './playing.component';

describe('PlayingComponent', () => {
  let component: PlayingComponent;
  let fixture: ComponentFixture<PlayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
