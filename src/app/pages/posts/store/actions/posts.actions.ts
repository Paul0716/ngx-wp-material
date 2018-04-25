import { Action } from '@ngrx/store';
import { PageEvent } from '@angular/material';

export enum PostsActionTypes {
  ListAction        = '[Posts] List Action',
  ListSuccessAction = '[Posts] List Success Action',
  ListFailedAction  = '[Posts] List Failed Action',

  CreatePostAction  = '[Posts] Create Post Action',
  CreatePostFailedAction = '[Posts] Create Post Failed Action',
  CreatePostSuccessAction = '[Posts] Create Post Success Action',


  EditPostAction    = '[Posts] Edit Post Action',
}

export class List implements Action {
  readonly type = PostsActionTypes.ListAction;

  private _pageEv: PageEvent;

  constructor(ev?: PageEvent) {
    this._pageEv = ev;
  }
}

export class ListFailed implements Action {
  readonly type = PostsActionTypes.ListFailedAction;
}

export class ListSuccess implements Action {
  readonly type = PostsActionTypes.ListSuccessAction;
}


export class Create implements Action {
  readonly type = PostsActionTypes.CreatePostAction;

  readonly payload: any;

  constructor(post) {
    this.payload = post;
  }
}

export class CreateFailed implements Action {
  readonly type = PostsActionTypes.CreatePostFailedAction;
}

export class CreateSuccess implements Action {
  readonly type = PostsActionTypes.CreatePostSuccessAction;
}

export class Edit implements Action {
  readonly type = PostsActionTypes.EditPostAction;

  constructor(post) {}
}



export type PostsActions =
List |
ListFailed |
ListSuccess |
Create |
Edit;
