import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferAccessComponent } from './buffer-access.component';

describe('BufferAccessComponent', () => {
  let component: BufferAccessComponent;
  let fixture: ComponentFixture<BufferAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BufferAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BufferAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
