import "./rightbar.scss";
import { useContext, useEffect, useState } from "react";
import { TokenUserContext } from "../../App/App";
import axios from "axios";
import RightbarWorkoutListItem from "./RightbarWorkoutListItem";

export default function RightbarWorkouts(props) {
  console.log("in RightbarWorkouts", props);
  const [responseData, setResponseData] = useState(null);
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const {
    stateId,
    setId,
    panels,
    setPanels,
    editWorkoutObj,
    setEditWorkoutObj,
    workout,
    setWorkout,
  } = props;

  useEffect(() => {
    axios
      .request(`/api/workouts/${user.user.id}`)
      .then((response) => {
        setResponseData(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const parsedResponse =
    responseData &&
    responseData.map((workoutx) => (
      <RightbarWorkoutListItem
        key={workoutx.id}
        id={workoutx.id}
        title={workoutx.title}
        group_ids={workoutx.group_ids}
        exercises={workoutx.exercises}
        responseData={responseData}
        setResponseData={setResponseData}
        panels={panels}
        setPanels={setPanels}
        setId={setId}
        stateId={stateId}
        editWorkoutObj={editWorkoutObj}
        setEditWorkoutObj={setEditWorkoutObj}
        workout={workout}
        setWorkout={setWorkout}
      />
    ));

  return (
    <div className="rightbar">
      My workouts
      <div>{parsedResponse}</div>
    </div>
  );
}
