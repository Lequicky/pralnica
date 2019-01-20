import { TestBed, inject } from '@angular/core/testing';

import { TajnistvoService } from './tajnistvo.service';

describe('TajnistvoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TajnistvoService]
    });
  });

  it('should be created', inject([TajnistvoService], (service: TajnistvoService) => {
    expect(service).toBeTruthy();
  }));
});
