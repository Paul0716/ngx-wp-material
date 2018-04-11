import { Injectable } from '@angular/core';

// ngrx/effect
import { ofType, Actions, Effect } from '@ngrx/effects';
import { PostsActionTypes } from '../../actions/posts.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// Service
import { PostsService } from '../../../posts/posts.service';

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private _postSvc: PostsService,
  ) {}



  @Effect()
  list$: Observable<any> = this.actions$.pipe(
    // 判斷為何種動作
    ofType(PostsActionTypes.ListAction),

    // 實作文章列表取得資料的動作
    mergeMap( action => {

      return this._postSvc.list().pipe(
        map( res => {
          console.log('post list effect.', res);
          return { type: PostsActionTypes.ListSuccessAction, list: res };
        }),

        // http resposne 錯誤處理
        catchError( () => of({ type: PostsActionTypes.ListFailedAction }) )
      );

    }),

  );
}
