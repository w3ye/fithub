import { useState, useRef } from 'react'

export default function WorkoutListItem (props) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  console.log('workoutlistitemprops:', props)
  const { workout, setWorkout, exercise } = props
  const setRef = useRef()
  const repsRef = useRef()

  const handleSets = event => {
    event.preventDefault()
    setWorkout(prevWorkout => {
      let existingExercise = prevWorkout.find(exe => exe.name === exercise.name)
      existingExercise.set = setRef.current.value
      return prevWorkout
    })
    console.log(workout)
  }

  const handleReps = event => {
    event.preventDefault()
    setWorkout(prevWorkout => {
      let existingExercise = prevWorkout.find(exe => exe.name === exercise.name)
      existingExercise.reps = repsRef.current.value
      return prevWorkout
    })
  }

  // function validate () {
  //   if (name === '') {
  //     setError('Workout cannot be blank')
  //     return
  //   } else {
  //     setError('')
  //     props.onSave(name, interviewer)
  //   }
  // }

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
      <form autoComplete='off'>
        <input
          className='workout-name'
          value={name}
          onChange={event => setName(event.target.value)}
          type='text'
          placeholder='New workout name'
        />
      </form>
      <button>Save Workout</button>
      <br />
    </div>
  )
}
