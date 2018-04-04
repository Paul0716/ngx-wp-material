import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// service
import { AuthService } from './auth.service';
import { appRoutePaths } from '../app-routing-path.const';


@Injectable()
export class AuthGuardService implements CanActivate  {

  constructor(
    private authSvc: AuthService,
    private router: Router,
  ) {  }

  /**
   * 判段是否可以進入該路由
   *
   * @returns {boolean}
   * @memberof AuthGuardService
   */
  canActivate(): boolean {
    if (!this.authSvc.isAuthenticated()) {

      this.router.navigate(
        [
          appRoutePaths.login
        ]
      );
      return false;
    }
    return true;
  }

}
