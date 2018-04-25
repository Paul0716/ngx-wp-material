import { Injectable } from '@angular/core';

// 3rd party
import { Observable } from 'rxjs/Observable';

// const
import { environment } from '../../../environments/environment';

// service
import { UserService } from '../../auth/user.service';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class WpapiService {

  constructor(
    private _userSvc: UserService,
    private _authSvc: AuthService,
    private _http: HttpClient,
  ) { }

  /**
   * wp get method api abstract
   *
   * @param {string} endpoint
   * @param {*} [query]
   * @returns {Observable<any>}
   * @memberof WpapiService
   */
  get(endpoint: string, query?: any): Observable<any> {

    const ep        = `/wp-json${endpoint}`;
    const user      = this._userSvc.getUser();
    const headers   = this._authSvc.getBasicAuthHeader(user);

    if (query) {

      const params    = new HttpParams({
        fromObject: query,
      });

      return this._http.get(ep, {
        headers: headers,
        params,
        observe: 'response',
      });

    } else {

      return this._http.get(ep, {
        headers: headers,
        observe: 'response',
      });

    }
  }

  /**
   * wp post method api abstract
   *
   * @param {string} endpoint
   * @param {*} postData
   * @param {*} [query]
   * @returns {Observable<any>}
   * @memberof WpapiService
   */
  post(endpoint: string, postData: any, query?: any): Observable<any> {

    const ep = `/wp-json${endpoint}`;

    const user = this._userSvc.getUser();
    const headers = this._authSvc.getBasicAuthHeader(user);

    if (query) {

      const params = new HttpParams();
      for (const key of Object.keys(query)) {
        params.append(key, params[key]);
      }

      return this._http.post(ep, postData, {
        headers: headers,
        params: params,
      });

    } else {

      return this._http.post(ep, postData, {
        headers: headers,
      });

    }
  }

}
