import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderViewComponent } from './header-view.component';

describe('HeaderViewComponent', () => {
  let component: HeaderViewComponent;
  let fixture: ComponentFixture<HeaderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
