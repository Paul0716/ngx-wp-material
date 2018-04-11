import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// reducers
import * as authReducer from './auth/auth.reducer';
import * as postReducer from './posts/posts.reducer';


export interface State {
  auth: any;
  posts: any;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer.reducer,
  posts: postReducer.reducer,
};


export const metaReducers: MetaReducer<State>[] = [];
