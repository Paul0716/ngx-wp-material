import { Component, OnInit } from '@angular/core';

// service
import { UserService } from '../../auth/user.service';
import { AuthService } from '../../auth/auth.service';

// const
import { layoutRoutePaths } from './layout-routing-path.const';
import { appRoutePaths } from '../../app-routing-path.const';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  /**
   * 控制側邊欄開合
   *
   * @memberof LayoutComponent
   */
  public isOpen = false;

  /**
   * layout router
   *
   * @memberof LayoutComponent
   */
  private layoutRoutePath = layoutRoutePaths.dashbroad;

  constructor(
    private authSvc: AuthService,
  ) { }

  ngOnInit() {
  }

  /**
   *
   *
   * @param {String} path
   * @memberof LayoutComponent
   */
  getRouterLink(path: String) {
    return [ appRoutePaths.layout, path];
  }


  /**
   * 登出功能
   *
   * @memberof LayoutComponent
   */
  logout() {
    this.authSvc.logout();
  }

}
