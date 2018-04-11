import { Action } from '@ngrx/store';

export enum PostsActionTypes {
  ListAction        = '[Posts] List Action',
  ListSuccessAction = '[Posts] List Success Action',
  ListFailedAction  = '[Posts] List Failed Action',
}

export class List implements Action {
  readonly type = PostsActionTypes.ListAction;
}

export class ListFailed implements Action {
  readonly type = PostsActionTypes.ListFailedAction;
}

export class ListSuccess implements Action {
  readonly type = PostsActionTypes.ListSuccessAction;
}

export type PostsActions =
List |
ListFailed |
ListSuccess;
