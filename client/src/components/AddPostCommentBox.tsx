import {
  Box,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { Dispatch, FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { PostData } from "../store/reducers/PostReducer";
import { PostActionTypes } from "../store/types/PostTypes";
import axiosInstance from "../utils/AxiosInterceptor";

const AddPostCommentBox: FC<{ post: PostData }> = ({ post }) => {
  const { isLoadingComment } = useSelector((state: RootState) => state.posts);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const ref = useRef<HTMLTextAreaElement>(null);
  const sendCommentHandler = async () => {
    try {
      dispatch({
        type: "LOADING_COMMENT",
      });
      const { data } = await axiosInstance.post(`/api/comment/${post._id}`, {
        body: comment,
      });
      dispatch({
        type: "ADD_COMMENT",
        payload: {
          postId: post._id,
          comment: data.comment,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: "STOP_LOADING_COMMENT",
      });
      ref.current!.value = "";
    }
  };
  return (
    <Box mt="2" ml="5">
      <InputGroup>
        <Textarea
          ref={ref}
          onChange={(e) => setComment(e.target.value)}
          resize="none"
          pr="4.5rem"
          type="text"
          placeholder="type your comment..."
        />
        <InputRightElement width="4.5rem">
          <Button
            isLoading={isLoadingComment}
            colorScheme="blue"
            h="1.75rem"
            size="sm"
            onClick={sendCommentHandler}
          >
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default AddPostCommentBox;
