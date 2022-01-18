import { Button } from "@chakra-ui/react";
import { Dispatch, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { PostData } from "../store/reducers/PostReducer";
import { PostActionTypes } from "../store/types/PostTypes";
import axiosInstance from "../utils/AxiosInterceptor";
import "./components.css"

const LikedButton: FC<{post: PostData}> = ({post}) => {
  const {authenticatedUser} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<Dispatch<PostActionTypes>>()
  const handleLike = async() => {
    try {
      const res = await axiosInstance.post(`/api/post/like-dislike/${post._id}`)
      const isLiked = post.likes.find((userId) => userId === authenticatedUser?._id)
      if(!isLiked){
        dispatch({
          type: "LIKE_POST",
          payload: {
            postId: post._id,
            userId: authenticatedUser!._id
          }
        })
      } else {
        dispatch({
          type: "DISLIKE_POST",
          payload: {
            postId: post._id,
            userId: authenticatedUser!._id
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return(
    <Button onClick={handleLike}>
      {post.likes.find((like) => like === authenticatedUser?._id) ? (
        <i className="fas fa-heart isLiked"></i>
      ) : (
        <i className="far fa-heart"></i>
      )}
    </Button>
  )
}

export default LikedButton;