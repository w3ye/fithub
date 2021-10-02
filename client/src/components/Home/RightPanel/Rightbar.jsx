import WorkoutList from "../WorkoutList/WorkoutList";
import "./rightbar.scss";

export default function Rightbar(props) {
  const {
    workout,
    setWorkout,
    panels,
    setPanels,
    editWorkoutObj,
    setEditWorkoutObj,
  } = props;

  return (
    <div className="rightbar">
      <WorkoutList
        workout={workout}
        setWorkout={setWorkout}
        panels={panels}
        setPanels={setPanels}
        editWorkoutObj={editWorkoutObj}
        setEditWorkoutObj={setEditWorkoutObj}
      />
    </div>
  );
}
