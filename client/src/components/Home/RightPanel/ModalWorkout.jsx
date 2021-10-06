import Modal from "react-bootstrap/Modal";
import button from "react-bootstrap/Button";
import "./modalWorkout.scss";
import { useState } from "react";

export default function ModalWorkout(props) {
  const { title, exercises } = props;
  const [index, setIndex] = useState(0);

  function previous() {
    if (exercises.length < 2) {
      return;
    }
    setIndex((prev) => prev - 1);
  }

  function next() {
    setIndex((prev) => prev + 1);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {exercises.length !== index ? (
          <>
            {exercises[index].name}
            <img
              class
              Name="gifUrl"
              src={exercises[index].gifUrl}
              alt={exercises[index].name}
            />
            <div>Set: {exercises[index].set}</div>
            <div>Reps: {exercises[index].reps}</div>
          </>
        ) : (
          <>
            <div className="success"> You did it! </div>

            <img
              src="https://media2.giphy.com/media/h72H0tXcBjqI6edm6M/giphy.gif?cid=ecf05e47fsoormgf91btzfiznlivxpbk5ftkc0cx0njsjwsk&rid=giphy.gif&ct=g"
              alt=""
              className="gifUrl"
            />
          </>
        )}
        {index > 0 && (
          <button className="modal-button" onClick={() => previous()}>
            Previous
          </button>
        )}
        {exercises.length !== index && (
          <button className="modal-button" onClick={() => next()}>
            Next
          </button>
        )}
        <button className="modal-button" onClick={() => setIndex(0)}>
          Restart
        </button>
      </Modal.Body>
    </>
  );
}
