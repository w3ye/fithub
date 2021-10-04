import "./rightbar.scss";
import { useContext, useEffect, useState } from "react";
import { TokenUserContext } from "../../App/App";
import axios from "axios";
import RightbarWorkoutListItem from "./RightbarWorkoutListItem";

export default function Workouts(props) {
  const [responseData, setResponseData] = useState(null);
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { setPanels, setEditWorkoutObj, setWorkout } = props;

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
        exercises={workoutx.exercises}
        responseData={responseData}
        setResponseData={setResponseData}
        setPanels={setPanels}
        setEditWorkoutObj={setEditWorkoutObj}
        setWorkout={setWorkout}
      />
    ));

  return (
    <div className="center">
      My workouts
      <div>{parsedResponse}</div>
    </div>
  );
}
