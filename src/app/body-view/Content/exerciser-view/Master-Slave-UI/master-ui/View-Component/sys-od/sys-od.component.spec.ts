import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysODComponent } from './sys-od.component';

describe('SysODComponent', () => {
  let component: SysODComponent;
  let fixture: ComponentFixture<SysODComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysODComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
