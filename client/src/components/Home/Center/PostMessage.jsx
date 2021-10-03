import React, { useContext } from "react";
import { TokenUserContext } from "../../App/App";
// import User from "../../topbar/User";
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
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  function deleteComment() {
    if (user.user.id === userId) {
      axios.delete(`/api/posts/comments/${comment_id}`).then((res) => {
        console.log(res);
        axios.get(`api/posts/comments/${workoutId}`).then((result) => {
          setPost(result.data);
        });
      });
    } else {
    }
  }

  return (
    <div className="postComment">
      <div class="flex-bar">
        <div className="userBar">
          <img alt="" src={avatar} />
          <p>
            {first_name} {last_name}:
          </p>
        </div>
        <div
          className="delete-button"
          onClick={() => {
            deleteComment();
          }}
        >
          <AiFillDelete />
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}
