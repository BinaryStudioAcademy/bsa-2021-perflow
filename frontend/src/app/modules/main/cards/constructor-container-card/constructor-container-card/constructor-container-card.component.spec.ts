import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorContainerCardComponent } from './constructor-container-card.component';

describe('ConstructorContainerCardComponent', () => {
  let component: ConstructorContainerCardComponent;
  let fixture: ComponentFixture<ConstructorContainerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstructorContainerCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorContainerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
