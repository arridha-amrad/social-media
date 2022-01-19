import { Button } from "@chakra-ui/react";
import { Dispatch, FC } from "react";
import { useDispatch } from "react-redux";
import { PostData } from "../store/reducers/PostReducer";
import { PostActionTypes } from "../store/types/PostTypes";

const CommentButton: FC<{ post: PostData }> = ({ post }) => {
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const toggleCommentButton = () => {
    dispatch({
      type: "TOGGLE_IS_COMMENT",
      payload: { postId: post._id },
    });
  };
  return (
    <Button onClick={toggleCommentButton} ml="2">
      <i className="far fa-comment-alt"></i>
    </Button>
  );
};

export default CommentButton;
