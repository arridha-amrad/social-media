import { PostData, User } from "../reducers/PostReducer";

export const LOADING_POST = "LOADING_POST";
export const STOP_LOADING_POST = "STOP_LOADING_POST";
export const ADD_POSTS = "ADD_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST"

export type PostActionTypes =
  | { type: typeof LOADING_POST }
  | { type: typeof ADD_POSTS; payload: PostData[] }
  | { type: typeof ADD_POST; payload: PostData }
  | { type: typeof STOP_LOADING_POST }
  | {type: typeof DISLIKE_POST; payload: {postId: string, userId: string}}
  | { type: typeof LIKE_POST; payload: {postId: string, userId: string} };
