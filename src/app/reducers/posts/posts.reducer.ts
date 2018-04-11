import { Action } from '@ngrx/store';

// actions
import { PostsActionTypes } from '../../actions/posts.actions';

// interfaces
import { Post } from '../../interfaces/post.interface';




export interface State {
  list: Post[];
}

export const initialState: State = {
  list: [],
};

export interface PostsAction extends Action {
  list: Post[];
}

export function reducer(state = initialState, action: PostsAction): State {

  console.log('post reducers', action);

  switch (action.type) {

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
