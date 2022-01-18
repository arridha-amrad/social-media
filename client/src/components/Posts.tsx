import { Box, Container, Flex, Avatar, Spacer, Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Moment from "react-moment";
import LikedButton from "./LikedButton";

const Posts = () => {
  const { isLoadingPost, posts } = useSelector(
    (state: RootState) => state.posts
  );
  if (isLoadingPost) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Container>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Box mb="10" w="100%" key={post._id}>
              <Flex alignItems="center">
                <Avatar src={post.owner.avatarURL} />
                <Box ml="5">{post.owner.username}</Box>
              </Flex>
              <Box>{post.description}</Box>
              <Box>
                <LikedButton post={post} />
                <Button ml="2">
                  <i className="far fa-comment-alt"></i>
                </Button>
              </Box>
              <Text fontSize="sm">
                <Moment fromNow>{post.createdAt}</Moment>
              </Text>
            </Box>
          ))
        ) : (
          <Box>No posts</Box>
        )}
      </Container>
    </>
  );
};

export default Posts;
