import { Box, Container, Flex, Avatar, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Moment from "react-moment";
import LikedButton from "./LikedPostButton";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";
import EditPostForm from "./EditPostForm";
import CommentButton from "./CommentButton";
import AddPostCommentBox from "./AddPostCommentBox";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const {
    posts: { posts },
    auth: { authenticatedUser },
  } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  return (
    <>
      <Container>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Box
              p="5"
              mb="10"
              w="100%"
              key={post._id}
              borderWidth="medium"
              borderStyle="solid"
            >
              <Flex alignItems="start">
                <Avatar src={post.owner.avatarURL} />
                <Flex flexDir="column" justify="flex-start" width="100%">
                  <Flex>
                    <Box ml="5">{post.owner.username}</Box>
                    {post.owner._id === authenticatedUser?._id && (
                      <>
                        <EditPostButton post={post} />
                        <DeletePostButton post={post} />
                      </>
                    )}
                  </Flex>
                  <Text ml="5" color="GrayText" fontSize="sm">
                    <Moment fromNow>{post.createdAt}</Moment>
                  </Text>
                  {post.isEdit ? (
                    <EditPostForm post={post} />
                  ) : (
                    <Box
                      onClick={() => navigate(`/post?id=${post._id}`)}
                      whiteSpace="pre-line"
                      py="4"
                      ml="5"
                      minH={"10"}
                    >
                      <Text>{post.description}</Text>
                    </Box>
                  )}
                  <Box ml="5">
                    <LikedButton post={post} />
                    <CommentButton post={post} />
                  </Box>
                  {post.isComment && <AddPostCommentBox post={post} />}
                  {post.comments.length > 0 && (
                    <Box mt="5">
                      <Comments comments={post.comments} />
                    </Box>
                  )}
                </Flex>
              </Flex>
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
