import { Action } from '@ngrx/store';

// actions
import { PostsActionTypes } from '../../actions/posts.actions';

// interfaces
import { Post } from '../../../../../interfaces/post.interface';




export interface State {
  posts: Post[];
}

export const initialState: State = {
  posts: [],
};

export interface PostsAction extends Action {
  payload: {
    posts: any[];
    pagination?: {
      total: number;
      totalpages: number;
    }
  };
}



export function reducer(state = initialState, action: PostsAction): State {


  switch (action.type) {

    case PostsActionTypes.CreatePostSuccessAction:
      return <State>{
        ...action.payload,
      };

    case PostsActionTypes.CreatePostFailedAction:
      return <State>{
        ...action.payload,
      };

    case PostsActionTypes.RetrievePostSuccessAction:
      return <State>{
        ...action.payload,
      };

    case PostsActionTypes.RetrievePostFailedAction:
      return <State>{
        ...action.payload,
      };

    case PostsActionTypes.ListSuccessAction:
      return <State>{
        ...action.payload,
      };

    case PostsActionTypes.ListFailedAction:
      return <State>{
        ...action.payload,
      };

    default:
      return state;
  }
}
