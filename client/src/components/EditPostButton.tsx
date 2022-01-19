import { Tooltip, Box } from "@chakra-ui/react";
import { Dispatch, FC } from "react";
import { useDispatch } from "react-redux";
import { PostData } from "../store/reducers/PostReducer";
import { PostActionTypes } from "../store/types/PostTypes";

const EditPostButton: FC<{ post: PostData }> = ({ post }) => {
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const handleEditPost = () => {
    dispatch({
      type: "TOGGLE_IS_EDIT",
      payload: { postId: post._id },
    });
  };
  return (
    <Tooltip label="Edit post">
      <Box onClick={handleEditPost} ml="3">
        <i className="fas fa-pen small-icon edit-icon"></i>
      </Box>
    </Tooltip>
  );
};

export default EditPostButton;
