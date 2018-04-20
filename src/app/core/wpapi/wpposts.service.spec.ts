import { TestBed, inject } from '@angular/core/testing';

import { WppostsService } from './wpposts.service';

describe('WppostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WppostsService]
    });
  });

  it('should be created', inject([WppostsService], (service: WppostsService) => {
    expect(service).toBeTruthy();
  }));
});
