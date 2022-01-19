import { Comment, PostData } from "../reducers/PostReducer";

export const LOADING_POST = "LOADING_POST";
export const STOP_LOADING_POST = "STOP_LOADING_POST";
export const ADD_POSTS = "ADD_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST_OR_DISLIKE = "LIKE_POST_OR_DISLIKE";
export const TOGGLE_IS_EDIT = "TOGGLE_IS_EDIT";
export const TOGGLE_IS_COMMENT = "TOGGLE_IS_COMMENT";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const LOADING_COMMENT = "LOADING_COMMENT";
export const STOP_LOADING_COMMENT = "STOP_LOADING_COMMENT";
export const TOGGLE_LIKE_COMMENT = "TOGGLE_LIKE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export type PostActionTypes =
  | { type: typeof LOADING_POST }
  | { type: typeof LOADING_COMMENT }
  | { type: typeof STOP_LOADING_COMMENT }
  | { type: typeof ADD_POSTS; payload: PostData[] }
  | { type: typeof ADD_POST; payload: PostData }
  | { type: typeof STOP_LOADING_POST }
  | {
      type: typeof LIKE_POST_OR_DISLIKE;
      payload: { postId: string; userId: string };
    }
  | {
      type: typeof UPDATE_POST;
      payload: { description: string; postId: string };
    }
  | {
      type: typeof TOGGLE_LIKE_COMMENT;
      payload: { postId: string; userId: string; commentId: string };
    }
  | {
      type: typeof DELETE_COMMENT;
      payload: { postId: string; commentId: string };
    }
  | { type: typeof ADD_COMMENT; payload: { comment: Comment; postId: string } }
  | { type: typeof TOGGLE_IS_COMMENT; payload: { postId: string } }
  | { type: typeof DELETE_POST; payload: { postId: string } }
  | { type: typeof TOGGLE_IS_EDIT; payload: { postId: string } };
