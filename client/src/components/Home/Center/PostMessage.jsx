import React, { useContext } from "react";
import { TokenUserContext } from "../../App/App";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

export default function PostMessage(props) {
  const {
    comment_id,
    message,
    userId,
    avatar,
    first_name,
    last_name,
    setPost,
    workoutId,
  } = props;
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;

  function deleteComment() {
    if (user.user.id === userId) {
      axios.delete(`/api/posts/comments/${comment_id}`).then((res) => {
        axios.get(`/api/posts/comments/${workoutId}`).then((result) => {
          setPost(result.data);
        });
      });
    }
  }

  return (
    <div className="postComment">
      <div className="flex-bar">
        <div className="userBar">
          <img alt="" src={avatar} />
          <p class="commenterName">
            {first_name} {last_name}:
          </p>
        </div>
        {user.user.id === userId && (
          <div
            className="delete-button"
            onClick={() => {
              deleteComment();
            }}
          >
            <AiFillDelete />
          </div>
        )}
      </div>
      <p>{message}</p>
    </div>
  );
}
