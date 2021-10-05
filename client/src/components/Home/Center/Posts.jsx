import { TokenUserContext } from "../../App/App";
import Modal from "react-bootstrap/Modal";
import Button from "@restart/ui/esm/Button";
import ModalWorkout from "../RightPanel/ModalWorkout";
import { useContext, useState, useEffect } from "react";
import { GiStrong } from "react-icons/gi";
import "./posts.scss";
import PostMessage from "./PostMessage";
import axios from "axios";

export default function Posts(props) {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { workoutId } = props;
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    post: "",
    likes: "",
    comment: "",
    workout: "",
  });
  const setPost = (post) => setState((prev) => ({ ...prev, post }));

  console.log(state);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/posts/comments/${workoutId}`),
      axios.get(`api/posts/likes/${workoutId}`),
      axios.get(`api/workouts/wid/${workoutId}`),
    ]).then((all) => {
      setState((prev) => ({ ...prev, post: all[0].data }));
      setState((prev) => ({ ...prev, likes: all[1].data }));
      setState((prev) => ({ ...prev, workout: all[2].data }));
      const starterLikes = all[1].data;
      starterLikes.forEach((like) => {
        if (like.user_id === user.user.id) {
          toggleSelected();
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        return res;
      })
      .catch((err) => err);
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
          if (like.user_id === user.user.id) {
            currentLike = like;
            liked = true;
          }
        });
        liked ? removeLike(currentLike.id) : addLike();
      })
      .then((res) => {
        axios.get(`api/posts/likes/${workoutId}`).then((result) => {
          setState((prev) => ({ ...prev, likes: result.data }));
        });
      });
  }

  const comments =
    state.post &&
    state.post.map((comment) => (
      <PostMessage
        key={comment.id}
        comment_id={comment.id}
        userId={comment.user_id}
        message={comment.message}
        avatar={comment.avatar_url}
        first_name={comment.first_name}
        last_name={comment.last_name}
        setPost={setPost}
        workoutId={workoutId}
      />
    ));

  function postComment(message) {
    const commentInput = document.getElementById("commentInput");
    axios
      .post("/api/posts/comments/new", {
        userId: user.user.id,
        workoutId: workoutId,
        message: message,
      })
      .then((res) => {
        axios
          .get(`api/posts/comments/${workoutId}`)
          .then((result) => {
            setPost(result.data);
          })
          .catch((err) => err);
      })
      .then(() => {
        commentInput.value = "";
      })
      .catch((err) => err);
  }

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  const showModal = (
    <ModalWorkout
      key={state.workout.id}
      id={state.workout.id}
      title={state.workout.title}
      exercises={state.workout.exercises}
    />
  );

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">Workout #{state.workout.title}</div>
          <div
            className="postTopRight"
            id={workoutId}
            onClick={() => {
              toggleLike();
            }}
          >
            <p>{state.likes.length}</p>
            <div className="like-icon">
              <GiStrong />
            </div>
          </div>
        </div>
        <Button variant="primary" onClick={() => handleShow(true)}>
          Start Workout
        </Button>
        <div className="postBottom">
          <div className="commentInput">
            <img alt="" src={user.user ? user.user.avatar_url : ""} />
            <input
              id="commentInput"
              type="text"
              onChange={(event) =>
                setState((prev) => ({ ...prev, comment: event.target.value }))
              }
            />
            <button
              onClick={() => {
                postComment(state.comment);
              }}
            >
              Comment
            </button>
          </div>
          <div>{comments}</div>
        </div>
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          {showModal}
        </Modal>
      </div>
    </div>
  );
}
