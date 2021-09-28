export default function ExerciseListItem (props) {
  return (
    <li className='exercise'>
      <img src={props.gifUrl} alt='' className='exercise__item-image' />
      <h2>{props.name}</h2>
      <h2>{props.equipment}</h2>
    </li>
  )
}
