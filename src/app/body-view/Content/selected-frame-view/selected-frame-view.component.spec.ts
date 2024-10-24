import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFrameViewComponent } from './selected-frame-view.component';

describe('SelectedFrameViewComponent', () => {
  let component: SelectedFrameViewComponent;
  let fixture: ComponentFixture<SelectedFrameViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedFrameViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedFrameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
