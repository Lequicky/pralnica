import { TestBed, inject } from '@angular/core/testing';

import { StudentViewService } from './student-view.service';

describe('StudentViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentViewService]
    });
  });

  it('should be created', inject([StudentViewService], (service: StudentViewService) => {
    expect(service).toBeTruthy();
  }));
});
