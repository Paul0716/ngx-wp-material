import { Injectable } from '@angular/core';
import { WpapiService } from './wpapi.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WpuserService {

  constructor(
    private _wpapi: WpapiService
  ) { }

  /**
   * 取得wp user 資料
   *
   * @memberof WpuserService
   */
  getUserList(query?: any): Observable<any> {
    const ep = '/wp/v2/users';
    return query ? this._wpapi.get(ep, query) : this._wpapi.get(ep);
  }

}
