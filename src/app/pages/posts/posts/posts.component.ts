import { Component, OnInit, AfterViewInit } from '@angular/core';

// ngrx
import { Store, select } from '@ngrx/store';
import { State as PostState, PostsAction } from '../store/reducers/posts/posts.reducer';
import * as PostsActions from '../store/actions/posts.actions';

// ngx-material
import { MatTableDataSource } from '@angular/material';

// interface
import { Post } from '../../../interfaces/post.interface';

// service
import { PostsService } from './posts.service';
import { WpuserService } from '../../../core/wpapi/wpuser.service';
import { WpcategoriesService } from '../../../core/wpapi/wpcategories.service';

// Observable
import { Observable } from 'rxjs/Observable';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit {

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
   * list on material table
   *
   * @memberof PostsComponent
   */
  postList: MatTableDataSource<Post>;

  /**
   * 表格要顯示的欄位
   *
   * @type {String[]}
   * @memberof PostsComponent
   */
  displayedColumns = [
    'id',
    'status',
    'title',
    'categories',
    'author'
  ];


  constructor(
    private _store: Store<PostState>,
    private _wpuser: WpuserService,
    private _wpcate: WpcategoriesService,
    private _postsSvc: PostsService,
  ) { }

  ngOnInit() {
    this._store.pipe(

      select('posts'),

      // map( (res: any) => res.list ),

    ).subscribe( (res: PostsAction) => {

      // 如果有回傳文章的話
      if (res && res.list) {

        this.postList = new MatTableDataSource<Post>(res.list);
      }

    });

  }

  ngAfterViewInit() {

    this._store.dispatch(new PostsActions.List());
  }

}
