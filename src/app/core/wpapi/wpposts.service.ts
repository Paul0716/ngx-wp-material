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
   * @param {any} postData - post data
   * @param {any} [postId] - 文章ID, 新增文章時不需要此參數
   * @returns {Observable<any>}
   * @memberof WppostsService
   */
  editPost(postData: WPpost, postId?): Observable<any> {
    const endpoint = postId ? `/wp/v2/posts/${postId}` : '/wp/v2/posts';
    return this._wpapi.post(endpoint, postData);
  }

}
