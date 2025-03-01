import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysComponent } from './sys.component';

describe('SysComponent', () => {
  let component: SysComponent;
  let fixture: ComponentFixture<SysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
