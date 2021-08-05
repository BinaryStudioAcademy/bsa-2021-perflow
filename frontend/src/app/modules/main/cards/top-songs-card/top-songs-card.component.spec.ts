import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongsCardComponent } from './top-songs-card.component';

describe('TopSongsCardComponent', () => {
  let component: TopSongsCardComponent;
  let fixture: ComponentFixture<TopSongsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopSongsCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
