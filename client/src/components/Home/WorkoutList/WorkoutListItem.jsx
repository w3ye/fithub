export default function WorkoutListItem(props) {
  const { workout, setWorkout, exercise } = props;

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
      <div> {exercise.name}</div>
      <label htmlFor="set">Set:</label>
      <button onClick={() => onAddSet(exercise)} className="add">
        +
      </button>
      <div>{exercise.set}</div>
      <button onClick={() => onMinusSet(exercise)} className="minus">
        -
      </button>
      <br />
      <label htmlFor="reps">Reps:</label>

      <button onClick={() => onAddReps(exercise)} className="add">
        +
      </button>
      <div>{exercise.reps}</div>
      <button onClick={() => onMinusReps(exercise)} className="minus">
        -
      </button>
      <br />
      <button onClick={() => onRemove(exercise)} className="remove">
        Remove
      </button>
      <br />
    </div>
  );
}
