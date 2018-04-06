import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  /**
   * 控制側邊欄開合
   *
   * @memberof LayoutComponent
   */
  public isOpen = false;

  constructor(
    private authSvc: AuthService,
  ) { }

  ngOnInit() {
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
