import { TestBed, inject } from '@angular/core/testing';

import { WptagService } from './wptag.service';

describe('WptagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WptagService]
    });
  });

  it('should be created', inject([WptagService], (service: WptagService) => {
    expect(service).toBeTruthy();
  }));
});
