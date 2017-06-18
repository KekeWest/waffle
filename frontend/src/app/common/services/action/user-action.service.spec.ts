import { TestBed, inject } from '@angular/core/testing';

import { UserActionService } from './user-action.service';

describe('UserActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserActionService]
    });
  });

  it('should ...', inject([UserActionService], (service: UserActionService) => {
    expect(service).toBeTruthy();
  }));
});
