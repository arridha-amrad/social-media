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
  isFetched: boolean;
  isLoadingComment: boolean;
}

const initialState: PostState = {
  posts: [],
  isFetched: false,
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
        isFetched: true,
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
      const likeOrDislike = () => {
        const postIndex = findPostIndex(action.payload.postId);
        const isLiked = posts[postIndex].likes.find(
          (userId) => userId === action.payload.userId
        );
        if (isLiked) {
          const filteredPost = postsCopy[postIndex].likes.filter(
            (userId) => userId !== action.payload.userId
          );
          postsCopy[postIndex].likes = filteredPost;
        } else {
          postsCopy[postIndex].likes.push(action.payload.userId);
        }
        return postsCopy;
      };
      return {
        ...state,
        posts: likeOrDislike(),
      };
    case "TOGGLE_IS_EDIT":
      const toggleIsEdit = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].isEdit = !postsCopy[postIndex].isEdit;
        return postsCopy;
      };
      return {
        ...state,
        posts: toggleIsEdit(),
      };
    case "TOGGLE_IS_COMMENT":
      const toggleComment = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].isComment = !postsCopy[postIndex].isComment;
        return postsCopy;
      };
      return {
        ...state,
        posts: toggleComment(),
      };
    case "UPDATE_POST":
      const updatePost = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].description = action.payload.description;
        return postsCopy;
      };
      return {
        ...state,
        posts: updatePost(),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: posts.filter((post) => post._id !== action.payload.postId),
      };
    case "ADD_COMMENT":
      const addComment = () => {
        const postIndex = findPostIndex(action.payload.postId);
        postsCopy[postIndex].comments.splice(0, 0, action.payload.comment);
        return postsCopy;
      };
      return {
        ...state,
        posts: addComment(),
      };
    case "TOGGLE_LIKE_COMMENT":
      const likeComment = () => {
        const { commentId, postId, userId } = action.payload;
        const postIndex = findPostIndex(postId);
        const commentIndex = findCommentIndex(posts[postIndex], commentId);
        const isLiked = postsCopy[postIndex].comments[commentIndex].likes.find(
          (like) => like === userId
        );
        if (isLiked) {
          const filteredLikes = postsCopy[postIndex].comments[
            commentIndex
          ].likes.filter((like) => like !== userId);
          postsCopy[postIndex].comments[commentIndex].likes = filteredLikes;
        } else {
          postsCopy[postIndex].comments[commentIndex].likes.push(userId);
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
