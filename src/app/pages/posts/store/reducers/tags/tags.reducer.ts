import { Action } from '@ngrx/store';

import { WPtag } from '../../../../../interfaces/wp/tag.interface';


import { TagsActionTypes } from '../../actions/tags.actions';


export interface State {
  tags: WPtag[];
}

export const initialState: State = {
  tags: [],
};



export function reducer(state = initialState, action: any): State {


  switch (action.type) {

    case TagsActionTypes.ListSuccessAction:
      return {
        tags: action.payload,
      };

    case TagsActionTypes.ListSuccessAction:
      return {
        tags: [],
      };

    default:
      return state;
  }
}
