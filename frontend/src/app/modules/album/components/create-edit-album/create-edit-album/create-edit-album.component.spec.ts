import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAlbumComponent } from './create-edit-album.component';

describe('CreateEditAlbumComponent', () => {
  let component: CreateEditAlbumComponent;
  let fixture: ComponentFixture<CreateEditAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditAlbumComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
