import { TestBed, inject } from '@angular/core/testing';

import { ShowMessagesService } from './show-messages.service';

describe('ShowMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowMessagesService]
    });
  });

  it('should be created', inject([ShowMessagesService], (service: ShowMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
