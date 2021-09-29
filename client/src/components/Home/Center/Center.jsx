import "./center.scss";
import ExerciseSearch from "../ExerciseList/ExerciseSearch";

export default function Center(props) {
  const { onAdd } = props;
  return (
    <div className="center">
      <ExerciseSearch onAdd={onAdd} />
    </div>
  );
}
