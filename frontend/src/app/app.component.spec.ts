import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;
    expect(APP).toBeTruthy();
  });

  it('should have as title \'frontend\'', () => {
    const FIXTURE = TestBed.createComponent(AppComponent);
    const APP = FIXTURE.componentInstance;
    expect(APP.title).toEqual('frontend');
  });

  it('should render title', () => {
    const FIXTURE = TestBed.createComponent(AppComponent);
    FIXTURE.detectChanges();
    const COMPILED = FIXTURE.nativeElement as HTMLElement;
    expect(COMPILED.querySelector('.content span')?.textContent)
      .toContain('frontend app is running!');
  });
});
