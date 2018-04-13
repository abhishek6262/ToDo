import { TestBed, inject } from '@angular/core/testing';

import { ListItemService } from './list-item.service';

describe('ListItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListItemService]
    });
  });

  it('should be created', inject([ListItemService], (service: ListItemService) => {
    expect(service).toBeTruthy();
  }));
});
