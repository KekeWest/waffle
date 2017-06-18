import { TestBed, inject } from '@angular/core/testing';

import { UserStoreService } from './user-store.service';

describe('UserStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStoreService]
    });
  });

  it('should ...', inject([UserStoreService], (service: UserStoreService) => {
    expect(service).toBeTruthy();
  }));
});
