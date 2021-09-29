import WorkoutListItem from './WorkoutListItem'
import { useState, useContext } from 'react'
import { TokenUserContext } from '../../App/App'

export default function WorkoutList (props) {
  const [name, setName] = useState('')
  const { workout, setWorkout } = props
  const { userState } = useContext(TokenUserContext)
  const [user] = userState

  const handleSave = event => {
    event.preventDefault()
    const workoutObj = { userid: user.user.id, title: name, exercises: workout }
    console.log('obj', workoutObj)
  }

  return (
    <>
      <h1>New Workout</h1>
      <form autoComplete='off'>
        <input
          className='workout-name'
          value={name}
          onChange={event => setName(event.target.value)}
          type='text'
          placeholder='New workout name'
        />
      </form>
      <div>
        {workout.length === 0 && <div> Please add some exercises! </div>}
      </div>
      {workout.map(exercise => (
        <WorkoutListItem
          key={exercise.id}
          exercise={exercise}
          workout={workout}
          setWorkout={setWorkout}
        />
      ))}
      <button onClick={handleSave} className='save'>
        Save Workout
      </button>
    </>
  )
}
