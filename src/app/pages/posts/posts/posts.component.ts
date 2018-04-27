

import { Component, OnInit, AfterViewInit } from '@angular/core';

// ngrx
import { Store, select } from '@ngrx/store';
import { State as PostState, PostsAction } from '../store/reducers/posts/posts.reducer';
import * as PostsActions from '../store/actions/posts.actions';

// ngx-material
import { MatTableDataSource, PageEvent } from '@angular/material';

// interface
import { Post } from '../../../interfaces/post.interface';
import { WPpagination } from '../../../interfaces/wp/pagination.interface';

// service
import { PostsService } from './posts.service';
import { WpuserService } from '../../../core/wpapi/wpuser.service';
import { WpcategoriesService } from '../../../core/wpapi/wpcategories.service';

// Observable
import { Observable } from 'rxjs/Observable';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit {

  /**
   * 顯示讀取畫面
   *
   * @memberof PostsComponent
   */
  public loading = true;

  /**
   * store posts list
   *
   * @private
   * @type {Observable<any>}
   * @memberof PostsComponent
   */
  private _posts$: Observable<any>;

  /**
   * 分頁資訊物件
   *
   * @memberof PostsComponent
   */
  public postsInfo: WPpagination = {
    total: null,
    totalpages: null,
    currentPage: 0,
  };


  /**
   * list on material table
   *
   * @memberof PostsComponent
   */
  public postList: MatTableDataSource<Post>;

  /**
   * 表格要顯示的欄位
   *
   * @type {String[]}
   * @memberof PostsComponent
   */
  public displayedColumns = [
    'id',
    'status',
    'title',
    'categories',
    'author'
  ];

  /**
   * 分頁元件訂閱動作
   *
   * @private
   * @type {Subscription}
   * @memberof PostsComponent
   */
  private _pagiSub$: Subscription;


  constructor(
    private _store: Store<PostState>,
    private _wpuser: WpuserService,
    private _wpcate: WpcategoriesService,
    private _postsSvc: PostsService,
  ) { }

  ngOnInit() {

    this._store
      .pipe(
        select('posts'),
      )
      .subscribe( (res: any) => {
        console.log(res);

        // 如果有回傳文章的話
        if (res && res.posts) {

          this.postList = new MatTableDataSource<Post>(res.posts);

          if (res.pagination) {
            this.postsInfo.total = res.pagination.total;
            this.postsInfo.totalpages = res.pagination.totalpages;
            this.loading = false;
          }

        }

      });

  }

  /**
   *
   *
   * @param {*} ev
   * @memberof PostsComponent
   */
  pageChangEvent(ev: PageEvent) {
    this.loading = true;
    this._store.dispatch(new PostsActions.List(ev));
  }


  ngAfterViewInit() {

    this._store.dispatch(new PostsActions.List());
  }

}
