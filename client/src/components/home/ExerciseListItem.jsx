export default function ExerciseListItem(props) {
  return (
    <li className="exercise">
      <h2>{props.equipment}</h2>
      <h2>{props.name}</h2>
      <h2>{props.gifUrl}</h2>
    </li>
  );
}
