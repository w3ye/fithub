import { TokenUserContext } from "../../App/App";
import { useContext, useState, useEffect } from "react";
import PostMessage from "./PostMessage";
import PostLike from "./PostLike";
import axios from "axios";

export default function Posts(props) {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { workoutId } = props;
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get(`/api/posts/comments/${workoutId}`),
      axios.get(`api/posts/likes/${workoutId}`),
      // axios.get(`api/workout/${workoutid}`),
    ]).then((all) => {
      setPost(all[0].data);
      setLikes(all[1].data);
    });
  }, []);

  // show comments
  // show the post

  const comments =
    post &&
    post.map((comment) => (
      <PostMessage
        key={comment.id}
        userId={comment.user_id}
        message={comment.message}
      />
    ));

  const postLikes =
    likes && likes.map((x) => <PostLike key={x.id} userId={x.user_id} />);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">{workoutId}</div>
          <div className="postTopRight">{comments}</div>
          <div className="postCenter">
            Number of likes: {likes.length}
            <div className="postBottom">{postLikes}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
