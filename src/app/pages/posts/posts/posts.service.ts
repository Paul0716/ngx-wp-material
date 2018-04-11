import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WpapiService } from '../../../core/wpapi/wpapi.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostsService {

  constructor(
    private _wpapiSvc: WpapiService,
  ) { }

  /**
   * 文章列表相關功能
   *
   * @returns {Observable<any>}
   * @memberof PostsService
   */
  list(): Observable<any> {
    const ep = '/wp/v2/posts';
    return this._wpapiSvc.get(ep);
  }

}
