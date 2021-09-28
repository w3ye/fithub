export default function NewWorkout (props) {
  console.log('NewWorkout', props)
  const { workout, setWorkout, onAdd } = props

  function onAddSetOrRep (counter) {
    return (counter += 1)
  }

  return (
    <>
      <h1>New Workout</h1>
      <div>{workout.length === 0 && <div> Workout is empty </div>}</div>
      {workout.map(exercise => (
        <div key={exercise.id} className='row'>
          <div> {exercise.name}</div>
          <div>Set: {exercise.set}</div>
          <button onClick={() => onAddSetOrRep(exercise.set)} className='add'>
            +
          </button>
          <div>Reps: {exercise.reps}</div>
        </div>
      ))}
    </>
  )
}
