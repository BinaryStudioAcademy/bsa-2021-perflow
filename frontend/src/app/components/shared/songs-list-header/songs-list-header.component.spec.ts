import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsListHeaderComponent } from './songs-list-header.component';

describe('SongsListHeaderComponent', () => {
  let component: SongsListHeaderComponent;
  let fixture: ComponentFixture<SongsListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongsListHeaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
