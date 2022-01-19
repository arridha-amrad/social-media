import { Box, Button, Flex, FormControl, Textarea } from "@chakra-ui/react";
import { Dispatch, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { PostData } from "../store/reducers/PostReducer";
import { PostActionTypes } from "../store/types/PostTypes";
import axiosInstance from "../utils/AxiosInterceptor";

const EditPostForm: FC<{ post: PostData }> = ({ post }) => {
  const { isLoadingPost } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const [description, setDescription] = useState(post.description);
  const updatePostHandler = async () => {
    dispatch({
      type: "TOGGLE_IS_EDIT",
      payload: { postId: post._id },
    });
    try {
      dispatch({ type: "LOADING_POST" });
      const { data } = await axiosInstance.put(`/api/post/${post._id}`, {
        description,
      });
      if (data) {
        dispatch({
          type: "UPDATE_POST",
          payload: { postId: post._id, description: description },
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: "STOP_LOADING_POST",
      });
    }
  };
  return (
    <Box py="4" ml="5">
      <FormControl w="100%">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          width="100%"
        />
      </FormControl>
      <Flex justifyContent="end" mt="2">
        <Button
          isDisabled={isLoadingPost}
          ml="2"
          onClick={updatePostHandler}
          colorScheme="blue"
        >
          {isLoadingPost ? "Loading" : "Update"}
        </Button>
      </Flex>
    </Box>
  );
};

export default EditPostForm;
