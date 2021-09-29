import { useState, useRef, useEffect } from 'react'

export default function WorkoutListItem (props) {
  const { workout, setWorkout, exercise } = props
  const setRef = useRef()
  const repsRef = useRef()
  useEffect(() => {
    console.log('in UseEffect', workout)
  }, [workout])

  const handleSets = event => {
    event.preventDefault()
    setWorkout(prevWorkout => {
      let existingExercise = prevWorkout.find(exe => exe.name === exercise.name)
      existingExercise.set = setRef.current.value
      return prevWorkout
    })
  }

  const handleReps = event => {
    event.preventDefault()
    setWorkout(prevWorkout => {
      let existingExercise = prevWorkout.find(exe => exe.name === exercise.name)
      existingExercise.reps = repsRef.current.value
      return prevWorkout
    })
  }

  const onRemove = exercise => {
    setWorkout(workout.filter(x => x.id !== exercise.id))
    // console.log('in remove', workout)
  }

  return (
    <div key={exercise.id} className='row'>
      <div> {exercise.name}</div>
      <label htmlFor='set'>Set:</label>
      <br />
      <input ref={setRef} type='text' placeholder={exercise.set}></input>
      <br />
      <button type='button' onClick={handleSets}>
        Change Sets
      </button>
      <br />
      <label htmlFor='reps'>Reps:</label>
      <br />
      <input ref={repsRef} type='text' placeholder={exercise.reps}></input>
      <br />
      <button type='button' onClick={handleReps}>
        Change Reps
      </button>
      <br />
      <button onClick={() => onRemove(exercise)} className='remove'>
        Remove
      </button>
      <br />
    </div>
  )
}
