import WorkoutList from "../WorkoutList/WorkoutList";
import "./rightbar.scss";

export default function Rightbar(props) {
  console.log("in Right bar", props);
  const {
    workout,
    setWorkout,
    panels,
    setPanels,
    stateId,
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
        stateId={stateId}
        editWorkoutObj={editWorkoutObj}
        setEditWorkoutObj={setEditWorkoutObj}
      />
    </div>
  );
}
