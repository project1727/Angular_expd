import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusConfigurationComponent } from './bus-configuration.component';

describe('BusConfigurationComponent', () => {
  let component: BusConfigurationComponent;
  let fixture: ComponentFixture<BusConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
