import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysExtendedComponent } from './sys-extended.component';

describe('SysExtendedComponent', () => {
  let component: SysExtendedComponent;
  let fixture: ComponentFixture<SysExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysExtendedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
