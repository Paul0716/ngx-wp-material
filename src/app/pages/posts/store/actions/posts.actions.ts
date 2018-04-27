import { Action } from '@ngrx/store';
import { PageEvent } from '@angular/material';

export enum PostsActionTypes {
  ListAction        = '[Posts] List Action',
  ListSuccessAction = '[Posts] List Success Action',
  ListFailedAction  = '[Posts] List Failed Action',

  CreatePostAction        = '[Posts] Create Post Action',
  CreatePostFailedAction  = '[Posts] Create Post Failed Action',
  CreatePostSuccessAction = '[Posts] Create Post Success Action',

  RetrievePostAction        = '[Posts] Retrieve Post Action',
  RetrievePostSuccessAction = '[Posts] Retrieve Post Success Action',
  RetrievePostFailedAction  = '[Posts] Retrieve Post Failed Action',

  EditPostAction            = '[Posts] Edit Post Action',
  EditPostSuccessAction     = '[Posts] Edit Post Success Action',
  EditPostFailedAction      = '[Posts] Edit Post Failed Action',

  DeletePostAction            = '[Posts] Delete Post Action',
  DeletePostSuccessAction     = '[Posts] Delete Post Success Action',
  DeletePostFailedAction      = '[Posts] Delete Post Failed Action',
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

export class Retrieve implements Action {
  readonly type = PostsActionTypes.RetrievePostAction;
  readonly payload: any;

  constructor(postId) {
    this.payload = {
      id: postId,
    };
  }
}

export class RetrieveSuccess implements Action {
  readonly type = PostsActionTypes.RetrievePostSuccessAction;
}

export class RetrieveFailed implements Action {
  readonly type = PostsActionTypes.RetrievePostFailedAction;
}

export class Edit implements Action {
  readonly type = PostsActionTypes.EditPostAction;
  readonly payload: any;

  constructor(post) {
    this.payload = post;
  }
}

export class EditFailed implements Action {
  readonly type = PostsActionTypes.EditPostFailedAction;
}

export class EditSuccess implements Action {
  readonly type = PostsActionTypes.EditPostSuccessAction;
}

export class Delete implements Action {
  readonly type = PostsActionTypes.DeletePostAction;
  readonly payload: any;

  constructor(postId) {
    this.payload = postId;
  }
}

export class DeleteSuccess implements Action {
  readonly type = PostsActionTypes.DeletePostSuccessAction;
}

export class DeleteFailed implements Action {
  readonly type = PostsActionTypes.DeletePostFailedAction;
}



export type PostsActions =
List |
ListFailed |
ListSuccess |
Create |
CreateSuccess |
CreateFailed |
Edit |
EditSuccess |
EditFailed |
Delete |
DeleteSuccess |
DeleteFailed
;
