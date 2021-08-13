import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsPageComponent } from './albums-page.component';

describe('AlbumsPageComponent', () => {
  let component: AlbumsPageComponent;
  let fixture: ComponentFixture<AlbumsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumsPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
