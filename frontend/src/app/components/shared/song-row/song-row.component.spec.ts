import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRowComponent } from './song-row.component';

describe('SongRowComponent', () => {
  let component: SongRowComponent;
  let fixture: ComponentFixture<SongRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
