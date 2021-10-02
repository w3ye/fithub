import WorkoutListItem from "./WorkoutListItem";
import { useState, useContext, useEffect } from "react";
import { TokenUserContext } from "../../App/App";
import axios from "axios";

export default function WorkoutList(props) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const {
    workout,
    setWorkout,
    panels,
    setPanels,
    stateId,
    editWorkoutObj,
    setEditWorkoutObj,
  } = props;
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const [currentWorkout, setCurrentWorkout] = useState(workout || []);
  console.log("in WorkoutList_______________", props);

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
      {panels === "edit" && (
        <>
          <h1>Edit Workout</h1>
          <form autoComplete="off">
            <h5>Name of Workout: </h5>
            <input
              className="workout-name"
              defaultValue={editWorkoutObj.title}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="New workout name"
            />
          </form>
        </>
      )}

      {panels === "home" && (
        <>
          <h1>New Workout</h1>
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
        </>
      )}
      {console.log("before map what is workout", workout)}
      {workout.map((exercise) => (
        <WorkoutListItem
          key={exercise.id}
          exercise={exercise}
          workout={workout}
          setWorkout={setWorkout}
          panels={panels}
          setPanels={setPanels}
          stateId={stateId}
          editWorkoutObj={editWorkoutObj}
          setEditWorkoutObj={setEditWorkoutObj}
        />
      ))}
      <button onClick={handleSave} className="save">
        Save Workout
      </button>
    </>
  );
}
