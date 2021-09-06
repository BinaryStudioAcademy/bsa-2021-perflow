import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSongsListComponent } from './search-songs-list.component';


describe('SongsListComponent', () => {
  let component: SearchSongsListComponent;
  let fixture: ComponentFixture<SearchSongsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSongsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
