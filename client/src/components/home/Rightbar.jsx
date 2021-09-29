import WorkoutList from './WorkoutList'
import './rightbar.css'

export default function Rightbar (props) {
  const { workout, setWorkout } = props

  return (
    <div className='rightbar'>
      <WorkoutList workout={workout} setWorkout={setWorkout} />
    </div>
  )
}
