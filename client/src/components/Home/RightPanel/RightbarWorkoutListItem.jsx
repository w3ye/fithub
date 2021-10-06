import Card from "react-bootstrap/Card";
import button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useContext } from "react";
import "./RightbarWorkoutListItem.scss";
import WorkoutListItemDescription from "./WorkoutListItemDescription";
import axios from "axios";
import ModalWorkout from "./ModalWorkout";
import { TokenUserContext } from "../../App/App";
import { BiEdit } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

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

  const MySwalShare = withReactContent(Swal);

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
    MySwalShare.fire({
      title: <p>Hello World</p>,
      footer: "Copyright 2018",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        MySwalShare.clickConfirm();
      },
    }).then(() => {
      return MySwalShare.fire(<p>Workout Shared</p>);
    });
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
      <div className="container-myworkout">
        <div className="card-myworkout">
          <h2 className="workout-title">{title.toUpperCase()}</h2>
          <div className="imgBx">
            <img
              src={exercises[0].gifUrl}
              alt=""
              onClick={() => handleShow(true)}
            />
          </div>
          <div className="contentBx">
            <div className="exercises">
              {exercises.map((item) => (
                <WorkoutListItemDescription
                  key={item.id}
                  name={item.name}
                  set={item.set}
                  reps={item.reps}
                />
              ))}
              <div className="card-buttons">
                <div className="other-icons">
                  <BiEdit
                    variant="primary"
                    className="icon"
                    onClick={() => handleEdit(id)}
                  />
                  <FaShareAlt
                    variant="primary"
                    className="icon"
                    onClick={() => handleShare(id)}
                  />
                  <AiFillDelete
                    variant="primary"
                    className="icon"
                    onClick={() => handleDelete(id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal">
          <Modal
            id="my-modal"
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            {showModal}
          </Modal>
        </div>
      </div>
    </>
  );
}
