import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlbumModalComponent } from './edit-album-modal.component';

describe('EditAlbumModalComponent', () => {
  let component: EditAlbumModalComponent;
  let fixture: ComponentFixture<EditAlbumModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAlbumModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlbumModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
