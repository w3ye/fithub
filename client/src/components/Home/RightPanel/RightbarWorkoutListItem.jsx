import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import "./RightbarWorkoutListItem.scss";
import WorkoutListItemDescription from "./WorkoutListItemDescription";
import axios from "axios";
import ModalWorkout from "./ModalWorkout";

export default function RightbarWorkoutListItem(props) {
  console.log("in rightbarworkoutlistitem", props);
  const {
    title,
    exercises,
    id,
    responseData,
    setResponseData,
    setPanels,
    setId,
    editWorkoutObj,
    setEditWorkoutObj,
    workout,
    setWorkout,
  } = props;
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   console.log("in UseEffect", editWorkoutData);
  // }, [editWorkoutData]);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  function handleEdit(id) {
    console.log("this is edit", id);
    const editWorkout = responseData.find((x) => x.id === id);
    console.log("edit workout", editWorkout);
    setPanels("edit");
    setEditWorkoutObj(editWorkout);
    setWorkout(editWorkout.exercises);
    console.log("after SetEdit", editWorkoutObj);
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
