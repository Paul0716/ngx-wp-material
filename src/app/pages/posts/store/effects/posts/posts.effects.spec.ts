import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { PostsEffects } from './posts.effects';

describe('PostsService', () => {
  let actions$: Observable<any>;
  let effects: PostsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PostsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
