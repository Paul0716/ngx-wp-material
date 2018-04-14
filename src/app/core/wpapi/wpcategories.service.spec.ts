import { TestBed, inject } from '@angular/core/testing';

import { WpcategoriesService } from './wpcategories.service';

describe('WpcategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpcategoriesService]
    });
  });

  it('should be created', inject([WpcategoriesService], (service: WpcategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
