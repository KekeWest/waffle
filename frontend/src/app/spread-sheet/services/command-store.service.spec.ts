import { TestBed, inject } from '@angular/core/testing';

import { CommandStoreService } from './command-store.service';

describe('CommandStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandStoreService]
    });
  });

  it('should ...', inject([CommandStoreService], (service: CommandStoreService) => {
    expect(service).toBeTruthy();
  }));
});
