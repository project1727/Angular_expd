import { TestBed } from '@angular/core/testing';

import { MasterUIService } from './master-ui.service';

describe('MasterUIService', () => {
  let service: MasterUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
