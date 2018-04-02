import { Action } from '@ngrx/store';
import { AuthActionTypes } from './auth.actions';

// interface
import { User } from '../../interfaces/user.interface';

export interface State {
  account: string;
  password: string;
  authenicated?: boolean;

}

export const initialState: State = {
  account: '',
  password: '',
};

export interface AuthAction extends Action {
  state: User;
}

export function reducer(state = initialState, action: AuthAction): State {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return action.state;
    default:
      return state;
  }
}
