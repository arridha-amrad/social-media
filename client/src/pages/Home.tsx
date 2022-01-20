import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Box, Container } from "@chakra-ui/react";
import { Dispatch, useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import axiosInstance from "../utils/AxiosInterceptor";
import { PostActionTypes } from "../store/types/PostTypes";
import { PostData } from "../store/reducers/PostReducer";

const Home = () => {
  const { isLoadingAuth } = useSelector((state: RootState) => state.auth);
  const [mounted, setIsMounted] = useState(true);
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const fetchPosts = async () => {
    try {
      dispatch({ type: "LOADING_POST" });
      const { data } = await axiosInstance.get("/api/post");
      const posts = data.posts as PostData[];
      if (mounted) {
        dispatch({
          type: "ADD_POSTS",
          payload: posts,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "STOP_LOADING_POST" });
    }
  };
  useEffect(() => {
    if (!isLoadingAuth) {
      fetchPosts();
    }
    return () => setIsMounted((prev) => !prev);
    // eslint-disable-next-line
  }, []);
  return (
    <Container maxW="container.lg">
      <CreatePost />
      <Box mt="5">
        <Posts />
      </Box>
    </Container>
  );
};

export default Home;
