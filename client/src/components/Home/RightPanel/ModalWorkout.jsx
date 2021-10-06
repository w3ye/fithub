import Modal from "react-bootstrap/Modal";
import "./modalWorkout.scss";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { useState } from "react";

export default function ModalWorkout(props) {
  const { title, exercises } = props;
  const [index, setIndex] = useState(0);

  function capitalizeWords(string) {
    const words = string.split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    const final = words.join(" ");
    return final;
  }

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
        <button
          className="modal-button"
          id="restart"
          onClick={() => setIndex(0)}
        >
          RESTART
        </button>
        <Modal.Title id="modal-title">{title.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          {index > 0 && index !== exercises.length && (
            <IoIosArrowDropleftCircle
              type="button"
              size={100}
              className="modal-buttons"
              id="prev"
              onClick={() => previous()}
            />
          )}

          <div class="thisExercise">
            {exercises.length !== index ? (
              <>
                <div className="title-set-rep">
                  <h1> {capitalizeWords(exercises[index].name)}</h1>
                  <div className="modal-set-rep-container">
                    <div className="modal-set-rep">
                      {exercises[index] && (
                        <div>Sets: {exercises[index].set} </div>
                      )}
                    </div>
                    <div className="modal-set-rep">
                      {exercises[index] && (
                        <div>Reps: {exercises[index].reps}</div>
                      )}
                    </div>
                  </div>
                </div>
                <img
                  className="gifUrl"
                  src={exercises[index].gifUrl}
                  alt={exercises[index].name}
                />
              </>
            ) : (
              <>
                <div className="modal-end">
                  <div className="title-set-rep" id="success">
                    {" "}
                    You did it!{" "}
                  </div>
                  <div className="endGif">
                    <img
                      src="https://media2.giphy.com/media/h72H0tXcBjqI6edm6M/giphy.gif?cid=ecf05e47fsoormgf91btzfiznlivxpbk5ftkc0cx0njsjwsk&rid=giphy.gif&ct=g"
                      alt=""
                      className="gifUrl"
                      id="finish-gif"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          {exercises.length !== index && (
            <IoIosArrowDroprightCircle
              type="button"
              className="modal-buttons"
              id="next"
              size={100}
              onClick={() => next()}
            />
          )}
        </div>
      </Modal.Body>
    </>
  );
}
