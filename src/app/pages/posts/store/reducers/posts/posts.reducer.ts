import { Action } from '@ngrx/store';

// actions
import { PostsActionTypes } from '../../actions/posts.actions';

// interfaces
import { Post } from '../../../../../interfaces/post.interface';




export interface State {
  list?: Post[];
  post?: Post;
}

export const initialState: State = {
  list: [],
  post: null,
};

export interface PostsAction extends Action {
  list?: Post[];
  post?: Post;
}



export function reducer(state = initialState, action: PostsAction): State {
  switch (action.type) {

    case PostsActionTypes.CreatePostSuccessAction:
      return <State>{
        post: action.post,
      };

    case PostsActionTypes.CreatePostFailedAction:
      return <State>{
        post: null,
      };

    case PostsActionTypes.ListSuccessAction:
      return <State>{
        list: action.list,
      };

    case PostsActionTypes.ListFailedAction:
      return <State>{
        list: [],
      };

    default:
      return state;
  }
}
