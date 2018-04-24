import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// service
import { WpapiService } from './wpapi.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WpcategoriesService {

  constructor(
    private _wpapi: WpapiService
  ) {}

  /**
   * 取得
   *
   * @param {*} [query]
   * @returns
   * @memberof WpcategoriesService
   */
  getCategoryList(query?: any): Observable<any> {
    const ep = '/wp/v2/categories';

    return query ? this._wpapi.get(ep, query) : this._wpapi.get(ep);
  }

}
