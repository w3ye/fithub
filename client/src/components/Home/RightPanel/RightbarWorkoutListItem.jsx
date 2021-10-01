import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "./RightbarWorkoutListItem.scss";
import WorkoutListItemDescription from "./WorkoutListItemDescription";
import axios from "axios";
import ModalWorkout from "./ModalWorkout";
import WorkoutList from "../WorkoutList/WorkoutList";

export default function RightbarWorkoutListItem(props) {
  console.log("in rightbarworkoutlistitem", props);
  const {
    title,
    exercises,
    id,
    responseData,
    setResponseData,
    group_ids,
  } = props;
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
    return (
      <ModalWorkout
        key={id}
        id={id}
        title={title}
        exercises={exercises}
        responseData={responseData}
        setResponseData={setResponseData}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        show={show}
        setShow={setShow}
      />
    );
  }

  function handleEdit(id) {
    console.log("this is edit", id);
    return (
      <WorkoutList
        key={id}
        id={id}
        title={title}
        exercises={exercises}
        group_ids={group_ids}
      />
    );
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
    <ModalWorkout
      key={id}
      id={id}
      title={title}
      exercises={exercises}
      responseData={responseData}
      setResponseData={setResponseData}
      fullscreen={fullscreen}
      setFullscreen={setFullscreen}
      show={show}
      setShow={setShow}
    />
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
