import WorkoutListItem from "./WorkoutListItem";
import { useState, useContext, useEffect } from "react";
import { TokenUserContext } from "../../App/App";
import axios from "axios";
import "./workoutList.scss";

export default function WorkoutList(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const { workout, setWorkout, panels, setPanels, editWorkoutObj } = props;
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;

  useEffect(() => {
    if (panels === "edit") {
      setName(editWorkoutObj.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Sends a post request to /api/workouts containing workout information
   * @param {*} event
   * @returns
   */
  const handleSave = (event) => {
    event.preventDefault();
    if (name === "") {
      setError("Workout name cannot be blank");
      return;
    } else if (workout.length === 0) {
      setError("Please add some exercises");
      return;
    }
    if (panels === "edit") {
      return axios
        .patch(`/api/workouts/${editWorkoutObj.id}`, {
          title: name,
          exercises: workout,
        })
        .then((result) => {
          setName("");
          setWorkout([]);
          setError("");
          setPanels("workouts");
          return result;
        });
    } else {
      return axios
        .post("/api/workouts", {
          userId: user.user.id,
          title: name,
          exercises: workout,
        })
        .then((result) => {
          setName("");
          setWorkout([]);
          setError("");
          setPanels("workouts");
          return result;
        })
        .catch((err) => {
          return err;
        });
    }
  };

  return (
    <>
      {panels === "edit" && <h1>Edit Workout</h1>}

      {panels === "home" && <h1>New Workout</h1>}
      <form autoComplete="off">
        <h5>Name of Workout: </h5>
        <input
          className="workout-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="New workout name"
        />
      </form>
      <section className="workout__validation">{error}</section>

      {workout.map((exercise) => (
        <WorkoutListItem
          key={exercise.id}
          exercise={exercise}
          workout={workout}
          setWorkout={setWorkout}
        />
      ))}
      <button onClick={handleSave} className="save">
        Save Workout
      </button>
    </>
  );
}
