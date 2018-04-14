import { TestBed, inject } from '@angular/core/testing';

import { WpuserService } from './wpuser.service';

describe('WpuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpuserService]
    });
  });

  it('should be created', inject([WpuserService], (service: WpuserService) => {
    expect(service).toBeTruthy();
  }));
});
