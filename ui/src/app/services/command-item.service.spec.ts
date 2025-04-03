import { TestBed } from '@angular/core/testing';

import { CommandItemService } from './command-item.service';

describe('CommandItemService', () => {
  let service: CommandItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
