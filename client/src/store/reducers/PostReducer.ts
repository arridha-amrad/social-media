import { PostActionTypes } from "../types/PostTypes";

export interface User {
  _id: string;
  username: string;
  avatarURL: string;
}

export interface Comment {
  _id: string;
  body: string;
  owner: User;
  likes: string[];
  post: string;
  createdAt: string;
  updatedAt: string;
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
  isEdit: boolean;
  isComment: boolean;
}

export interface PostState {
  posts: PostData[];
  isLoadingPost: boolean;
  isLoadingComment: boolean;
}

const initialState: PostState = {
  posts: [],
  isLoadingPost: false,
  isLoadingComment: false,
};

export default function PostReducer(
  state = initialState,
  action: PostActionTypes
): PostState {
  const { posts } = state;
  const postsCopy = [...posts];
  const findPostIndex = (postId: string) => {
    return posts.findIndex((post) => post._id === postId);
  };
  const findCommentIndex = (post: PostData, commentId: string) => {
    return post.comments.findIndex((comment) => comment._id === commentId);
  };
  switch (action.type) {
    case "LOADING_COMMENT":
      return {
        ...state,
        isLoadingComment: true,
      };
    case "STOP_LOADING_COMMENT":
      return {
        ...state,
        isLoadingComment: false,
      };
    case "LOADING_POST":
      return {
        ...state,
        isLoadingPost: true,
      };
    case "ADD_POSTS":
      return {
        ...state,
        posts: action.payload,
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
    case "LIKE_POST_OR_DISLIKE":
      const index = findPostIndex(action.payload.postId);
      const isLiked = posts[index].likes.find(
        (userId) => userId === action.payload.userId
      );
      if (isLiked) {
        const filteredPost = postsCopy[index].likes.filter(
          (userId) => userId !== action.payload.userId
        );
        postsCopy[index].likes = filteredPost;
      } else {
        postsCopy[index].likes.push(action.payload.userId);
      }
      return {
        ...state,
        posts: postsCopy,
      };
    case "TOGGLE_IS_EDIT":
      const k = findPostIndex(action.payload.postId);
      postsCopy[k].isEdit = !postsCopy[k].isEdit;
      return {
        ...state,
        posts: postsCopy,
      };
    case "TOGGLE_IS_COMMENT":
      const idx = findPostIndex(action.payload.postId);
      postsCopy[idx].isComment = !postsCopy[idx].isComment;
      return {
        ...state,
        posts: postsCopy,
      };
    case "UPDATE_POST":
      const j = findPostIndex(action.payload.postId);
      postsCopy[j].description = action.payload.description;
      return {
        ...state,
        posts: postsCopy,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: posts.filter((post) => post._id !== action.payload.postId),
      };
    case "ADD_COMMENT":
      const pidx = findPostIndex(action.payload.postId);
      postsCopy[pidx].comments.splice(0, 0, action.payload.comment);
      return {
        ...state,
        posts: postsCopy,
      };
    case "TOGGLE_LIKE_COMMENT":
      const likeComment = () => {
        const { commentId, postId, userId } = action.payload;
        const pindx = findPostIndex(postId);
        const cindx = findCommentIndex(posts[pindx], commentId);
        const isLiked = postsCopy[pindx].comments[cindx].likes.find(
          (like) => like === userId
        );
        if (isLiked) {
          const filteredLikes = postsCopy[pindx].comments[cindx].likes.filter(
            (like) => like !== userId
          );
          postsCopy[pindx].comments[cindx].likes = filteredLikes;
        } else {
          postsCopy[pindx].comments[cindx].likes.push(userId);
        }
        return postsCopy;
      };
      return {
        ...state,
        posts: likeComment(),
      };
    case "DELETE_COMMENT":
      const deleteComment = () => {
        const { commentId, postId } = action.payload;
        const postIndex = findPostIndex(postId);
        const filteredComments = posts[postIndex].comments.filter(
          (comment) => comment._id !== commentId
        );
        postsCopy[postIndex].comments = filteredComments;
        return postsCopy;
      };
      return {
        ...state,
        posts: deleteComment(),
      };
    default:
      return state;
  }
}
