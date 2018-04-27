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
    private _postsSvc: PostsService,
    private _wpuser: WpuserService,
    private _wpcate: WpcategoriesService,
    private _wpposts: WppostsService,
  ) {}


  @Effect()
  list$: Observable<any> = this.actions$.pipe(
    // 判斷為何種動作
    ofType(PostsActionTypes.ListAction),

    // 實作文章列表取得資料的動作
    mergeMap( (action: any) => {
      return this._wpposts.list({
        status: ['publish', 'private', 'draft'].join(','),
        page: action._pageEv ? action._pageEv.pageIndex + 1 : 1,
      }).pipe(

        concatMap( (res:  Response) => {

          const total = Number(res.headers.get('x-wp-total')) || 0;
          const totalpages = Number(res.headers.get('x-wp-totalpages')) || 0;
          const pagination = {
            total: total,
            totalpages: totalpages
          };
          return of({ posts: res.body, pagination: pagination });
        }),

        // author id 替換成 Wpuser
        concatMap(this.postsReplaceUser.bind(this)),

        // categories id 踢換成 wpcategories
        concatMap(this.postReplaceCategories.bind(this)),

        // author 和 categories 換成字串
        map( (payload: any) => {

          payload.posts.map(post => {
            const transPost = <any>post;
            transPost.categories  = post.categories.map(o => o.name).join(',');
            transPost.author      = post.author.name;

            return post;
          });

          return ({ type: PostsActionTypes.ListSuccessAction, payload: payload });
        }),

        // http resposne 錯誤處理
        catchError( (err) => {
          return of({ type: PostsActionTypes.ListFailedAction });
        })
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

          map((resp: Response) => resp.body),

          // 新增文章成功處理
          map( post => ({ type: PostsActionTypes.CreatePostSuccessAction, post: post }) ),

          // http response error handler
          catchError( () => of({ type: PostsActionTypes.CreatePostFailedAction }) ),
        );
    }),
  );

  @Effect()
  retrieve$: Observable<any> = this.actions$.pipe(
    // 判斷為何種動作類型
    ofType(PostsActionTypes.RetrievePostAction),

    // 主要動作
    mergeMap( (action: any) => {
      return this._wpposts.retrievePost(action.payload.id)
      .pipe(

        map( (resp: Response) => resp.body ),

        map( post => ({ type: PostsActionTypes.RetrievePostSuccessAction, payload: post })),

        // error handler
        catchError( () => of({ type: PostsActionTypes.RetrievePostFailedAction })),
      );
    }),
  );

  @Effect()
  delete$: Observable<any> = this.actions$.pipe(
    // 判斷是哪種動作類型
    ofType(PostsActionTypes.DeletePostAction),

    // 主要動作
    mergeMap( (action: any) => {
      return this._wpposts.deletePost(action.payload)
      .pipe(

        map( (resp: Response) => resp.body ),

        map( post => {

          console.log(post);

          return ({ type: PostsActionTypes.DeletePostSuccessAction, payload: post })
        }),

        // error handler
        catchError( () => of({ type: PostsActionTypes.DeletePostFailedAction }) )
      );
    }),

  );

  /**
   *
   *
   * @param {*} payload
   * @returns {Observable<any>}
   * @memberof PostsEffects
   */
  postReplaceCategories(payload: any): Observable<any> {

      const posts = payload.posts;
      const arr = [];
      posts.forEach( o => {
        o.categories.forEach( cates => {
          arr.push(cates);
        });
      });
      const categories = Array.from(
        new Set(arr)
      ).join(',');

      return this._wpcate
        .getCategoryList({
          include: categories
        }).pipe(

          map((resp: any) => resp.body),

          map((cates: any[]) => {


            payload.posts = posts.map(post => {
              post.categories = post.categories.map(cate => {
                return cates.filter(o => o.id === cate)[0];
              });
              return post;
            });
            return payload;
          }),
      );


    }

  /**
   *
   *
   * @param {*} payload
   * @returns {Observable<any>}
   * @memberof PostsEffects
   */
  postsReplaceUser(payload: any): Observable<any> {
    const posts = payload.posts;
    const authors = Array.from(
      new Set([
        ...posts.map(o => o.author)
      ])
    ).join(',');

    return this._wpuser
      .getUserList({
        include: authors
      }).pipe(

        map((resp: any) => resp.body),

        map((users: any[]) => {
          payload.posts = posts.map(post => {
            const postUser = users.filter(user => user.id === post.author)[0];
            post.author = postUser;
            return post;
          });
          return payload;
        })
      );

  }
}
