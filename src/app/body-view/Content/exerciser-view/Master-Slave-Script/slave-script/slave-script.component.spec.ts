import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaveScriptComponent } from './slave-script.component';

describe('SlaveScriptComponent', () => {
  let component: SlaveScriptComponent;
  let fixture: ComponentFixture<SlaveScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaveScriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaveScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
