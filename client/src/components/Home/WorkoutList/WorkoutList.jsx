import WorkoutListItem from './WorkoutListItem'
import { useState, useContext } from 'react'
import { TokenUserContext } from '../../App/App'
import axios from 'axios'

export default function WorkoutList (props) {
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const { workout, setWorkout } = props
  const { userState } = useContext(TokenUserContext)
  const [user] = userState

  /**
   * Sends a post request to /api/workouts containing workout information
   * @param {*} event
   * @returns
   */
  const handleSave = event => {
    event.preventDefault()
    if (name === '') {
      setError('Workout name cannot be blank')
      return
    } else if (workout.length === 0) {
      setError('Please add some exercises')
      return
    } else {
      return axios
        .post('/api/workouts', {
          userId: user.user.id,
          title: name,
          groups: user.groups,
          exercises: workout
        })
        .then(result => {
          return result
        })
        .catch(err => {
          return err
        })
    }
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
      <section className='workout__validation'>{error}</section>
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
