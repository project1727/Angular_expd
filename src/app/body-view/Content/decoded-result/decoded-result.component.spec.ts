import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodedResultComponent } from './decoded-result.component';

describe('DecodedResultComponent', () => {
  let component: DecodedResultComponent;
  let fixture: ComponentFixture<DecodedResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecodedResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecodedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
