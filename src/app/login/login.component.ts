import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// third party
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

//  angular material
import { MAT_LABEL_GLOBAL_OPTIONS, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

// interface
import { State } from '../store/reducers/auth/auth.reducer';
import * as AuthAction from '../store/actions/auth.actions';

// service
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/user.interface';
import { appRoutePaths } from '../app-routing-path.const';
import { Subscription } from 'rxjs/Subscription';

/**
 * @todo 設定正確的 proxy
 * @todo 整理redux
 * @todo 儲存用戶資料到 webstorage
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * 登入表單
   *
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  form: FormGroup;

  /**
   * 是否 authenticated 的 observable
   *
   * @type {Subscription}
   * @memberof LoginComponent
   */
  auth$: Subscription;


  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private store: Store<State>,
    private router: Router,
  ) {}

  /**
   * 頁面初始功能
   *
   * @memberof LoginComponent
   */
  ngOnInit() {
    // 表單初始化
    this.initForm();

    this.auth$ = this.store
      .pipe(
        select('auth')
      )
      .subscribe(this.authChange.bind(this));
  }

  /**
   * 頁面摧毀功能
   *
   * @memberof LoginComponent
   */
  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

  /**
   * 如果登入認證狀態改變
   *
   * @memberof LoginComponent
   */
  authChange(user: State) {
    console.log('authChange: ', user);
  }


  /**
   * 表單初始化
   *
   * @memberof LoginComponent
   */
  initForm() {
    this.form = this.fb.group({
      ['account']: ['paultaku', [Validators.required]],
      ['password']: ['justlove0738', [Validators.required]],
    });

  }

  /**
   * 登入按鈕
   *
   * @memberof LoginComponent
   */
  login() {
    const loginData = this.form.getRawValue();
    // this.authSvc.login(loginData);
    this.store.dispatch(new AuthAction.Login(loginData));
  }

}
