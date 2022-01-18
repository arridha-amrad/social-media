import { Box, Button, FormControl, Textarea } from "@chakra-ui/react";
import { Dispatch, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_POST, PostActionTypes } from "../store/types/PostTypes";
import axiosInstance from "../utils/AxiosInterceptor";

const CreatePost = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState({
    description: "",
  });
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const handleCreatePost = async () => {
    try {
      dispatch({ type: "LOADING_POST" });
      const { data } = await axiosInstance.post("/api/post", state);
      dispatch({
        type: ADD_POST,
        payload: data.post,
      });
      setState({ description: "" });
      ref.current!.value = "";
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "STOP_LOADING_POST" });
    }
  };
  return (
    <Box mt="5">
      <FormControl>
        <Textarea
          ref={ref}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          resize="none"
          height="5"
          placeholder="write your post..."
        />
        <Box mt="2" d="flex" justifyContent="end">
          <Button
            isDisabled={state.description.trim() === ""}
            w="60"
            colorScheme="blue"
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default CreatePost;
