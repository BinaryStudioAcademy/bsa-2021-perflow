import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlaylistComponent } from './view-playlist.component';

describe('ViewPlaylistComponent', () => {
  let component: ViewPlaylistComponent;
  let fixture: ComponentFixture<ViewPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPlaylistComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
