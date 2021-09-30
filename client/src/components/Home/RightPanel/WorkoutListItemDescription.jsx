import Card from 'react-bootstrap/esm/Card'
import './WorkoutListItemDescription.scss'

export default function WorkoutListItemDescription (props) {
  const { name, set, reps } = props
  return (
    <div>
      {name}
      <div>
        Set: {set} Reps: {reps}
      </div>
    </div>
  )
}
