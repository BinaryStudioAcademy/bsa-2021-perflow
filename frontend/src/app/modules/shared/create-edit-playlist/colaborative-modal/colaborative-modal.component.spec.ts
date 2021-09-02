import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaborativeModalComponent } from './colaborative-modal.component';

describe('ColaborativeModalComponent', () => {
  let component: ColaborativeModalComponent;
  let fixture: ComponentFixture<ColaborativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColaborativeModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaborativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
