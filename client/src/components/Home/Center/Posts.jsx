import { TokenUserContext } from "../../App/App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function Posts(props) {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { workoutId } = props;
  const [post, setPost] = useState("");
  console.log("what in POST", props);

  useEffect(() => {
    axios
      .get(`/api/posts/comments/${workoutId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  // show comments
  // show the post

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">{workoutId}</div>
          <div className="postTopRight">{post.message}</div>
          <div className="postCenter">
            <div className="postBottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
