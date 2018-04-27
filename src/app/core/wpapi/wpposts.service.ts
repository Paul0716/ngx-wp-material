import { Injectable } from '@angular/core';

// service
import { WpapiService } from './wpapi.service';

// rxjs
import { Observable } from 'rxjs/Observable';

// interface
import { WPpost } from '../../interfaces/wp/post.interface';

@Injectable()
export class WppostsService {

  constructor(
    private _wpapi: WpapiService,
  ) {}

  /**
   *
   *
   * @param {*} postData - post data
   * @param {*} [postId] - 文章ID, 新增文章時不需要此參數
   * @returns {Observable<any>}
   * @memberof WppostsService
   */
  editPost(postData: WPpost, postId?): Observable<any> {
    const endpoint = postId ? `/wp/v2/posts/${postId}` : '/wp/v2/posts';
    return this._wpapi.post(endpoint, postData);
  }

  /**
   * 文章列表相關功能
   *
   * @param {*}
   * @returns {Observable<any>}
   * @memberof PostsService
   */
  list(query?: any): Observable<any> {
    const ep = '/wp/v2/posts';
    return query ? this._wpapi.get(ep, query) : this._wpapi.get(ep);
  }

  /**
   * 取得單一文章的資料
   *
   * @param {any} postId
   * @returns {Observable<any>}
   * @memberof WppostsService
   */
  retrievePost(postId): Observable<any> {
    if (postId) {
      const ep = `/wp/v2/posts/${postId}`;
      return this._wpapi.get(ep);
    } else {
      throw new Error('Retrieve a post require post id.');
    }
  }

  /**
   * 刪除 wp post api 功能
   *
   * @param {any} postId
   * @returns {Observable<any>}
   * @memberof WppostsService
   */
  deletePost(postId): Observable<any> {
    if (postId) {
      const ep = `/wp/v2/posts/${postId}`;
      return this._wpapi.delete(ep);
    } else {
      throw new Error('Delete a post require post id.');
    }
  }



}
