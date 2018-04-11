import { Action } from '@ngrx/store';

// interface
import { State } from '../reducers/auth/auth.reducer';

export enum AuthActionTypes {
  // AuthAction = '[Auth] Action'
  LoginAction = '[Login] Action',
  LoginSuccessAction = '[LoginSuccess] Action',
  LoginFailedAction = '[LoginFailed] Action',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
  readonly state: State;

  constructor(payload: State) {
    this.state = payload;
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccessAction;
  readonly state: State;

  constructor(payload: State) {
    this.state = payload;
  }
}

export class LoginFailed implements Action {
  readonly type = AuthActionTypes.LoginFailedAction;
  readonly state: State;

  constructor(payload: State) {
    this.state = payload;
  }
}

export type AuthActions =
  Login |
  LoginSuccess |
  LoginFailed
;
