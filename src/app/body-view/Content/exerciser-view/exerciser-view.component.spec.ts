import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciserViewComponent } from './exerciser-view.component';

describe('ExerciserViewComponent', () => {
  let component: ExerciserViewComponent;
  let fixture: ComponentFixture<ExerciserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciserViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
