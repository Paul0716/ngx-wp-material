import { Action } from '@ngrx/store';

export enum TagsActionTypes {
  ListAction = '[Tags] List Action',
  ListSuccessAction = '[Tags] List Success Action',
  ListFailAction = '[Tags] List Failed Action',
}

export class List implements Action {
  readonly type = TagsActionTypes.ListAction;

  constructor() { }
}

export class ListSuccess implements Action {
  readonly type = TagsActionTypes.ListSuccessAction;

  constructor() { }
}

export class ListFail implements Action {
  readonly type = TagsActionTypes.ListFailAction;

  constructor() { }
}

export type TagsActions = List | ListSuccess | ListFail;
