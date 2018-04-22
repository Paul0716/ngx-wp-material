import { Injectable } from '@angular/core';

// service
import { WpapiService } from './wpapi.service';

@Injectable()
export class WptagService {

  constructor(
    private _wpapi: WpapiService
  ) { }

  /**
   * 創造新的標籤
   *
   * @memberof WptagService
   */
  createTag(postData) {
    const ep = '/wp/v2/tags';
    return this._wpapi.post(ep, postData);
  }

  /**
   * 列表目前所有標籤
   *
   * @memberof WptagService
   */
  listTags(query?: any) {
    const ep = '/wp/v2/tags';
    return query ? this._wpapi.get(ep, query) : this._wpapi.get(ep);
  }

}
