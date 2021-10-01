import Card from 'react-bootstrap/esm/Card'
import './WorkoutListItemDescription.scss'

export default function WorkoutListItemDescription (props) {
  const { name, set, reps } = props
  return (
    <p>
      {name}
      <div>
        Set: {set} Reps: {reps}
      </div>
    </p>
  )
}
