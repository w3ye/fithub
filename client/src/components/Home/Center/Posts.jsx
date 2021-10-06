import { TokenUserContext } from "../../App/App";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
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
  const [postAuthor, setPostAuthor] = useState({});
  const setPost = (post) => setState((prev) => ({ ...prev, post }));

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

  function getPostAuthor(postId) {
    axios.get("/api/users").then((res) => {
      setPostAuthor(res.data[postId]);
    });
  }

  useEffect(() => {
    getPostAuthor(state.workout.user_id);
  }, [postAuthor]);

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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Try {state.workout.title}
    </Tooltip>
  );

  return (
    <div className="post">
      {postAuthor && (
        <div className="infoBox">
          <img alt="" src={postAuthor.avatar_url} className="postAuthorImg" />
          <p>
            {postAuthor.first_name} {postAuthor.last_name} shared:
          </p>
        </div>
      )}
      <div className="postTop">
        <div className="postTopLeft">
          <p class="workoutTitle">{state.workout.title}</p>
          {state.workout && (
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <img
                src={state.workout.exercises[0].gifUrl}
                alt="ii"
                onClick={() => handleShow(true)}
              />
            </OverlayTrigger>
          )}
        </div>
        <div
          className="postTopRight"
          id={workoutId}
          onClick={() => {
            toggleLike();
          }}
        >
          <h4>{state.likes.length}</h4>
          <div className="like-icon">
            <GiStrong size={40} />
          </div>
        </div>
      </div>
      <div className="postBottom">
        <div className="commentInput">
          <img
            classname="userAvatar"
            alt=""
            src={user.user ? user.user.avatar_url : ""}
          />
          <input
            id="commentInput"
            type="text"
            onChange={(event) =>
              setState((prev) => ({ ...prev, comment: event.target.value }))
            }
          />
          <div>
            <Button
              variant="dark"
              onClick={() => {
                postComment(state.comment);
              }}
            >
              Comment
            </Button>
          </div>
        </div>
        <div className="commentContainer">{comments}</div>
      </div>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        {showModal}
      </Modal>
    </div>
  );
}
