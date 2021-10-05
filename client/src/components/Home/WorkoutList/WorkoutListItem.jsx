import "./workoutListItem.scss";

export default function WorkoutListItem(props) {
  const { workout, setWorkout, exercise } = props;

  function capitalizeWords(string) {
    const words = string.split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    const final = words.join(" ");
    return final;
  }

  const onAddReps = (exercise) => {
    const exist = workout.find((x) => x.id === exercise.id);
    setWorkout(
      workout.map((x) =>
        x.id === exercise.id ? { ...exist, reps: exist.reps + 1 } : x
      )
    );
  };

  const onMinusReps = (exercise) => {
    const exist = workout.find((x) => x.id === exercise.id);
    if (exist.reps > 1) {
      setWorkout(
        workout.map((x) =>
          x.id === exercise.id ? { ...exist, reps: exist.reps - 1 } : x
        )
      );
    }
  };

  const onRemove = (exercise) => {
    setWorkout(workout.filter((x) => x.id !== exercise.id));
  };

  const onAddSet = (exercise) => {
    const exist = workout.find((x) => x.id === exercise.id);
    setWorkout(
      workout.map((x) =>
        x.id === exercise.id ? { ...exist, set: exist.set + 1 } : x
      )
    );
  };

  const onMinusSet = (exercise) => {
    const exist = workout.find((x) => x.id === exercise.id);
    if (exist.set > 1) {
      setWorkout(
        workout.map((x) =>
          x.id === exercise.id ? { ...exist, set: exist.set - 1 } : x
        )
      );
    }
  };

  return (
    <div key={exercise.id} className="row">
      <div> {capitalizeWords(exercise.name)}</div>
      <div className="sets-reps-container">
        <label htmlFor="set">Set:</label>
        <div className="plus-minus-container">
          <button onClick={() => onAddSet(exercise)} className="add">
            ^
          </button>
          <div className="set-number">{exercise.set}</div>
          <button onClick={() => onMinusSet(exercise)} className="minus">
            ˅
          </button>
        </div>
      </div>
      <div className="sets-reps-container">
        <label htmlFor="reps">Reps:</label>
        <div className="plus-minus-container">
          <button onClick={() => onAddReps(exercise)} className="add">
            +
          </button>
          <div className="rep-number">{exercise.reps}</div>
          <button onClick={() => onMinusReps(exercise)} className="minus">
            -
          </button>
        </div>
      </div>

      <div className="remove">
        <button onClick={() => onRemove(exercise)} className="remove">
          Remove
        </button>
      </div>
    </div>
  );
}
