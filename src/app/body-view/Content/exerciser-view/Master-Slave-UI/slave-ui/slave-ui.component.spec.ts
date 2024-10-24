import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaveUIComponent } from './slave-ui.component';

describe('SlaveUIComponent', () => {
  let component: SlaveUIComponent;
  let fixture: ComponentFixture<SlaveUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaveUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaveUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
