import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { TagsEffects } from './tags.effects';

describe('TagsService', () => {
  let actions$: Observable<any>;
  let effects: TagsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TagsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});