import { Injectable } from '@angular/core';

// 3rd party
import { Observable } from 'rxjs/Observable';

// const
import { environment } from '../../../environments/environment';

// service
import { UserService } from '../../auth/user.service';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WpapiService {

  constructor(
    private _userSvc: UserService,
    private _authSvc: AuthService,
    private _http: HttpClient,
  ) { }

  /**
   *
   *
   * @param {string} endpoint
   * @memberof WpapiService
   */
  get(endpoint: string): Observable<any> {

    const ep = `${environment.url}${endpoint}`;
    const user = this._userSvc.getUser();
    const headers  = this._authSvc.getBasicAuthHeader(user);

    return this._http.get(ep, {
      headers: headers
    });
  }

}
