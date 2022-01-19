import { Box, Tooltip } from "@chakra-ui/react";
import { Dispatch, FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PostData } from "../store/reducers/PostReducer";
import { PostActionTypes } from "../store/types/PostTypes";
import axiosInstance from "../utils/AxiosInterceptor";
import GlobalAlertDialog from "./GlobalAlertDialog";

const DeletePostButton: FC<{ post: PostData }> = ({ post }) => {
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const deletePostHandler = async () => {
    try {
      await axiosInstance.delete(`/api/post/${post._id}`);
      dispatch({ type: "DELETE_POST", payload: { postId: post._id } });
    } catch (err) {
      console.log(err);
    }
  };
  const ref = useRef<HTMLButtonElement>();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <GlobalAlertDialog
      action={deletePostHandler}
      cancelRef={ref}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Delete this post"
      message="Are you sure to delete this post ?"
    >
      <Tooltip label="Delete post">
        <Box onClick={() => setIsOpen(true)} ml="3">
          <i className="fas fa-trash small-icon delete-icon"></i>
        </Box>
      </Tooltip>
    </GlobalAlertDialog>
  );
};

export default DeletePostButton;
