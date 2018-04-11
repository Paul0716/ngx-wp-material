import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

// reducers
import * as authReducer from './auth/auth.reducer';


export interface State {
  auth: any;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer.reducer,
};


export const metaReducers: MetaReducer<State>[] = [];
