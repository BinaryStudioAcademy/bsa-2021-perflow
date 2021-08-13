import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsUploadModalComponent } from './songs-upload-modal.component';

describe('SongsUploadModalComponent', () => {
  let component: SongsUploadModalComponent;
  let fixture: ComponentFixture<SongsUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongsUploadModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
