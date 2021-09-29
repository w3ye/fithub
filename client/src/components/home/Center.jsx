import './center.css'
import ExerciseSearch from './ExerciseSearch'

export default function Center (props) {
  const { onAdd } = props
  return (
    <div className='center'>
      <ExerciseSearch onAdd={onAdd} />
    </div>
  )
}
