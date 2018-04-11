import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AuthService } from '../../auth/auth.service';

// ngrx/effects
import { ofType, Actions,  Effect} from '@ngrx/effects';

// rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap, map, catchError } from 'rxjs/operators';

// ngrx
import { AuthAction } from '../../reducers/auth/auth.reducer';
import { AuthActionTypes } from '../../actions/auth.actions';
import { UserService } from '../../auth/user.service';
import { StorageService, StorageType } from '../../core/storage/storage.service';

// const
import { storageKeys } from '../../const/storage-keys';
import { appRoutePaths } from '../../app-routing-path.const';
import { layoutRoutePaths } from '../../core/layout/layout-routing-path.const';

@Injectable()
export class AuthEffects {

  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private router: Router,
    private storageSvc: StorageService,
    private actions$: Actions
  ) {}


  /**
   * 登入
   *
   * @type {Observable<any>}
   * @memberof AuthEffects
   */
  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    // 判斷為哪種動作
    ofType(AuthActionTypes.LoginAction),

    // 實作登入邏輯
    mergeMap( action =>

      this.authSvc
        .login((<AuthAction>action).state)
        .pipe(
           // If successful, dispatch success action with result
          map( res => {
            const state = (<AuthAction>action).state;
            this.userSvc.setUser(state);
            this.authSvc.setAuthenticated(true);
            this.storageSvc.store(storageKeys.user, state, StorageType.Session);
            this.router.navigate([layoutRoutePaths.dashbroad]);
            return { type: AuthActionTypes.LoginSuccessAction, state: (<AuthAction>action).state };
          }),
          // If request fails, dispatch failed action
          catchError(() => of({ type: AuthActionTypes.LoginFailedAction }))
        )

    )
  );





}
