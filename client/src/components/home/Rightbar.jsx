import NewWorkout from './NewWorkout'
import './rightbar.css'

export default function Rightbar (props) {
  const { workout, setWorkout, onAdd } = props
  console.log('Rightbar', props)
  return (
    <div className='rightbar'>
      <NewWorkout workout={workout} setWorkout={setWorkout} onAdd={onAdd} />
    </div>
  )
}
