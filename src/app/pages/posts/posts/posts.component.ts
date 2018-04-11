import { Component, OnInit, AfterViewInit } from '@angular/core';

// ngrx
import { Store, select } from '@ngrx/store';
import { State as PostState, PostsAction } from '../../../store/reducers/posts/posts.reducer';
import * as PostsActions from '../../../store/actions/posts.actions';

// ngx-material
import { MatTableDataSource } from '@angular/material';

// interface
import { Post } from '../../../interfaces/post.interface';

// service
import { PostsService } from './posts.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit {

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
    'author'
  ];


  constructor(
    private _store: Store<PostState>,
    private _postsSvc: PostsService,
  ) { }

  ngOnInit() {
    this._store.pipe(
      select('posts')
    ).subscribe( (res: PostsAction) => {

      // 如果有回傳文章的話
      if (res && res.list) {
        console.log(res.list);
        this.postList = new MatTableDataSource<Post>(res.list);
      }

    });

  }

  ngAfterViewInit() {

    this._store.dispatch(new PostsActions.List());
  }

}
