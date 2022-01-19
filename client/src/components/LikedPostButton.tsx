import { Box, Button } from "@chakra-ui/react";
import { Dispatch, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { PostData } from "../store/reducers/PostReducer";
import { PostActionTypes } from "../store/types/PostTypes";
import axiosInstance from "../utils/AxiosInterceptor";
import "./components.css";

const LikedPostButton: FC<{ post: PostData }> = ({ post }) => {
  const { authenticatedUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const handleLike = async () => {
    try {
      await axiosInstance.post(`/api/post/like-dislike/${post._id}`);
      dispatch({
        type: "LIKE_POST_OR_DISLIKE",
        payload: {
          postId: post._id,
          userId: authenticatedUser!._id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button onClick={handleLike}>
      {post.likes.length > 0 && post.likes.length}
      <Box ml={post.likes.length === 0 ? "0" : "5"}>
        {post.likes.find((like) => like === authenticatedUser?._id) ? (
          <i className="fas fa-heart isLiked"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
      </Box>
    </Button>
  );
};

export default LikedPostButton;
