import { Injectable } from '@angular/core';

// ngrx/effect
import { ofType, Actions, Effect } from '@ngrx/effects';
import { PostsActionTypes } from '../../actions/posts.actions';

// interface
import { WPpost } from '../../../../../interfaces/wp/post.interface';

// rxjs
import { Observable } from 'rxjs/Observable';
import {
  mergeMap,
  map,
  catchError,
  concat,
  concatMapTo,
  concatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// Service
import { PostsService } from '../../../posts/posts.service';
import { WpuserService } from '../../../../../core/wpapi/wpuser.service';
import { WpcategoriesService } from '../../../../../core/wpapi/wpcategories.service';
import { WppostsService } from '../../../../../core/wpapi/wpposts.service';

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private _postSvc: PostsService,
    private _wpuser: WpuserService,
    private _wpcate: WpcategoriesService,
    private _wpposts: WppostsService,
  ) {}


  @Effect()
  list$: Observable<any> = this.actions$.pipe(
    // 判斷為何種動作
    ofType(PostsActionTypes.ListAction),

    // 實作文章列表取得資料的動作
    mergeMap( action => {

      return this._postSvc.list().pipe(

        // author id 替換成 Wpuser
        concatMap(this.postsReplaceUser.bind(this)),

        // categories id 踢換成 wpcategories
        concatMap(this.postReplaceCategories.bind(this)),

        // author 和 categories 換成字串
        map( (posts: any[]) => {
          return posts.map(post => {
            const transPost = <any>post;

            transPost.categories = post.categories.map(o => o.name).join(',');
            transPost.author = post.author.name;

            return post;
          });
        }),

        //
        map(posts => ({ type: PostsActionTypes.ListSuccessAction, list: posts })),

        // http resposne 錯誤處理
        catchError( () => of({ type: PostsActionTypes.ListFailedAction }) )
      );

    }),
  );

  @Effect()
  create$: Observable<any> = this.actions$.pipe(
    // 判斷為何種動作類型
    ofType(PostsActionTypes.CreatePostAction),


    // 主要動作
    mergeMap( (action: any) => {


      return this._wpposts.editPost(action.payload)
        .pipe(
          // 新增文章成功處理
          map( post => ({ type: PostsActionTypes.CreatePostSuccessAction, post: post }) ),

          // http response error handler
          catchError( () => of({ type: PostsActionTypes.CreatePostFailedAction }) ),
        );
    }),
    //
  );

/**
 *
 *
 * @param {WPpost[]} posts
 * @returns {Observable<any>}
 * @memberof PostsEffects
 */
postReplaceCategories(posts: WPpost[] ): Observable<any> {

    const categories = Array.from(
      new Set([
        ...posts.map(o => o.categories)
      ])
    );

    return this._wpcate
      .getCategoryList({
        include: categories
      }).pipe(
        map((cates: any[]) => {


          posts = posts.map(post => {
            post.categories = post.categories.map(cate => {
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
      map((users: any[]) => {
        posts = posts.map(post => {
          const postUser = users.filter(user => user.id === post.author)[0];
          post.author = postUser;
          return post;
        });

        return posts;
      })
    );

  }
}
