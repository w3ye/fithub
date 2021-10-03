import { TokenUserContext } from "../../App/App";
import { useContext, useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import "./posts.scss";
import PostMessage from "./PostMessage";
import PostLike from "./PostLike";
import axios from "axios";

export default function Posts(props) {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { workoutId } = props;
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState("");
  console.log("what in POST", props);

  // useEffect(() => {
  //   axios
  //     .get(`/api/posts/comments/${workoutId}`)
  //     .then((response) => {
  //       setPost(response.data);
  //       console.log("response.data what is it", response.data);
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // }, []);
  useEffect(() => {
    Promise.all([
      axios.get(`/api/posts/comments/${workoutId}`),
      axios.get(`api/posts/likes/${workoutId}`),
      // axios.get(`api/workout`),
    ]).then((all) => {
      // console.log("in the promise", all[1].data);
      setPost(all[0].data);
      setLikes(all[1].data);
      console.log("ALL", all[1].data);
      const starterLikes = all[1].data;
      starterLikes.forEach((like) => {
        if (like.user_id === user.user.id) {
          toggleSelected();
        }
      });
    });
  }, []);

  function toggleSelected() {
    const element = document.getElementById(workoutId);
    element.classList.toggle("liked");
  }

  // show comments
  // show the post

  function addLike() {
    axios
      .post("/api/posts/likes/new", {
        userId: user.user.id,
        workoutId: workoutId,
      })
      .then((res) => {
        console.log(res);
      });
  }
  function removeLike(like_id) {
    axios.delete(`/api/posts/likes/${like_id}`).then((res) => {
      return res;
    });
  }
  function toggleLike() {
    toggleSelected();
    axios
      .get(`/api/posts/likes/${workoutId}`)
      .then((results) => {
        let liked = false;
        let currentLike;
        results.data.forEach((like) => {
          console.log("Each Like", like);
          if (like.user_id === user.user.id) {
            currentLike = like;
            liked = true;
            console.log("Current Like", currentLike);
            console.log("Current Like ID", currentLike.id);
          }
        });
        liked ? removeLike(currentLike.id) : addLike();
      })
      .then((res) => {
        axios.get(`api/posts/likes/${workoutId}`).then((result) => {
          setLikes(result.data);
        });
      });
  }

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
          <div className="postTopLeft">
            {workoutId} This is a shared workout
          </div>
          <div className="postTopRight" id={workoutId}>
            <p>{likes.length}</p>
            <div
              className="like-button"
              onClick={() => {
                toggleLike();
              }}
            >
              <AiFillLike />
            </div>
          </div>
        </div>
        <div className="postBottom">{comments}</div>
      </div>
    </div>
  );
}
