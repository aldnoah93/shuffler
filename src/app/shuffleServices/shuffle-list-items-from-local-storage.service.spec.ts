import { TestBed } from '@angular/core/testing';

import { ShuffleListItemsFromLocalStorageService } from './shuffle-list-items-from-local-storage.service';

describe('ShuffleListItemsFromLocalStorageService', () => {
  let service: ShuffleListItemsFromLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShuffleListItemsFromLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
