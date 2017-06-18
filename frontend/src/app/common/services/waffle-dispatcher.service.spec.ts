import { TestBed, inject } from '@angular/core/testing';

import { WaffleDispatcherService } from './waffle-dispatcher.service';

describe('WaffleDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaffleDispatcherService]
    });
  });

  it('should ...', inject([WaffleDispatcherService], (service: WaffleDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
