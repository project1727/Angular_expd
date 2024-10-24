import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterScriptComponent } from './master-script.component';

describe('MasterScriptComponent', () => {
  let component: MasterScriptComponent;
  let fixture: ComponentFixture<MasterScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterScriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
