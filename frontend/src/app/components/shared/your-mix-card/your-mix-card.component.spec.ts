import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourMixCardComponent } from './your-mix-card.component';

describe('YourMixCardComponent', () => {
  let component: YourMixCardComponent;
  let fixture: ComponentFixture<YourMixCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourMixCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourMixCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
