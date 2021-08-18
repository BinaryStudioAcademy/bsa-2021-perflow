import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsResultComponent } from './albums-result.component';

describe('AlbumsResultComponent', () => {
  let component: AlbumsResultComponent;
  let fixture: ComponentFixture<AlbumsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumsResultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
