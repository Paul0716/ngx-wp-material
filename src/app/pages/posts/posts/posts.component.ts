import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CofirmComponent } from '../../../core/dialogs/cofirm/cofirm.component';

// ngrx
import { Store, select } from '@ngrx/store';
import { State as PostState, PostsAction } from '../store/reducers/posts/posts.reducer';
import * as PostsActions from '../store/actions/posts.actions';

// ngx-material
import { MatTableDataSource, PageEvent, MatDialog } from '@angular/material';

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
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * 顯示讀取畫面
   *
   * @memberof PostsComponent
   */
  public loading = true;

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

  /**
   * store posts list
   *
   * @private
   * @type {Observable<any>}
   * @memberof PostsComponent
   */
  private _posts$: Subscription;


  constructor(
    private _store: Store<PostState>,
    private _router: Router,
    private _route: ActivatedRoute,
    private _wpuser: WpuserService,
    private _wpcate: WpcategoriesService,
    private _postsSvc: PostsService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {

    this._posts$ = this._store
      .pipe(
        select('posts'),
      )
      .subscribe( (res: any) => {
        // 如果有回傳文章的話
        if (res && res.posts) {

          this.postList = new MatTableDataSource<Post>(res.posts);
          if (res.pagination) {
            this.postsInfo.total = res.pagination.total;
            this.postsInfo.totalpages = res.pagination.totalpages;
            this.loading = false;
          }

        }

        // 如果是刪除成功回傳 post
        if (res && res.status === 'trash') {
          this.loading = true;
          this._store.dispatch(new PostsActions.List());
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

  /**
   *
   *
   * @memberof PostsComponent
   */
  editor(id: number) {
    this._router.navigate(['../edit', id], { relativeTo: this._route });
  }

  /**
   *
   * @param {MouseEvent} ev
   * @param {*} post
   * @memberof PostsComponent
   */
  deleteConfirm(ev: MouseEvent, post: any) {
    const dialogRef = this._dialog.open(CofirmComponent, {
      width: '480px',
      data: {
        title: 'Confirm',
        content: `About to delete post <b>${post.title.rendered}</b>`,
        id: post.id,
      }
    });

    const dialog$ = dialogRef.afterClosed().subscribe( result => {
      this._store.dispatch( new PostsActions.Delete(result.id) );
      dialog$.unsubscribe();
    });
  }

  /**
   * On Destroy
   *
   * @memberof PostsComponent
   */
  ngOnDestroy() {
    if (this._pagiSub$) {
      this._posts$.unsubscribe();
    }
  }


  ngAfterViewInit() {

    this._store.dispatch(new PostsActions.List());
  }

}
