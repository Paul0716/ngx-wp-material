import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


// ngrx
import { Store } from '@ngrx/store';
import { State as AuthState } from '../reducers/auth/auth.reducer';
import * as AuthAction from '../actions/auth.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// service
import { UserService } from './user.service';
import { StorageService, StorageType } from '../core/storage/storage.service';

// interfaces
import { User } from '../interfaces/user.interface';

// const
import { storageKeys } from '../const/storage-keys';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  /**
   * 用戶是否登入驗證過
   *
   * @type {Boolean}
   * @private
   * @memberof AuthService
   */
  private authenicated = false;

  constructor(
    private store: Store<AuthState>,
    private http: HttpClient,
    private userSvc: UserService,
    private storageSvc: StorageService,
  ) {
    if ( this.userSvc.getUser() ) {
      this.authenicated = true;
    }
  }

  /**
   * 判斷是否登入驗證通過
   *
   * @memberof AuthService
   */
  isAuthenticated() {
    return this.authenicated;
  }

  /**
   * 設定是否通過驗證
   *
   * @memberof AuthService
   */
  setAuthenticated(pass: boolean): void {
    this.authenicated = true;
  }

  /**
   * 取得 basic auth 基本auth 加密
   *
   * @param {User} user - 用戶登入資料
   * @memberof UserService
   */
  basicAuth(user: User): string {
    return btoa(`${user.account}:${user.password}`);
  }

  /**
   * 取得Basic Auth 的標頭
   *
   * @param {AuthState} [loginData]
   * @returns {*}
   * @memberof AuthService
   */
  getBasicAuthHeader(loginData?: AuthState): any | null {
    if (loginData) {
      const basic = this.basicAuth(loginData);

      const headers = new HttpHeaders({
        'Authorization': `Basic ${basic}`,
        'Content-Type': 'application/json',
      });
      return headers;
    }
    return null;
  }

  /**
   * 用戶登入功能
   *
   * @param {*} loginData - 用戶登錄資料
   * @memberof AuthService
   */
  login(loginData: AuthState): Observable<any> {
    const endpoint = `${environment.url}/wp/v2/users/me`;
    const headers  = this.getBasicAuthHeader(loginData);
    return this.http
      .get(endpoint, {
        headers: headers
      });
  }

}
