import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUIComponent } from './master-ui.component';

describe('MasterUIComponent', () => {
  let component: MasterUIComponent;
  let fixture: ComponentFixture<MasterUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
