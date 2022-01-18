import { PostActionTypes } from "../types/PostTypes";

export interface User {
  _id: string;
  username: string;
  avatarURL: string;
}

export interface Comment {
  id: string;
  body: string;
  owner: User;
  likes: string[];
  post: PostData;
}

export interface PostData {
  _id: string;
  imageURL?: string;
  description: string;
  owner: User;
  comments: Comment[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostState {
  posts: PostData[];
  isLoadingPost: boolean;
}

const initialState: PostState = {
  posts: [],
  isLoadingPost: false,
};

export default function PostReducer(
  state = initialState,
  action: PostActionTypes
): PostState {
  const { posts } = state;
  switch (action.type) {
    case "LOADING_POST":
      return {
        ...state,
        isLoadingPost: true,
      };
    case "ADD_POSTS":
      return {
        ...state,
        posts: [...posts, ...action.payload],
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...posts],
      };
    case "STOP_LOADING_POST":
      return {
        ...state,
        isLoadingPost: false,
      };
        case "LIKE_POST":
          const  index = posts.findIndex((post) => post._id === action.payload.postId)
          const updatedPosts = [...posts]
          updatedPosts[index].likes.push(action.payload.userId) 
          return {
            ...state,
            posts: updatedPosts
          }
    case "DISLIKE_POST":
      const  postIndex = posts.findIndex((post) => post._id === action.payload.postId)
      const currentPosts = [...posts]
      const filteredPost = currentPosts[postIndex].likes.filter((userId) => userId !== action.payload.userId)
      currentPosts[postIndex].likes = filteredPost
      return {
        ...state,
        posts: currentPosts
      }
    default:
      return state;
  }
}
