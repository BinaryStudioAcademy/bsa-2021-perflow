import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentlyPlayedCardComponent } from './recently-played-card.component';

describe('SongCardComponent', () => {
  let component: RecentlyPlayedCardComponent;
  let fixture: ComponentFixture<RecentlyPlayedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentlyPlayedCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyPlayedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
