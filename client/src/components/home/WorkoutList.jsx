import { useState } from 'react'
import WorkoutListItem from './WorkoutListItem'

export default function WorkoutList (props) {
  console.log('Workout List props', props)
  const { workout, setWorkout } = props
  const [change, setChange] = useState([])

  const handleInput = event => {
    setChange(event.target.value)
    console.log('change', change)
    // setWorkout([...workout, { ...change, set: 1, reps: 10 }])
    console.log('handleChange', event.target.value)
  }

  const handleReps = event => {
    event.preventDefault()
    setWorkout([...workout, { reps: event.target.value }])
  }

  return (
    <>
      <h1>New Workout</h1>
      <div>{workout.length === 0 && <div> Workout is empty </div>}</div>
      {workout.map(exercise => (
        <WorkoutListItem
          key={exercise.id}
          exercise={exercise}
          workout={workout}
          setWorkout={setWorkout}
        />
      ))}
    </>
  )
}
