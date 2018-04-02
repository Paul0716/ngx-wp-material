import { Action } from '@ngrx/store';

// interface
import { State } from './auth.reducer';

export enum AuthActionTypes {
  // AuthAction = '[Auth] Action'
  LoginAction = '[Login] Action'

}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
  readonly state: State;

  constructor(payload: State) {
    this.state = payload;
  }
}

export type AuthActions = Login;
