import WorkoutListItem from './WorkoutListItem'
import useState from 'react'

export default function WorkoutList (props) {
  // const [name, setName] = useState('')
  const { workout, setWorkout } = props

  return (
    <>
      <h1>New Workout</h1>
      <form autoComplete='off'>
        <input
          className='workout-name'
          // value={name}
          // onChange={event => setName(event.target.value)}
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
      <button>Save Workout</button>
    </>
  )
}
