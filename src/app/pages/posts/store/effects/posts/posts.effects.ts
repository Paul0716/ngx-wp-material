import { Injectable } from '@angular/core';

// ngrx/effect
import { ofType, Actions, Effect } from '@ngrx/effects';
import { PostsActionTypes } from '../../actions/posts.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import { mergeMap, map, catchError, concat, concatMapTo, concatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// Service
import { PostsService } from '../../../posts/posts.service';
import { WpuserService } from '../../../../../core/wpapi/wpuser.service';
import { WpcategoriesService } from '../../../../../core/wpapi/wpcategories.service';

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private _postSvc: PostsService,
    private _wpuser: WpuserService,
    private _wpcate: WpcategoriesService,
  ) {}


  @Effect()
  list$: Observable<any> = this.actions$.pipe(
    // 判斷為何種動作
    ofType(PostsActionTypes.ListAction),

    // 實作文章列表取得資料的動作
    mergeMap( action => {

      return this._postSvc.list().pipe(

        // author id 替換成名字
        concatMap(this.postsReplaceUser.bind(this)),

        // categories id 踢換成名字
        concatMap(this.postReplaceCategories.bind(this)),

        map(posts => ({ type: PostsActionTypes.ListSuccessAction, list: posts })),
        // http resposne 錯誤處理
        catchError( () => of({ type: PostsActionTypes.ListFailedAction }) )
      );

    }),
  );

  /**
   *
   *
   * @param {any} posts
   * @returns {Observable<any>}
   * @memberof PostsEffects
   */
  postReplaceCategories(posts): Observable<any> {

    const categories = Array.from(
      new Set([
        ...posts.map(o => o.categories)
      ])
    );

    return this._wpcate
      .getCategoryList({
        include: categories
      }).pipe(
        map( (cates: any[]) => {

          posts = posts.map( post => {
            post.categories = post.categories.map( cate => {
              return cates.filter(o => o.id === cate)[0];
            });
            return post;
          });

          return posts;
        }),
      );
  }

  /**
   *
   *
   * @param {any} posts
   * @returns {Observable<any>}
   * @memberof PostsEffects
   */
  postsReplaceUser(posts): Observable<any> {

    const authors = Array.from(
      new Set([
        ...posts.map(o => o.author)
      ])
    ).join(',');


    return this._wpuser
      .getUserList({
        include: authors
      }).pipe(
        map( ( users: any[] ) => {

          posts = posts.map( post => {
            const postUser = users.filter( user => user.id === post.author )[0];
            post.author = postUser;
            return post;
          });

          return  posts;
        })
      );
  }

}
