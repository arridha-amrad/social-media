import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { Dispatch, useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import axiosInstance from "../utils/AxiosInterceptor";
import { PostActionTypes } from "../store/types/PostTypes";
import { PostData } from "../store/reducers/PostReducer";

const Home = () => {
  const {
    posts: { isLoadingPost, posts, isFetched },
  } = useSelector((state: RootState) => state);

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
    if (!isFetched) {
      fetchPosts();
    }
    return () => setIsMounted(false);
    // eslint-disable-next-line
  }, []);
  const loading = () => (
    <Flex w="100%" alignItems="center" justifyContent="center">
      <Spinner />
    </Flex>
  );
  return (
    <Container maxW="container.lg">
      <CreatePost />
      <Box mt="5">{isLoadingPost ? loading() : <Posts posts={posts} />}</Box>
    </Container>
  );
};

export default Home;
