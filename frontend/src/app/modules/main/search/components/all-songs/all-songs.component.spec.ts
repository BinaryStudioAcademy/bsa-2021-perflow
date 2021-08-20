import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSongsComponent } from './all-songs.component';

describe('AllSongsComponent', () => {
  let component: AllSongsComponent;
  let fixture: ComponentFixture<AllSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllSongsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
