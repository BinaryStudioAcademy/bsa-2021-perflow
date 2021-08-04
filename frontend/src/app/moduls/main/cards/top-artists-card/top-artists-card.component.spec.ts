import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtistsCardComponent } from './top-artists-card.component';

describe('TopArtistsCardComponent', () => {
  let component: TopArtistsCardComponent;
  let fixture: ComponentFixture<TopArtistsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopArtistsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopArtistsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
