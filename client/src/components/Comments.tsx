import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Dispatch, FC } from "react";
import { Comment } from "../store/reducers/PostReducer";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { PostActionTypes } from "../store/types/PostTypes";
import "./components.css";
import axiosInstance from "../utils/AxiosInterceptor";
import DeleteCommentButton from "./DeleteCommentButton";
import { Link } from "react-router-dom";

const Comments: FC<{ comments: Comment[] }> = ({ comments }) => {
  const { authenticatedUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<Dispatch<PostActionTypes>>();
  const likeCommentHandler = async (commentId: string, postId: string) => {
    try {
      await axiosInstance.post(`/api/comment/like-dislike/${commentId}`);
      dispatch({
        type: "TOGGLE_LIKE_COMMENT",
        payload: {
          commentId,
          postId,
          userId: authenticatedUser!._id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Accordion ml="5" allowToggle>
        <AccordionItem m="0">
          <h2>
            <AccordionButton m="0">
              <Box flex="1" textAlign="left">
                {comments.length} comments
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {comments.map((comment) => {
              const isLiked = () => {
                return comment.likes.find(
                  (userId) => userId === authenticatedUser?._id
                );
              };
              return (
                <Flex alignItems="flex-start" mb="3" ml="5" key={comment._id}>
                  <Avatar size="sm" src={comment.owner.avatarURL} />
                  <Flex
                    w="100%"
                    alignItems="start"
                    justifyContent="space-between"
                  >
                    <Flex ml="5" flexDir="column" w="100%">
                      <Flex alignItems="start" justifyContent="space-between">
                        <Flex alignItems="flex-start" gap="5px">
                          <Flex flexDir="column" alignItems="start">
                            <Text fontWeight="bold" fontSize="small">
                              {comment.owner.username}
                            </Text>
                            <Text mt="-1" fontSize="xs" color="GrayText">
                              <Moment fromNow>{comment.createdAt}</Moment>
                            </Text>
                          </Flex>
                          {comment.owner._id === authenticatedUser?._id && (
                            <DeleteCommentButton comment={comment} />
                          )}
                        </Flex>
                      </Flex>
                      <Text whiteSpace="pre-line" fontSize="small">
                        {comment.body}
                      </Text>
                    </Flex>
                    <Flex flexDir="column" alignItems="flex-end">
                      <Flex>
                        <Text fontSize="xs" color="GrayText">
                          {comment.likes.length !== 0 && comment.likes.length}
                          &nbsp;
                        </Text>
                        <Text fontSize="xs" color="GrayText">
                          {comment.likes.length === 0
                            ? ""
                            : comment.likes.length > 1
                            ? " likes"
                            : " like"}
                        </Text>
                      </Flex>
                      <Box
                        onClick={() =>
                          likeCommentHandler(comment._id, comment.post)
                        }
                      >
                        {isLiked() ? (
                          <i className="fas fa-heart comment-heart isLiked"></i>
                        ) : (
                          <i className="far fa-heart comment-heart"></i>
                        )}
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Comments;
