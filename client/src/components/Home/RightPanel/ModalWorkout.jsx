import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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
      <Modal.Body classname="modal-body">
        {exercises.length !== index ? (
          <>
            {exercises[index].name}
            <img
              class
              name="gifUrl"
              src={exercises[index].gifUrl}
              alt={exercises[index].name}
            />
            <div>Set: {exercises[index].set}</div>
            <div>Reps: {exercises[index].reps}</div>
          </>
        ) : (
          <>
            <div> You did it! </div>
            <img
              src="https://media1.giphy.com/media/BqijAlej4RV7O/giphy.gif?cid=ecf05e47nf3oiylzaxxzlk98mzb6t8nskx84noqgwicheqhf&rid=giphy.gif&ct=g"
              alt="mario-party"
            />
          </>
        )}
        {index > 0 && (
          <Button className="me-2" onClick={() => previous()}>
            Previous
          </Button>
        )}
        {exercises.length !== index && (
          <Button className="me-2" onClick={() => next()}>
            Next
          </Button>
        )}
        <Button className="me-2" onClick={() => setIndex(0)}>
          Restart
        </Button>
      </Modal.Body>
    </>
  );
}
