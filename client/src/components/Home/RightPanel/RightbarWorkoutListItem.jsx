import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import "./RightbarWorkoutListItem.scss";
import WorkoutListItemDescription from "./WorkoutListItemDescription";
import axios from "axios";
import ModalWorkout from "./ModalWorkout";
import { TokenUserContext } from "../../App/App";

export default function RightbarWorkoutListItem(props) {
  const {
    title,
    exercises,
    id,
    responseData,
    setResponseData,
    setPanels,
    setEditWorkoutObj,
    setWorkout,
  } = props;
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;

  console.log("responseData in RightbarWorkoutList Item", responseData);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  function handleEdit(id) {
    const editWorkout = responseData.find((x) => x.id === id);

    setPanels("edit");
    setEditWorkoutObj(editWorkout);
    setWorkout(editWorkout.exercises);
  }

  function handleShare(id) {
    const shareWorkout = responseData.find((x) => x.id === id);

    const listGroupId = user.groups.map((element) => element.group_id);

    for (const i of listGroupId) {
      axios
        .post("api/posts/new", { workoutId: shareWorkout.id, groupId: i })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err;
        });
    }
    setPanels("groupfeed");
  }

  function handleDelete(id) {
    const remainingWorkouts = responseData.filter(
      (workout) => workout.id !== id
    );
    return axios
      .delete(`/api/workouts/${id}`)
      .then((result) => {
        setResponseData(remainingWorkouts);
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  const showModal = (
    <ModalWorkout key={id} id={id} title={title} exercises={exercises} />
  );

  return (
    <>
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>{title.toUpperCase()}</Card.Title>
          {exercises.map((item) => (
            <WorkoutListItemDescription
              key={item.id}
              name={item.name}
              set={item.set}
              reps={item.reps}
            />
          ))}
          <Button variant="primary" onClick={() => handleShow(true)}>
            Start Workout
          </Button>
          <Button variant="primary" onClick={() => handleEdit(id)}>
            Edit
          </Button>
          <Button variant="primary" onClick={() => handleShare(id)}>
            Share
          </Button>
          <Button variant="primary" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Card.Body>
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          {showModal}
        </Modal>
      </Card>
    </>
  );
}
