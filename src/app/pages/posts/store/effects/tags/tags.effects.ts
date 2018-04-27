import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// ngrx
import { TagsActionTypes } from '../../actions/tags.actions';
import { ofType, Actions, Effect } from '@ngrx/effects';

// rxjs
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// services
import { WptagService } from '../../../../../core/wpapi/wptag.service';


@Injectable()
export class TagsEffects {

  constructor(
    private actions$: Actions,
    private _wptag: WptagService,
  ) {}

  @Effect()
  list$: Observable<any> = this.actions$.pipe(
      ofType(TagsActionTypes.ListAction),

      // main transformer
      mergeMap( actions => {
        return this._wptag.listTags().pipe(


          // 如果成功回傳 ListSuccessAction
          map( res => res.body),
          map( res => {
            return ({ type: TagsActionTypes.ListSuccessAction , payload: res });
          }),

          // 錯誤處理
          catchError(() => of({ type: TagsActionTypes.ListSuccessAction }) ),
        );
      }),

  );
}
