import { TestBed } from '@angular/core/testing';

import { DateCustomService } from './date-custom.service';

describe('DateCustomService', () => {
  let service: DateCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
